## 데코레이터 구성

다음 예제처럼 여러 데코레이터를 선언에 적용 할 수 있습니다.

- 한 줄에
  
  ```ts
  @f @g x
  ```

- 여러 줄에

  ```ts
  @f
  @g
  x
  ```

여러 데코레이터가 단일 선언에 적용되는 경우 평가는 수학에서의 함수 구성과 유사합니다.<br/>
이 모델에서 함수 f와 g을 구성할 때, 결과적인 합성 (f * g)(x)은 f(g(x))와 동일합니다.

따라서 TypeScript의 단일 선언에서 여러 데코레이터를 평가할 때 다음 단계를 수행합니다.

1. 각 데코레이터에 대한 표현식은 위에서 아래로 평가됩니다.
2. 그런 다음 결과는 아래에서 위로 함수를 호출합니다.

데코레이터 팩토리를 사용하려면 다음 예제에서 이 평가 순서를 관찰할 수 있습니다.

```ts
function f() {
  console.log("f(): evaluated");
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("f(): called");
  }
}

function g() {
  console.log("g(): evaluated");
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("g(): called");
  }
}

class C {
  @f()
  @g()
  method() {}
}
```

그러면 이 출력을 콘솔에 출력합니다.

```
f(): evaluated
g(): evaluated
g(): called
f(): called
```

### 데코레이터 평가

클래스 내의 다양한 선언에 데코레이터를 적용하는 방법에 잘 정의된 순서가 있습니다.

매개 변수 Decorator, 메서드, 접근제어자 또는 속성 Decorator가 각 정적 멤버에 적용됩니다. Method, Accessor, PropertiesDeocraotr 등에 의한 파라미터 Decorator는 각 정적 멤버에 대해 적용된다.

1. 메서드, 접근제어자 또는 프로퍼티 데코레이터에 이어지는 매개변수 데코레이터는 각 인스턴스 멤버에 적용됩니다.
2. 메서드, 접근제어자 또는 프로퍼티 데코레이터에 이어지는 매개변수 데코레이터는 각 정적 멤버에 적용됩니다.
3. 매개변수 데코레이터는 생성자에 적용됩니다.
4. 클래스 데코레이터는 클래스에 적용됩니다.

### 클래스 데코레이터

클래스 데코레이터는 클래스 선언 바로 직전에 선언됩니다.<br/>
클래스 데코레이터는 클래스 정의를 관찰, 수정 또는 바꾸는 데 사용할 수 있는 클래스 생성자에 적용됩니다.<br/>
클래스 데코레이터는 선언 파일이나 다른 ambient 컨텍스트(예: `선언` 클래스)에서 사용할 수 없습니다.<br/>
클래스 데코레이터에 대한 표현식은 런타임에 함수로 호출되며 데코레이팅 클래스의 생성자는 대상을 유일한 인수로 호출됩니다.<br/>
클래스 데코레이터가 값을 반환하는 경우, 클래스 선언을 제공된 생성자 함수로 대체합니다.

주의 사항: 새 생성자 함수를 반환하도록 선택해야하는 경우 원본 프로토타입을 유지하도록 관리해야합니다. 런타임에 데코레이터를 적용하는 로직은 이 작업을 수행하지 않습니다.

다음은 `Greeter` 클래스에 적용된 클래스 데코레이터(`@sealed`)의 예제입니다.

```ts
@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

다음 함수 선언을 사용하여 `@sealed` 데코레이터를 정의할 수 있습니다.

```ts
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}
```

`@sealed`가 실행되면 생성자와 프로토타입 모두를 봉인합니다.<br/>
다음은 생성자를 재정의하는 방법에 대한 예제입니다.

```ts
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  }
}

@classDecorator
class Greeter {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}

