# 함수 타입

인터페이스 JavaScript 객체가 취할 수 있는 다양한 형태를 형성할 수 있습니다.<br />
프로퍼티를 가진 객체를 설명하는 것 외에도 인터페이스는 함수 타입을 형성할 수도 있습니다.

인터페이스가 포함된 함수의 타입을 형성하기 위해 인터페이스에 호출 시그니처을 제공합니다.<br />
이것은 매개변수 목록과 반환 타입만 주어진 함수 선언과 같습니다. 매개 변수 목록의 각 매개 변수에는 이름과 타입이 모두 필요합니다.

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

일단 정의되면 다른 인터페이스처럼 이 함수 타입의 인터페이스를 사용할 수 있습니다.<br />
여기서는 함수 타입의 변수를 생성하고 동일한 타입의 함수 값을 할당하는 방법을 보여줍니다.

```ts
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};
```

함수 타입의 타입을 검사할 때 매개 변수의 이름이 일치할 필요는 없습니다.<br />
예를 들어 다음과 같은 예를 작성할 수 있습니다.

```ts
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}
```

 함수 매개 변수는 하나씩 검사되며 각 해당 파라미터 위치의 타입을 서로 비교하며 검사합니다.<br />
 타입을 지정하지 않으려는 경우 함수 값이 `SearchFunc` 타입의 변수에 직접 지정되므로 TypeScript 의 컨텍스트 타입에 따라 인수 타입을 추론할 수 있습니다.<br />
 또한 여기서 함수 표현식의 반환 타입은 반환되는 값에 의해서도 암시적으로 나타납니다.<br />
 함수 표현식이 숫자나 문자열을 반환하는 경우 타입-체커가 반환 타입이 `SearchFunc` 인터페이스에 설명된 반환 타입과 일치하지 않는다는 경고를 했을 것입니다.

 ```ts
 let mySeach: SerachFunc;
 mySearch = function(src, sub) {
   let result = src.search(sub);
   return result > -1;
 }
 ```
 