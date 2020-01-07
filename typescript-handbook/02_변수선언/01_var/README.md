# `var` 선언

전통적으로 JavaScript에서 변수 선언은 `var` 키워드를 사용하였습니다.

```ts
var a = 10;
```

알다시피 방금 `a` 변수의 값은 `10`으로 선언하였습니다.
또한 함수 내에서 변수를 선언할 수도 있습니다.

```ts
function f() {
  var message = "Hello, world!";

  return message;
}
```

그리고 다른 함수 내부의 동일한 변수에 접근이 가능합니다.

```ts
function f() {
  var a = 10;
  return function g() {
    var b = a + 1;
    return b;
  }
}

var g = f();
g();  // 오류 '11'
```

위의 예제에서 `g` 함수는 `f` 함수에서 선언된 변수 `a`를 획득하였습니다.
`g` 함수가 호출되는 시점에 `a`의 값은 `f` 함수 내에 `a`의 값에 연결됩니다.
`f` 함수가 실행되는 시점에 `g` 함수가 호출되더라도 `a`에 접근하여 수정할 수 있습니다.

```ts
function f() {
  var a = 1;

  a = 2;
  var b = g();
  a = 3;

  return b;

  function g() {
    return a;
  }
}

f();  // '2' 반환
```

## 스코프 규칙 (Scoping rules)

`var` 선언은 다른 언어의 스코프 규칙에 비해 이상한 스코프 규칙이 몇가지 있습니다.

```ts
function f(shouldInitialize: boolean) {
  if(shouldInitialize) {
    var x = 10;
  }

  return x;
}

f(true);    // '10' 반환
f(false);   // 'undefined' 반환
```

어떤 독자는 이 예제를 두 번 실행해 볼 수도 있습니다.
변수 `x`는 `if` 블록 내에 선언되어 있지만 블록 바깥에서 접근할 수 있습니다.
`var` 선언은 함수, 모듈, 네임 스페이스 또는 전역 스코프에서 접근할 수 있기 때문에 가능합니다.
이것을 var-scoping 또는 function-scoping 이라고 부릅니다.
매개변수 또한 함수의 스코프입니다.

이러한 스코프 규칙은 몇 가지 유형의 실수를 유발할 수 있습니다.
그들이 악화시키는 한가지 문제점은 동일한 변수를 여러 번 선언하는 것은 실수가 아니라는 사실입니다.

```ts
function sumMatrix(matrix: number[][]) {
  var sum = 0;
  for(var i = 0; i < matrix.length; i++) {
    var currentRow = matrix[i];
    for(var i = 0; i < currentRow.length; i++) {
      sum += currentRow[i];
    }
  }

  return sum;
}
```

어쩌면 다소 쉽게 찾을 수도 있지만 `for-loop` 내에서 동일한 함수 스코프의 변수를 참조하기 때문에 실수로 변수 `i`를 덮어쓰게 됩니다.
숙련된 개발자들은 알겠지만 비슷한 종류의 버그는 코드 리뷰에서 끝없는 좌절의 원인이 될 수 있다.

## 변수 캡쳐링의 단점 (Variable capturing quirks)

잠깐 다음 코드의 출력을 예상해 보세요.

```ts
for(var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100 * i);
}
```

익숙하지 않은 사람들을 위해 `setTimeout` 은 일정한 시간이 지나면 함수를 실행하려고 합니다. (실행이 멈추는 것을 기다리고 있습니다.)

```bash
10
10
10
10
10
10
10
10
10
10
10
```

많은 JavaScript 개발자들은 이러한 동작에 친숙하지만 당신은 놀랐을 수도 있습니다.

대부분의 사람들은 이러한 결과를 기대합니다.

```bash
0
1
2
3
4
5
6
7
8
9
```

앞에서 변수 캡쳐링에 대해 언급한 내용을 기억하세요?<br/>
`setTimeout`에 전달하는 모든 함수 표현식은 실제로 동일한 스코프의 `i`를 참조합니다.

이것이 무슨 뜻인지 한번 생각해 봅시다.<br/>
`setTimeout` 은 몇 밀리 초 후에 함수를 실행하지만 `for` 루프가 실행을 중지 한 후에만 실행합니다.<br/>
`for` 루프가 실행을 중지했을 떄 `i`의 값은 `10` 입니다. 따라서 주어진 함수가 호출될 때마다 `10`을 출력합니다!

일반적인 해경 방법은 각 반복마다 `i`를 캡쳐하는 즉시 실행함수 표현식인 IIFE를 사용하는 것입니다.

```ts
for(var i = 0; i < 10; i++) {
  // 현재 값으로 함수를 호출함으로써
  // 'i'의 현재 상태를 캡쳐
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, 100 * i)
  })(i);
}
```

위의 이상하게 생긴 패턴은 매우 일반적입니다.<br/>
매개 변수 목록의 `i`는 `for` 루프에 선언된 `i`와 같지만 동일한 네이밍을 했기 때문에 루프를 변경할 필요가 없었습니다.