console.log(new Greeter("world"));
```

### 메서드 데코레이터

메서드 데코레이터는 메서드 선언 바로 직전에 선언됩니다.<br/>
데코레이터는 메서드이 프로퍼티 Descriptor에 적용되며 메서드 정의를 관찰, 수정 또는 바꾸는 데 사용할 수 있습니다.<br/>
메서드 데코레이터는 선언 파일, 오버로드 또는 기타 ambient 컨텍스트 (예: `선언` 클래스)에서 사용할 수 없습니다.

메서드 데코레이터의 표현식은 런타임에 다음 세 가지 인수와 함께 함수로 호출됩니다.

1. 정적 멤버에 대한 클래스의 생성자 함수거나 인스턴스 멤버에 대한 클래스의 프로토타입
2. 멤버의 이름
3. 멤버의 프로퍼티 Drscriptor

> 주의사항, 스크립트 타겟이 `ES5`보다 작은 경우 프로퍼티 Descriptor는 `undefined`가 됩니다.

메서드 데코레이터가 값을 반환하는 경우 해당 메서드에 대해 프로퍼티 descriptor로 사용됩니다.

> 주의사항, 스크립트 타겟이 `ES5`보다 작은 경우 반환 값은 무시됩니다.

다음은 `Greeter` 클래스의 메서드에 적용된 메서드 데코레이터 (`@enumberable`)의 예제입니다.

```ts
class Greeter {
  greeting: string;
  contructor(message: string) {
    this.greeting = message;
  }

