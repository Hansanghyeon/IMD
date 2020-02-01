# this

JavaScript에서 `this`를 사용법을 배우는 것은 일종의 통과 의례입니다.<br/>
TypeScript는 JavaScript의 상위 집합이기 때문에 TypeScript 개발자들도 `this`를 사용하는 방법과 올바르게 사용되고 있지 않을 때를 찾아내는 방법을 배워야 합니다.<br/>

## `this`와 화살표 함수

JavaScript에서 `this`는 함수가 호출될 때 설정되는 변수입니다.<br/>
매우 강력하고 유연한 기능이지만 함수가 실행되는 상황에 대해 항상 알고 있어야 하는 시간이 듭니다.<br/>
특히 함수를 반환하거나 함수를 인수로 전달할 때 악명 높을 정도로 혼란스럽습니다.

예제를 살펴보겠습니다.

```ts
let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function() {
    return function() {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13};
    }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert('card: ', pickedCard.card, 'of', pickedCard.suit );
```

`createCardPicker`는 자체적으로 함수를 반환하는 함수입니다.<br/>
예제를 실행하려고 하면 alert 대신 오류가 발생합니다.<br/>
`createCardPicker`에 의해 생성된 함수에서 사용되는 `this`가 `deck` 객체 대신에 `window`로 설정되어 있기 때문입니다.<br/>
왜냐하면 `cardPicker()`는 자기 자신을 호출하기 떄문입니다.<br/>
이와 같이 최상위 비-메서드 구문 호출은 `this`에 `window`를 사용합니다.<br/>
(주의사항: strict mode에서 `this`는 `window`보다는 `undefined`가 될 것입니다).

나중에 사용할 함수를 반환하기 전에 함수에 올바른 `this`가 연결되도록하여 이를 해결할 수 있습니다. 이렇게 하면 나중에 어떻게 사용되든 상관없이 원래의 `deck` 객체를 볼 수 있습니다.<br/>
이를 위해 함수 표현식을 ECMAScript6의 화살표 구문으로 변경하여 사용합니다.
화살표 함수는 호출된 곳이 아닌 함수가 생성된 곳에서 `this`를 캡처합니다.

```ts
let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function() {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13};
    }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert('card: ', pickedCard.card, 'of', pickedCard.suit );
```

더 좋은 점은 컴파일러에 `--noImplicitThis` 신호를 넘겨주면 TypeScript가 실수를 했을 때 경고를 합니다. `this.suits[pickedSuit]`에서 `this`는 `any` 타입입니다.

## `this` parameters

불행히도 `this.suits[pickedSuit]`의 타입은 여전히 `any`입니다.<br/>
왜냐하면 `this`는 객체 리터럴 내부의 함수 표현식에서 왔기 떄문입니다.<br/>
이 문제를 해결하기 위해 명시적으로 `this` 매개변수를 제공할 수 있습니다.

`this` 매개변수는 함수의 매개변수 목록에서 처음 나오는 가짜 매개변수입니다.

```ts
function f(this: void) {
  // 이 분리된 함수에서 'this'를 사용할 수 없는지 확인해보세요.
}
```

위 예제에서 `Card`와 `Deck`에 몇가지 인터페이스를 추가하여 타입을 더 명확하고 쉽게 재사용하기 쉽게 만들 수 있도록 하겠습니다.

```ts
interface Card {
  suit: string;
  card: number;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  // 주의사항: 이 함수는 이제 반드시 Deck 타입이어야 합니다.
  createCardPicker: function(this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13};
    }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log('card:', pickedCard.card, 'of', pickedCard.suit );
```

이제 TypeScript는 `createCardPicker`가 `Deck` 객체에서 호출될 것으로 예상합니다.<br/>
즉 `this`는 `any`가 아닌 `Deck` 타입입니다. 따라서 `--noImplicitThis`는 오류를 발생시키지 않습니다.

## 콜백에서의 `this` 매개변수

함수를 나중에 호출할 라이브러리에 전달할 때 콜백에서 `this`를 사용하여 오류가 발생할 수도 있습니다.<br/>
왜냐하면 콜백을 호출하는 라이브러리가 표준 함수처럼 호출하기 때문에 `this`는 `undefined`가 될 것입니다.

때때로 `this` 매개변수를 사용하여 콜백 오류를 방지할 수도 있습니다. 첫 번째, 라이브러리 작성자는 콜백 타입에 `this`를 사용하여 annotate를 달아야 합니다.

```ts
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}
```

`this: void`는 `addClickListener`가 `onclick`이 `this`타입을 필요로 하지 않는 함수라는 것을 의미합니다.

두 번째, `this`를 사용하여 호출 코드와 함께 annotate를 달아야 합니다.

```ts
class Handler {
  info: string;
  onClickBad(this: Handler, e: Event) {
    // 이런, 여기서 this를 사용했어요. 이 콜백을 사용하면 충돌으로 런타임 오류가 발생합니다.
    this.info = e.message;
  }
}
let h = new Handler();
uiElement.addClickListener(h.onClickBad);  // 오류!
```

`this`가 annotated되어 있으면 `onClickBad`는 반드시 `Handler`의 인스턴스에서 호출되어야 한다는 것을 명시해야 합니다.<br/>
그런 다음 TypeScript는 `addClickListener`에 `this: void`가 있는 함수가 필요하다는 것을 발견합니다.<br/>
오류를 해결하려면 `this`의 타입을 수정하세요.

```ts
class Handler {
  info: string;
  onClickGood(this: void, e: Event) {
    // this의 타입이 void이기 때문에 여기서는 사용할 수 없습니다.
    console.log('clicked!');
  }
}
let h = new Handler();
uiElement.addClickListener(h.onClickGood);
```

`onClickGood`는 `this`의 타입을 `void`로 지정하기 때문에 `addClickListener`에 전달할 수 있습니다.<br/>
물론 this는 또한 `this.info`를 사용할 수 없다는 것을 의미합니다.<br/>
두가지 모두를 사용하려면 화살표 함수를 사용해야 합니다.

```ts
class Handler {
  info: string;
  onClickGood = (e: Event) => { this.info = e.message }
}
```

이것은 화살표 함수가 `this`를 캡처하지 않기 때문에 효과적입니다.<br/>
때문에 기대하는 것 같이 항상 `this: void`를 넘겨줄 수 있습니다.

단점은 Handler 타입의 객체마다 하나의 화살표 함수가 생성된다는 것입니다.<br/>
반면에 메서드는 한 번만 만들어지고 핸들러의 프로토 타입에 소속됩니다.<br/>
이러한 객체는 핸들러 타입의 모든 객체 사이에 공유됩니다.