# 다형성의 `this` 타입

다형성의 `this` 타입은 포함된 클래스나 인터페이스의 서브타입 타입을 나타냅니다.<br/>
이것을 F-바운다 다형성이라고 합니다. 따라서 계층적으로 완만한 인터페이스를 훨씬 쉽게 표현할 수 있습니다.<br/>
각각의 연산자에 `this`를 반환하는 간단한 계산기가 있습니다.

```ts
class BasicCalculator {
  public constructor(protected value: number = 0) { }
  public currentValue(): number {
    return this.value;
  }
  public add(operand: number): this {
    this.value += operand;
    return this;
  }
  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
  // ... 다은 연산은 여기에 있습니다.
}

let v = new BasicCalculator(2)
  .multiply(5)
  .add(1)
  .currentValue();
```

클래스는 `this` 타입을 사용하기 때문에 확장할 수 있으며 새로운 클래스는 변경 없이 이전 메스드를 사용할 수 있습니다.

```ts
class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) {
    super(value);
  }
  public sin() {
    this.value = Math.sin(this.value);
    return this;
  }
  // ... 다른 연산은 여기에 있습니다.
}

let v = new ScientificCalculator(2)
  .multiply(5)
  .sin()
  .add(1)
  .currentValue();
```

`this` 타입이 없었다면 `ScientificCalculator`는 `BasicCalculator`를 확장하지도 못하고 완만한 인터페이스를 유지할 수 없었을 것입니다.<br/>
`multiply`는 `sin` 메서드가 없는 `BasicCalculator`를 반환했을 것입니다.<br/>
그러나 `this`타입의 경우 `multiply`는 `this`를 리턴합니다. `this`는 `ScientificCalculator`입니다.