  @enumberable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

다음 함수 선언을 사용하여 `@enumerable` 데코레이터를 정의할 수 있습니다.

```ts
function enumberable(value: boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enummmerable = value;
  }
}
```

`@enumerable(false)` 데코레이터는 데코레이터 팩토리입니다.<br/>
`@enumerable(false)` 데코레이터가 호출되면 프로퍼티 Descriptor의 `enumerable` 프로퍼티를 수정합니다.

### 접근제어자 데코레이터

접급제어자 데코레이터는 접근 제어자 선언 바로 직전에 선어됩니.<br/>
접근제어자 데코레이터는 접근제어자에 대한 프로퍼티 Descriptor에 적용되며 접근제어자 정의를 관찰, 수정 또는 바꾸는 데 사용할 수 있습니다.<br/>
데코레이터는 메서드의 프로퍼티 Descriptor에 적용되며 메서드 정의를 관찰, 수정 또는 바꾸는 데 사용할 수 있습니다.<br/>
접근제어자 데코레이터는 선언 파일이나 다른 ambient 컨텍스트 (예: `선언` 클래스)에서 사용할 수 없습니다.

> 주의사항, TypeScript는 단일 멤버에 대한 접근제어자 `get`과 `set` 모두 데코레이팅하는 것을 허용하지 않습니다. 대신 멤버의 모든 데코레이터가 순서를 따라 접근제어자에게 적용되어야 합니다. 왜냐하면 데코레이터가 프로퍼티 Descriptor에 적용되기 때문입니다. 그리고 각 선언을 별도로 구분하지 않고 `get`과 `set` 접근제어자를 결합합니다.

접근제어자 데코레이터 표현식은 런타임시 다음 세 가지 인수와 함께 함수로 호출됩니다.

1. 정적 멤버에 대한 클래스 생성자 함수나 인스턴스 멤버에 대한 클래스의 프로토타입이 있습니다 
2. 멤버의 이름
3. 멤버에 프로퍼티 Descriptor

> 주의사항, 스크립트 타겟이 `ES5`보다 작은 경우 프로퍼티 Descriptor는 `undefined`가 됩니다.

접근제어자 데코레이터가 값을 반환하는 경우 해당 멤버에 대한 프로퍼티 Descriptor로 사용됩니다.

> 주의사항, 스크립트 타겟이 `ES5`보다 작은 경우 반환 값은 무시됩니다.

다음은 `Point` 클래스의 멤버에 적용된 접근제어자 데코레이터 (`@configurable`)의 예제입니다.

```ts
class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  @configurable(false)
  get x() { return this._x }
  
  @configurable(false)
  get y() { return this._y }
}
```

다음 함수를 선언을 사용하여 `@configurable` 데코레이터를 정의할 수 있습니다.

```ts
function configurable(value: boolean) {
  return function (targt: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
  }
}
```

### 프로퍼티 데코레이터

프로퍼티 데코레이터는 프로퍼티 서언 바로 직전에 선언됩니ㅏㄷ.<br/>
프로퍼티 데코레이터는 선언 파일이나 기타 ambient 컨텍스트 (예: `선언`클래스)에서 사용할 수 없습니다.

프러퍼티 데코레이터는 표현식은 런타임에 다른 두 가지 인수와 함께 함수로 호출됩니다.

1. 정적 멤버에 대한 클래스 생성자 함수 또는 인스턴스 멤버에 해단 클래스의 프로토타입
2. 멤버의 이름

> 주의사항, 프로퍼티 Descriptor는 프로퍼티 Descriptor가 TypeScript에서 초기화되는 방법으로 인해 프로퍼티 Descriptor에 대한 인수로 제공되지 않습니다. 이는 현재 프로포토타입의 멤버를 정의할 때 인스턴스 프로퍼티를 설명하는 메커니즘이 없고, 프로퍼티에 대한 이니셜라이저를 관찰하거나 수정할 방법이 없기 때문이다. 반환값도 무시됩니다. 따라서 프로퍼티 데코레이터는 특정 이름의 프로퍼티가 클래스에 대해 선언되는 것을 관찰하는 데만 사용할 수 있습니다.

다음 예와 같이 이 정보를 사용하려 프로퍼티에 대한 메타 데이터를 기록할 수 있습니다.

```ts
class Greeter {
  @foramt('Hello, %s')
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    let formatString = getFormat(this, "greeting");
    return formatString.replace("%s", this.greeting);
  }
}
```

그 다음 함수 선언을 사용하여 `@foramt` 데코리엍와 `getFormat` 함수를 정의 할 수 있습니다.

```ts
import 'reflect-metatdata';

const formatMetadataKey = Symbol("format");

function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey) 
}
```

`@format("Hello, %s")` 데코레이터는 데코레이터 팩토리입니다.<br/>
`@format("Hello, %s")` 이 호출되면 `reflect-metadata` 라이트러리의 `Reflect.metadata` 함수를 사용하여 프로퍼티에 대한 메타 데이터 항목을 추가합니다.<br/>
`getFormat`를 호출하면 포맷에 대한 메타 데이터를 읽습니다.

> 참고, 이 예제에는 `reflect-metadata` 라이브러리가 필요합니다. `reflect-metadata` 라이브러리에 대한 자세한 정보는 메타데이터를 참조하세요.

### 매개변수 데코레이터

매개변수 데코레이터는 매개변수 선언 바로 직전에 선언됩니다.<br/>
매개변수 데코레이터는 클래스 생성자 또는 메서드 선언의 함수에 적용됩니다.<br/>
매개변수 데코레이터는 선언 파일, 오버로드 또는 기타 ambient 컨텍스트 (예: `선언`클래스)에서 사용할 수 없습니다.

매개변수 데코레이터의 표현식은 런타임에 다음 세 가지 인수와 함께 함수로 호출됩니다.

1. 정적 멤버에 대한 클래스의 생성자 함수 또는 인스턴스 멤버에 대한 클래스의 프로토타입
2. 멤버의 이름
3. 함수의 매개 변수 목록내에 매개 변수의 서수(순서가 있는) 인덱스

> 주의사항, 매개변수 데코레이터는 매개변수가 메서드에 선언되었음을 관찰하는 데만 사용할 수 있습니다.

매개변수 데코레이터의 반환 값은 무시됩니다.

다음은 `Greeter` 클래스 멤버의 매개 변수에 적용된 매개 변수 데코레이터 (`@required`)의 예제입니다.

```ts
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  @validate
  greet(@required name: string) {
    return "Hello " + name + ', ' + this.greeting;
  }
}
```

그 다음 함수 선언을 사용해 `@required`와 `@validate` 데코레이터를 정의할 수 있습니다.

```ts
import 'reflect-metadata';

const requiredMetadataKey = Symbol('required');

function required(target: Object, propertyKey: string | symbol, parameterInde: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, targetm proertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  let method = descriptor.value;
  descirptor.value = function() {
    let requiredParameters: number [] = Reflect.getOwnMetadata(requiredMetadataKey, target, proertyName) 
    if (requiredParameters) {
      for(let parameterIndex of requiredParameters) {
        if(parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
          throw new Error("Missing required argument.");
        }
      }
    }
    return method.apply(this, arguments);
  }
}
```

`@required` 데코레이터는 필요에 따라 매개변수를 표시하는 메타 데이터 항목을 추가합니다.<br/>
`@validate` 데코레이터는 기존 메서드을 호출하기 전에 기존의 `greet` 메서드를 validates 함수로 래핑합니다.

> 주의사항, 이 예제에는 `reflect-metadata` 라이브러리가 필요합니다. `reflect-metadata` 라이브러이에 대한 자세한 정보는 메타 데이터를 참조하세요.

### 메타 데이터

일부 예제에서는 실험적인 메타 데이터 API에 대한 polyfill을 추가하는 `reflect-metadata` 라이브러리를 사용합니다.<br/>
이 라이브러리는 아직 ECMAScript(JavaScript) 표준에 속하지 않습니다.<br/>
하지만 데코레이터가 공식적으로 ECMAScript 표준의 일부로 채택되면 이러한 확장 기능이 채택되도록 제안될 것입니ㅏㄷ.

이 라이브러리는 npm을 통해 설치할 수 있습니다.

```bash
npm i reflect-metatdata --save
```

TypeScript는 데코레이터가 있는 선언에 대한 특정 타입의 메타 데이터를 방출하기 위한 실험적인 지원을 포함하고 있습니다.<br/>
이 실험적인 지원을 활성화하려면 커맨드 라인 또는 `tsconfig.json`에서 컴파일러 옵션 `emitDecoratorMetadata`을 설정해야 합니다.

```bash
tsc --target ES5 --experiementalDecorators --emitDecoratorMetadata
```

tsconfig.json

```json
{
  "compilerOptions": {
    "taget": "ES5",
    "expertimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

활성화가 될 때 `reflect-metadata` 라이브러리를 임포트 한 추가적인 design-time 타입 정보를 런타임에 노출됩니다.

다음 예제에서는 이러한 기능이 실제로 작동하는 것을 볼 수 있습니다.

```ts
import 'reflect-metadata';

class Point {
  x: number;
  y: number;
}

class Line {
  private _p0: Point;
  private _p1: Point;

