# 인터페이스 확장

클래스처럼 인터페이스도 서로를 확장할 수 있습니다.<br />
이렇게 하면 한 인터페이스의 멤버를 다른 인터페이스로 복사할 수 있으므로 인터페이스를 재사용 가능한 컴포넌트로 분리하는 방법을 더 유연하게 할 수 있습니다.

```ts
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
```

여러 인터페이스를 확장하여 모든 인터페이스를 결합하여 만들 수 있습니다.

```ts
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```