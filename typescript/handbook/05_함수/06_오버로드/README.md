# 오버로드

JavaScript는 본질적으로 매우 동적인 언어입니다.<br/>
단일 JavaScript 함수가 전달된 인수의 형태를 기반으로 서로 다른 타입의 객체를 반환하는 것은 드문 일이 아닙니다.

```ts
let suits = ['hearts', 'spades', 'clubs', 'diamonds'];

function pickCard(x): any {
  // 객체 / 배열로 작업하고 있는지 확인해보세요
  // 그렇가면 그것들은 댁을 주고 사용자는 카드를 선택할 것입니다.
  if(typeof x == 'object') {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard
  }
  // 그렇지 않으면 카드를 선택하게 하세요.
  else if (typeof x == 'number') {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13};
  }
}

let myDeck = [{ suit: 'diamonds', card: 2 }, { suit: 'spades', card: 10 }, { suit: 'hearts', card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log('card:', pickedCard1.card, 'of', pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log('card:', pickedCard2.card, 'of', pickedCard2.suit);
```

여기서 `pickCard` 함수는 사용자가 무엇을 전달했는지에 따라 두 개의 서로 다른 내용을 반환합니다.<br/>
사용자가 deck를 나타내는 객체를 전달하면 함수가 card를 선택합니다.<br/>
사용자가 card를 선택하면 그들이 선택한 card를 알려줍니다.<br/>
하지만 이것을 어떻게 타입 시스템에 설명할까요?

이에 대한 대답은 오버로드 목록과 동일한 함수에 대한 여러 함수 타입을 제공하는 것이다.<br/>
이 목록은 컴파일러가 함수 호출을 해결하는 데 사용할 것입니다.<br/>
`pickCard`가 받아들일 수 있는 것과 그것이 반환하는 것을 기술한 오버로드 목록을 작성해 보세요.

```ts
let suits = ['hearts', 'spades', 'clubs', 'diamonds'];

function pickCard(x: {suit:string; card: number;}[]): number;
function pickCard(x: number): {suit: string; card: number;};
function pickCard(x): any {
  // 객체 / 배열로 작업하고 있는지 확인해보세요
  // 그렇가면 그것들은 댁을 주고 사용자는 카드를 선택할 것입니다.
  if(typeof x == 'object') {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard
  }
  // 그렇지 않으면 카드를 선택하게 하세요.
  else if (typeof x == 'number') {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13};
  }
}

let myDeck = [{ suit: 'diamonds', card: 2 }, { suit: 'spades', card: 10 }, { suit: 'hearts', card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log('card:', pickedCard1.card, 'of', pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log('card:', pickedCard2.card, 'of', pickedCard2.suit);
```

이런 변화로 인해 오버로드가 pickCard` 함수에 대한 타입-체크 호출을 제공합니다.

컴파일러가 올바른 타입 검사를 선택하기 위해 기본 JavaScript와 비슷한 프로세스를 수행합니다.<br/>
오버로드 목록을 살펴보고 제공된 매개변수를 사용하여 함수를 호출하는 첫 번째 오버로드 시도를 계속합니다.<br/>
일치하는 것을 찾으면 이 오버로드를 올바른 오버로드로 선택합니다.<br/>
이러한 이유 때문에 주문이 많아지면 가장 구체적인 것에 가장 덜 구체적인 것으로 오버로드 합니다.

`function pickCard (x): any`조각은 오버로드 목록의 일부가 아니므로 두 개의 오버로드만 있습니다.<br/>
하나는 객체를 취하고 하나는 숫자를 취합니다.<br/>
`pickCard`를 다른 매개 변수 타입과 함께 호출하면 오류가 발생합니다.