# 이터러블

`Symbol.iterator` 프로퍼티에 대한 궇ㄴ을 하고 있는 객체는 iterable로 간주됩니다.<br/>
`Array`, `Map`, `Set`, `String`, `Int32Array`, `Uint32Array` 등과 같은 몇몇 내장 타입은 이미 구현된 `Symbol.iterator` 프로퍼티를 가지고 있습니다.

객체의 `Symbol.iterator` 함수는 반복할 값 목록을 반환하는 것을 담당한다.

## `for..of` 문

`for..of`는 반복 가능한 객체에 대해 반복하며 객체에 대해 `Symbol.iterator` 프로퍼티를 호출합니다.<br/>
다음은 배열의 간단한 `for..of` 루프입니다.

```ts
let someArray = [1, "string", false];

for (let entry of someArray) {
  console.log(entry);  // 1, 'string', false
}
```

## `for..of` vs `for..in` 문

`for..of`와 `for..in` 모두 리스트를 반복합니다.<br/>
반복되는 값은 다르지만, `for..in`은 반복되는 객체의 키를 반환하는 반면 `for..of`는 반복되는 객체의 숫자 프로퍼티의 값을반환 합니다.

다음은 이러한 차이를 보여주는 예제입니다.

```ts
let list = [4, 5, 6];

for (let i in list) {
  console.log(i);  // 0, 1, 2
}

for (let i of list) {
  console.log(i);  // 4, 5, 6
}
```

또 다른 차이점은 `for..in`은 어떠한 객체에서도 작동한다는 것입니다.<br/>
이 객체의 프로퍼티를 검사하는 방법으로 사용됩니다.<br/>
한편 `for..of`는 주로 반복 가능한 객체의 값에 관심이 있습니다.

`Map`과 `Set`같은 내장객체는 저장된 값에 접근할 수 있게 해 주는 `Symbol.iterator` 프로퍼티를 구현합니다.

```ts
let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";

for (let pet in pets) {
  console.log(pet);  // "species"
}

for (let pet of pets) {
  console.log(pet);  // "Cat", "Dog", "Hamster"
}
```

## 코드 생성

### ES3와 ES5 대상

ES5또는 ES3를 대상으로 할 때 반복자는 `Array` 타입의 값에만 사용할 수 있습니다.<br/>
컴파일러는 `for..of` 루프를 위한 간단한 `for` 루프를 생성할 것입니다.

```ts
let numbers = [1, 2, 3];
for (let num of numbers) {
  console.log(num);
}
```

다음과 같이 생성됩니다.

```ts
var numbers = [1, 2, 3];
for (var _i = 0; _i < numbers.length; _i++) {
  var num = numbers[_i];
  console.log(num);
}
```

### ECMAScript 2015 이상 대상

ECMAScript 2015 호환 엔진을 대상으로 할 때 컴파일러는 엔진에서 내장 반복자 구현을 대상으로 `for..of` 루프를 생성합니다.