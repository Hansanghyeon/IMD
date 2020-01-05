# String

웹 페이지와 서버를 위한 JavaScript 프로그램을 만드는 또 다른 기본적인 부분은 텍스트 데이터를 사용하는 것입니다.
다른 언어와 같이 이러한 텍스트의 데이터 타입을 참조하기 위해 `string` 타입을 사용합니다.
JavaScript 와 마찬가지로 TypeScript 또한 문자열 데이터를 감싸기 위해 큰 따옴표 (`"`)또는 작은 따옴표(`'`)를 사용합니다.

```ts
let color: string = "blue";
color = 'red';
```

여러 줄에 걸쳐 표현식을 포함할 수 있는 *템플릿 문자열* 을 사용할 수도 있습니다.
이 문자열은 백틱 / 백 쿼트 문자로 감싸져 있으며 포함된 표현식은 `${ 표현식 }` 형식입니다.

```ts
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;
```
이것은 위와 같이 선언한 `문장`과 같습니다.

```ts
let sentence: string = "Hello, my name is " + fullName + ".\n\n" +
    "I'll be " + (age + 1) + " years old next month.";
```
