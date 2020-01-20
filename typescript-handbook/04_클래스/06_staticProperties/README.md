# 정적 프로퍼티

지금까지는 인스턴스의 클래스 멤버들에 대해서만 이야기했습니다.<br />
인스턴스는 인스턴스화될 때 객체에서 나타납니다.<br />
또한 인스턴스가 아닌 클래스 자체에 볼 수 있는 스태틱 멤버도 생성할 수 있습니다.

이 예제에서 모든 grid의 일반적인 값이기 때문에 origin에 `스태틱`을 사용합니다.<br />
각 인스턴스는 클래스의 이름을 미리 정의하여 이 값에 접근합니다.<br />
인스턴스의 접근자 앞에 `this.`를 추가하는 것과 비슷하게 `static` 접근자 앞에 `Grid`를 추가합니다.

```ts
class Grid {
  static origin = { x: 0, y: 0 };
  calculateDistanceFromOrigin(point: { x: number; y: number; }) {
    let xDist = (point.x - Grid.origin.x);
    let yDist = (point.y - Grid.origin.y);
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor(public scale: number) {}
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));