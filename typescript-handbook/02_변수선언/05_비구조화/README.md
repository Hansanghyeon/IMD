# 비구조화

TypeScript에 있는 또 다른 ECMAScript2015 기능은 비구조화입니다.<br/>
전체 참조 정보는 [MDN web doc Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)를 참조하세요.<br/>
이 섹션에서는 간단한 개요를 제공합니다.

## 배열 비구조화

가장 간단한 구조 해체 방법은 배열 비구조화 할당입니다.

```ts
let input = [1, 2];
let [first, second] = input;
console.log('first');   // 1 출력
console.log('second');  // 2 출력
```

이것은 `first` 와 `second` 라는 두 개의 새로운 변수를 만듭니다.<br/>
이는 인덱스를 사용하는 것과 동일하지만 훨씬 편리합니다.

```ts
first = input[0];
second = input[1];
```

비구조화는 이미 선언된 변수에서도 작동합니다.

```ts
// 변수 교환
[first, second] = [second, first];
```

함수에 대한 매개 변수가 있는 경우

```ts
function f([first, second]: [number, number]) {
  console.log(first);
  console.log(second);
}
f([1, 2]);
```

`...` 구문을 사용하여 목록의 나머지 항목에 대한 변수를 생성할 수 있습니다.

```ts
let [first, ...rest] = [1, 2, 3, 4];
console.log(first);   // 1 출력
console.log(rest);    // [2, 3, 4] 출력
```

물론 이것은 JavaScript 이므로 관심이 없는 후행 요소는 무시할 수 있습니다.

```ts
let [first] = [1, 2, 3, 4];
console.log(first);  // 1 출력
```

또는 다른 요소들

```ts
let [, second, , fourth] = [1, 2, 3, 4];
```

## 객체 비구조화

또한 객체를 해체할 수 있습니다.

```ts
let o = {
  a: "foo",
  b: 12,
  c: "bar",
};
let { a, b } = o;
}
```

이것은 `o.a` 와 `o.b` 에서 새로운 변수 `a`와 `b`를 생성합니다. 필요없는 경우 `c`를 건너뛸 수 있습니다.<br/>
배열 비구조화처럼 선언없이 할당할 수 있습니다.

```ts
({ a, b} = { a: "baz", b: 101 });
```

이 문장을 괄호로 묶어야한다는 것을 주목하십시오.<br/>
JavaScript는 일반적으로 `{`를 블록 시작으로 파싱합니다.

`...` 구문을 사용하여 객체의 나머지 항목에 대한 변수를 만들 수 있습니다.

```ts
let { a, ...passthrough } = o;
let total = passthrough.b + passthrough.c.length;
```

### 프로퍼티 이름 변경

프로퍼티 이름 또한 다른 이름으로 지정할 수 있습니다.

```ts
let { a: newName1, b: newName2 } = o;
```

문장이 혼란스러워지기 시작했습니다.<br/>
`a: newName1`를 "`a` as `newName1`"로 읽을 수 있습니다.<br/>
방향은 왼쪽에서 오른쪽으로 사용합니다.

```ts
let newName1 = o.a;
let newName2 = o.b;
```

혼란스럽겠지만 여기서 콜론은 타입을 나타내는 콜로은 아닙니다.<br/>
형식을 지정하는 경우 전체 형식이 비구조화된 후에도 형식을 작성해야 합니다.

```ts
// test01.ts
let {a, b}: {a: string, b: number} = o;
```

> 비구조화할 때 타입지정을 인터페이스로도 가능하다.

### 기본값

기본값을 사용하면 프로퍼티가 정의되지 않은 경우의 기본값을 지정할 수 있습니다.

```ts
function keepWholeObject(wholeObject: { a: string, b?: number}) {
  let {a, b = 1001} = wholeObject;
}
```

`keepWholeObject` 함수는 `b`가 정의되지 않더라도 `a`와 `b` 프로퍼티뿐만 아니라 `whileObject`의 변수를 가집니다.