  @validate
  set p0(value: Point) { this._p0 = value;}
  get p0() { return this._p0; }

  @validate
  set p1(value: Point) { this._p1 = value; }
  get p1() { return this._p1; }
}

function validate<T>(target: any, proertyKey: string, descriptor: TypedProertyDescriptor<T>) {
  let set = descriptor.set;
  descriptor.set = function (value: T) {
    let type = Reflect.getMetadata("design:type", target, propertyKey);
    if( !(value instanceof type)) {
      throw new TypeError("Invalid type.");
    }
    set(value);
  }
}
```

TypeScript 컴파일러는 `@Reflect.metadata` 데코레이터를 사용하여 design-time 타입 정보를 주입합니다.

다음과 같은 TypeScript와 동일한 것으로 간주할 수 있습니다.

```ts
class Line {
  private _p0: Point;
  private _p1: Point;

  @validate
  @Reflect.metadata("design:type", Point);
  set p0(value: Point) { this._p0 = value; }
  get p0() { return this._p0; }

  @validate
  @Reflect.metadata("design:type", Point);
  set p1(value: Point) { this._p1 = value; }
  get p1() { return this._p1; }
}
```

> 참고, 데코레이터 메타 데이터는 시험적인 기능이며 향후 공개에서 중요한 변경 사항을 도입할 수 있습니다.