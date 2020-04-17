## Use meaningful variable names

독자가 차이점이 무엇을 제공하는지 알 수 있도록 이름을 구별하십시오.

### BAD

```ts
function between<T>(a1: T, a2: T, a3: T): boolean {
  return a2 <= a1 && a1 <= a3;
}
```

### GOOD

```ts
function between<T>(value: T, left: T, right: T): boolean {
  return left <= value && value <= right;
}
```

## Use pronounceable variable names

발음 할 수 없으면 바보처럼 들리지 않고 토론 할 수 없습니다.

### BAD

```ts
type DtaRcrd102 = {
  genymdhms: Date;
  modymdhms: Date;
  pszqint: number;
}
```

### GOOD

```ts
type Customer = {
  generationTimestamp: Date;
  modificationTimestamp: Date;
  recordId: number;
}
```

## Use the same vocabulary for the smae type of variable

### BAD

```ts
function getUserinfo(): User;
function getUserDetails(): User;
function getuserData(): User;
```

### GOOD

```ts
function getUser(): User;
```

## Use searchable names

우리는 지금보다 더 많은 코드를 읽을 것입니다. 우리가 작성하는 코드는 읽고 검색할 수 있어야합니다. 프로그램을 이해하기위한 의미가 담긴 변수를 명명, 변수를 검색 가능하게 만드십시오. TSLint와 같은 도구는 명명되지 않은 상수를 식별하는 데 더움이 될 수 있습니다.

### BAD

```ts
// What the heck is 86400000 for?
setTimeout(restart, 86400000);
```

### GOOD

```ts
// Declare them as capitalized named constants
const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

setTimeout(restart, MILLISECONDS_IN_A_DAY);
```

## Use explanatory variables

### BAD

```ts
declare const users: Map<string, User>;

for (const keyValue of users) {
  // iterate through users map
}
```

### GOOD

```ts
declare const users: Map<string, User>;

for (const [id, user] of users) {
  // iterate through users map
}
```

## AVoid Mental Mapping

암시적인 것보다 명시적인 것이 좋습니다. 선명도한 것이 최고입니다.

### BAD

```ts
const u = getUser();
const s = getSubscription();
const t = charge(u, s);
```

### GOOD

```ts
const user = getUser();
const subscription = getSubscription();
const transaction = charge(user, subscription);
```

## Don't add unneeded context

클래스 / 유형 / 객체 이름이 무언가를 말하면 변수 이름에서 반복하지 마십시오.

### BAD

```ts
type Car = {
  carMake: string;
  carModel: string;
  carColor: string;
}

function print(car: Car): void {
  console.log(`${car.carMake} ${car.carModel} (${car.carColor})`);
}
```

### GOOD

```ts
type Car = {
  make: string;
  model: string;
  color: string;
}

function print(car: Car): void {
  console.log(`${car.make} ${car.model} (${car.color})`);
}
```

## Use default arguments instead of short circuituing or conditionals

기본 인수는 종종 단락보다 더 깨끗합니다.

### BAD

```ts
function loadPages(count?: number) {
  const loadCount = count !== undefined ? count : 10;
  // ...
}
```

### GOOD

```ts
function loadPages(count: number = 10) {
  // ...
}
```

## Use enum to document the intent

열거 형은 코드의 의도를 문서화하는데 도움이 될 수 있습니다. 예를 들어, 정확한 값이 아닌 다른 값이 걱정되는 경우

### BAD

```ts
const GENRE = {
  ROMANTIC: 'romantic',
  DRAMA: 'drama',
  COEMDY: 'comedy',
  DOCUMENTARY: 'documentary',
}

project.configureFilm(GENRE.COMEDY);

class Projector {
  // declaration of Projector
  configureFilm(genre) {
    switch (genre) {
      case GENRE.ROMANTIC:
        // some logic to be executed
    }
  }
}
```

### GOOD

```ts
enum GENRE {
  ROMANTIC,
  DRAMA,
  COMEDY,
  DOCUMENTARY,
}

project.configureFilm(GENRE.COMEDY);

class Projector {
  // declaration of Projector
  configureFilm(genre) {
    switch (genre) {
      case GENRE.ROMANTIC:
        // some logic to be executed
    }
  }
}
```