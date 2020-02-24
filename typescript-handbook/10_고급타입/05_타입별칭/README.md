# 타입 별칭

타입 aliases는 타입의 새로운 이름을 생성합니다.<br/>
타입 aliases은 인터페이스와 유사하지만 원시타입, 유니온, 튜플 및 기타 직접 작성해야 하는 다른 타입의 이름을 지정할 수 있습니다.

```ts
type Name = string;
type NameResolver = () => string;
type NameOrRevoler = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === 'stirng')
    return n;
  else
    return n();
}
```

Aliasing(Type Aliases)은 실제로 새로운 타입을 생성하지는 않습니다. 그 타입을 참조하기 위해 새로운 이름을 생성합니다.<br/>
원시 값을 Aliasing 하는 것은 문서의 형태로 사용될 수 있지만 굉장히 유용하지 않습니다.

인터페이스와 마찬가지로 타입 aliases도 일반적일 수 있습니다. aliases 선언의 오른쪽 타입 매개 변수를 추가하여 사용하면 됩니다.

```ts
type Container<T> = { value: T };
```

type alias를 프로퍼티에서 참조할 수도 있습니다.

```ts
type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
}
```

교차(intersection) 타입과 함께 mind-bending 타입을 만들 수 있습니다.

```ts
type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
  name: string;
}

var people: LinkedList<Person>
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;
```

그러나 타입 alias가 선언의 다른 오른쪽에 나타나는 것은 불가능합니다.

```ts
type Yikes = Array<Yikes>;  // ❌
```

## Interfaces vs. Type Aliases

앞서 언급했듯이, 타입 type aliases 는 인터페이스와 같은 역할을 할 수 있지만 몇 가지 미묘한 차이점이 있습니다.

한가지 다른 점은 인터페이스가 어디에서나 사용되는 새로운 이름을 만들어 낸다는 것입니다.<br/>
타입 aliases는 새로운 이름을 만들지 않습니다 예를 들어 오류 메시지는 alias 이름을 사용하지 않습니다.<br/>
아래 코드에서, 에디터의 `interfaced`위로 마우스를 가져가면 `Interface`를 반환할 것을 보여주지만 `aliased`는 객체 리터럴 타입을 반환한다는 것을 보여줍니다.

```ts
type Alias = { num: number }
interface Interface {
  num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;
```

두 번째 더 중요한 차이점은 타입 aliases를 다음에서 확장하거나 구현할 수 없다는 것입니다 (다른 타입을 확장/구현할 수도 없습니다).<br/>
왜냐하면 소프트웨어의 이상적인 특성이 확장에 열려있다 가능한 경우 타입 alias에 대한 인터페이스를 사용해야 합니다.<br/>
다른 한편으로는, 인터페이스로 일부 형태를 표현할 수 없고 유니온이나 튜플 타입을 사용해야 하는 경우 타입 aliases을 사용하는 것이 보통 좋습니다.