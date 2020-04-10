TypeScript와 ES6의 클래스가 도입됨에 따라 클래스 및 클래스 멤버에 어노테이션 또는 변경을 지원하기 위해 추가적인 기능이 필요한 일부 상황이 있습니다.<br/>
데코레이터는 클래스 선언과 멤버에 대한 어노테이션과 메타-프로그래밍 구문을 모두 추가할 수 있는 방법을 제공합니다.<br/>
데코레이터는 JavaScript의 stage 2 제안이며 TypeScript의 실험적인 기능으로 사용할 수 있습니다.

> 주의사항 데코레이터는 향후 변경될 수 있는 실험적 기능입니다.

데코레이터에 대한 실험적인 지원을 사용하려면 커맨드 라인이나 `tsconfig.json`에서 `experimentalDecorators` 컴파일러 옵션을 사용하도록 활설화해야 합니다.

```bash
tsc --target ES5 --experimentalDecorators
```

tsconfig.json

```json
{
  "complierOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

## 데코레이터

데코레이터는 클래스 선언, 메서드, 접근제어자, 프로퍼티 또는 매개변수에 첨부될 수 있는 특별한 종류의 선언입니다.<br/>
데코레이터는 `@표현식`의 형태를 사용하는데, 여기서 표현식은 데코레이팅된 선언에 대한 정보와 함께 런타임에 호출될 함수로 평가되어야 합니다.

예를 들어, 데코레이터 `@sealed`를 사용하여 당므과 같이 `sealed` 함수를 작성할 수 있습니다.

```ts
function sealed(target) {
  // 'target'으로 모든 해보세요...
}
```

### 데코레이터 팩토리

선언데 데코레이터를 적용하는 방법을 커스터마이징하고 싶다면 데코레이터 팩토리를 작성할 수 있습니다.<br/>
DecoratorFactory는 간단히 런타임에 데코레이터에 의해 호출될 표현식을 반환하는 함수입니다.

```ts
function color(value: string) {  // 이것은 데코레이터 팩토리입니다.
  return function (target) { // 이것은 데코레이터입니다.
    // 'target'과 'value'로 뭐든 해보세요
  }
}
```