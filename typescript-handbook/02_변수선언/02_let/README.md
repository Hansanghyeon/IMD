# let 선언

이제는 `var` 에 몇가지 문제가 이다는 것을 알아냈습니다.<br/>
그 이유는 정확히 `let` 이 도입 된 이유입니다.<br/>
`let`은 `var`와 동일한 방식으로 작성됩니다.

```ts
let hello = "Hello!";
```

중요한 차이점은 구문에 있는 것이 아니라 의미에 관한 것입니다.

## 블록-스코프 (Block-scoping)

`let` 을 사용하여 변수를 선언할 때 렉시컬-스코프 또는 블록-스코프를 사용합니다.<br/>
스코프가 포함된 함수로 누출되는 `var` 변수와 달리 블록-스코프 변수는 가장 가깝게 포함된 블록 또는 `for` 반복문 외부에서 사용할 수 없습니다.

```ts
function f(input: boolean) {
  let a = 100;
  if(input) {
    // 'a'는 이곳에서 가능
    let b = a + 1;
    return b;
  }
  // Error, 'b'는 여기에 존재하지 않습니다.
  return b;
}
```

여기 두 개의 지역변수 `a`와 `b`가 있습니다.
`a`의 스코프는 함수 `f`의 지역변수로 제한되어있고 `b`의 스코프는 `if`문 블록에 제한되어있습니다.

catch 문안에서 선언된 변수에도 유사한 스코프의 스코프 규칙을 갖습니다.

```ts
try {
  throw "oh no!";
}
catch (e) {
  console.log("Oh well.");
}

// Error, 'e'는 여기에 존재하지 않습니다
console.log(e);
```

블록-스코프 변수의 또 다른프로퍼티는 실제로 선언되기 전에는 읽거나 쓸 수 없다는 것입니다. 이러한 변수는 스코프내에서 *temporal dead zone* 이 될 때까지 "존재" 합니다.<br/>
이것은 `let` 선언 이전에 변수에 먼저 접근 할수 없는 정교한 방법이며 다행스럽게도 TypeScript 를 통해 알 수 있습니다.

```ts
a++:  // 'a'를 선얺기 전에는 사용할 수 없습니다.
let a;
```

주의해야 할 점은 블록-스코프 변수가 선언되기 전에 변수를 캡쳐할 수 있다는 것입니다.<br/>
선언전에 해당 함수를 실행시키는 것은 불간으합니다.

ES2015를 목표로 한다면 현대적인 런타임 오류를 던질 것입니다.<br/>
그러나 지금은 TypeScript는 허용되며 오류로 보고하지 않습니다.

```ts
function foo() {
  // 'a'를 캡쳐합니다.
  return a;
}

// 잘못된 호출로 'foo'가 선언되기 전에 'a'가 선언됩니다.
// 여기서 런타임 오류가 발생해야 합니다.
foo();
let a;
```

*Temporal dead zone* 에 대한 자세한 내용은 [Mozilla 개발자 네트워크](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_%EC%98%A4%EB%A5%98s_with_let)의 관련 내용을 참조하십시오.