## 함수 선언

비구조화는 함수 선언에서도 작동합니다.

```ts
type C = { a: string, b?: number };
function f({ a, b }: C): void {
  // ...
}
```

그러나 매개 변수에 대해 기본값을 지정하는 것이 더 일반적이며 비구조화시 기본값을 가져오는 것은 까다로울 수 있습니다.<br/>
우선 기본값 앞에 패턴을 두는 것을 기억해야 합니다.

```ts
function f({ a, b} = { a: "", b: 0 }): void {
  // ...
}
f();  // 👍, 기본값 { a: "", b: 0 }
```

> 위의 코드는 나중에 handbook에서 설명할 유형 추론의 한 예제입니다.

그런 다음 기본 초기화가 아닌 비구조화 프러퍼티에 대한 선택적인 프로퍼티를 기본값으로 지정한다는 것을 기억해야 합니다.<br/>
`c`에서 `b`는 선택사항으로 지정되었다는 것을 기억하세요


```ts
function f({ a, b = 0 } = { a: "" }): void {
  // ...
}
f({ a: "yes" });  // 👍, 기본값 b = 0
f();              // 👍, 기본값은 { a: "" }이며 이 경우 기본값은 b = 0 입니다.
f({});            // ❗️, 인수를 제공하려면 'a'가 필요합니다.
```

비구조화를 조심히 사용하세요.<br/>
앞의 예제에서 보여 주듯이 가장 단순한 비구조화 표현식을 제외하고는 혼란스럽습니다.<br/>
이름 바꾸기 기본값 및 타입을 주석으로 써놓지 않고는 이해하기 힘든 깊은 형태를 비구조화하는 것은 특히 그렇습니다.

비구조화 표현식은 작고 심플하게 유지하세요.

직접 생성한 비구조화를 항상 스스로 쓸 수 있어야 합니다.

## 전재 연산자

전개는 비구조화의 반대입니다.<br/>
배열을 다른 배열로 객체를 다른 객체로 전개하는 것을 허용합니다.

```ts
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5];
```

이것은 bothPlus에 `[0, 1, 2, 3, 4, 5]` 값을 부여합니다.<br/>
전개는 first와 second의 얕은 복사본을 만듭니다. 그들은 전개에 의해 변하지 않습니다.

또한 객체를 전개 할 수도 있습니다.

```ts
let defaults = { food: "spicy", price: "$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };
```

현재 `search` 의 값은 `{ food: "rich", price: "$", ambiance: "noisy" }` 입니다.<br/>
객체의 전개는 배열의 전개보다 복잡합니다.<br/>
배열은 전개를 왼쪽에서 오른쪽으로 진행하지만 결과는 여전히 객체입니다.<br/>
이것은 나중에 전개한 객체의 프로퍼티가 이전에 있던 프로퍼티를 덮어씁니다.<br/>
따라서 끝에 전개할 이전의 코드를 수정하면 다음과 같습니다.

```ts
let defaults = { food: "spicy", price: "$", ambiance: "noisy" };
let search = { food: "rich", ...defaults };
```

`defaults`의 `food` 프로퍼티가 `food: "rich"`를 덮어쓰게 됩니다. 그러나 이것은 우리가 원한 결과가 아닙니다.

객체 Spread에는 몇 가지 다른 놀라운 한계가 있습니다.

첫번째, 열거 가능 속성([Enumerability and ownership of properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)) 객체에 포함됩니다.<br/>
기본적으로 객체의 인스턴스를 전개할 때 메서드를 잃어버린다는 것을 의미합니다.

```ts
class C {
  p = 12;
  m() {
  }
}
let c = new C();
let clone = { ...c };
clone.p;    // 👍
clone.m()   // ❗️
```

두번째, TypeScript 컴파일러는 일반 함수의 매개변수를 전개로 허용하지 않습니다.

