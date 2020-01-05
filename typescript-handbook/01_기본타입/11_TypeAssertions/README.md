# 타입 단언

때로는 TypeScript 보다 더 많은 값을 알아야 하는 상황에 놓일 수도 있습니다.<br/>
일반적으로는 이 문제를 일부 엔티티의 타입이 현재 타입보다 더 구체적일 수도 있다는 것을 알고 있을때 발생합니다.

*Tpye assertions* 은 컴파일러에게 "나를 믿어, 내가 하고 있는 일을 안다"라고 말하는 방법입니다. type asserion은 다른 언어의 형 변환(타입캐스팅)과 비슷하지만 특별한 검사나 데이터를 재구성하지는 않습니다.<br/>
런타임에 영향을 미치지 않으며 컴파일러에서만 사용됩니다.<br/>
TypeScript 는 개발자가 필요한 특별한 검사를 수행했다고 가정합니다.

Type assertions은 두 가지 형태를 가집니다.<br/>
하나는 "angle-bracket" (꺾쇠괄호) 구문입니다.

```ts
let someValue: any = "this is a stirng";
let strLength: number = (<string>someValue).length;
```

그리고 다른 구문은 `as` 입니다

```ts
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

두 샘플은 동일합니다.<br/>
다른 하나를 사용하는 것은 주로 선호도에 따른 선택입니다.<br/>
그러나 TypeScript 를 JSX와 함께 사용할 때는 `as` 스타일의 단언만 허용됩니다.