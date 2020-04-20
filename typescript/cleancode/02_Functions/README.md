# Functions

## Function arguments (2 or fewer ideally)

함수 매개 변수의 양을 제한하는 것은 함수 테스트를보다 쉽게하기 때문에 매우 중요합니다. 세 개를 초고하면 조합 폭발로 이어지고 각가의 개별 인수로 다양한 사례를 테스트해야합니다. 

하나 또는 두 개의 주장이 이상적인 경우이며 가능한 경우 세 가지를 피해야합니다. 그 이상은 통합되어야 합니다. 일반적으로 인수가 두 개 이상인 경우 함수가 너무 많은 일을하려고합니다. 그렇지 않은 경우 대부분 높은 수준의 개체는 인수로 충분합니다.

많은 인수가 필요한 경우 객체 리터럴 사용을 고려하십시오.

함수가 어떤 속성을 기대하는지 명확하게하기 위해 구조분해 방법을 사용할 수 있습니다. 몇 가지 장점이 있습니다.

1. 누군가 함수 서명을 볼 때 어떤 속성이 사용되고 있는지 즉시 알 수 있습니다.
2. 명명 된 매개 변수를 시뮬레이션하는 데 사용할 수 있습니다.
3. 또한 구조화는 함수에 전달 된 인수 객체의 지정된 기본 값을 복제합니다. 부작용을 예방할 수 있습니다.
   참고: 인수 개체에서 구조가 해제 된 개체와 배열을 복제되지 않습니다.
4. TypeScript는 사용하지 않는 속성에 대해 경고합니다.


### BAD

```ts
function createMenu(title: string, body: string, buttonText: string, cancellable: boolean) {
  // ...
}

createMenu('Foo', 'Bar', 'Baz', true);
```

### GOOD

```ts
function createMenu(options: { title: string, body: string, buttonText: string, cencellable: boolean}) {
  // ...
}
createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true,
});
```

타입별칭을 사용하여 가독성을 더욱 향상시킬 수 있습니다.

```ts
type MenuOptions = {title: string, body: string, buttonText: string, cancelable: boolean};
function createMenu(options: MenuOptions) {
  //...
}
createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellabel: true,
});
```

## Functions should do one thing

이것은 소프트웨어 엔지니어링에서 가장 중요한 규칙입니다. 함수가 둘 이상의 작업을 수행하면 작성, 테스트 및 추론하기가 더 어렵습니다. 함수를 하나의 동작으로 분리 할 수 있으면 쉽게 리팩터링 할 수 있으며 코드가 훨씬 깔끔해집니다. 이 안내서 외에 다른 것을 취하지 않으면 많은 개발자보다 앞서있을 것입니다.

### BAD

```ts
function emailClients(clients: Client[]) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  })
}
```

### GOOD

```ts
function emailClients(clients: Client[]) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client: Client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

## Function names should say what they do

### BAD

```ts
function addToDate(date: Date, month: number): Date {
  // ...
}

const date = new Date();

// It's hard to tell from the function name what is added
addToDate(date, 1);
```

### GOOD

```ts
function addMonthToDate(date: Date, month: number): Date {
  // ..
}

const date = new Date();
addMonthToDate(date, 1);
```

## Functions should only be one level of abstraction

추상화 레벨이 두 개 이상인 경우 일반적으로 함수가 너무 많이 수행됩니다. 기능을 분할하면 재사용 성과 테스트가 더 쉬워집니다.

### BAD

```ts
function parseCode(code: string) {
  const REGEXES = [/* ... */];
  const statements = code.split(' ');
  const tokens = [];

  REGEXES.forEach((regex) => {
    statements.forEach((statement) => {
      // ...
    })
  });

  const ast = [];
  tokens.forEach((token) => {
    // lex...
  });

  ast.forEach((node) => {
    // parse...
  });
}
```

### GOOD

```ts
const REGEXES = [/* ... */];

function parseCode(code: string) {
  const tokens = tokenize(code);
  const syntaxTree = parse(tokens);
  
  syntaxTree.forEach((node) => {
    // parse ...
  })
}

function tokenize(code: string): Token[] {
  const statements = code.split(' ');
  const tokens: Token[] = [];

  REGEXES.forEach((regex) => {
    statements.forEach((statement) => {
      tokens.push(/* ... */);
    });
  });

  return tokens;
}

function parse(tokens: Token[]): SyntaxTree {
  const syntaxTree: SyntaxTree[] = [];
  tokens.forEach((token) => {
    syntaxTree.push(/* ... */);
  });

  return syntaxTree;
}
```

## Remove duplicate code

중복 코드를 피하기 위해서 최선은 다하십시오. 중복 코드는 논리는 변경해야 할 경우 무언가를 변경할 장소가 두 개 이상 있다는 것을 의미하기 때문에 나쁩니다.

식당을 운영하고 모든 토마토, 양파, 마늘, 향신료 등 인벤토리를 추적한다고 가정 해보십시오. 이목록을 유지하는여러 목록이있는 경우 토마토를 곁들인 요리를 제공 할 때 모두 업데이트해야합니다. 그들 안에, 목록이 하나만 있으면 업데이트 할곳이 한 곳뿐입니다!

종종 공통점이 많은 둘 이상의 약간 다른 것이 있기 때문에 중복 코드가있는 경우가 많지만 그 차이로 인해 동일한 기능을 수행하는 둘 이상의 별도의 함수가 필요합니다. 중복 코드를 제거한다는 것은 하나의 함수 / 모듈 / 클래스만으로 다양한 것들을 처리할 수 있는 추상화를 만드는 것을 의미합니다.

추상화를 올바르게 하는 것이 중요하므로 SOLID 원칙을 따라야 합니다. 잘못된 추상화는 중복 코드보다 나쁠 수 있으므로 조심하십시오! 이것을 말했지만, 좋은 추상화를 할 수 있다면 그렇게하십시오! 반복하지 마십시오. 그렇지 않으면 한 가지를 변경하고 싶을 때마다 여러 장소를 업데이트하게 됩니다.

### BAD

```ts
function showDeveloperList(developers: Developers[]) {
  developers.forEach((developer) => {
    const expectedSalary = developer.calculateExpectedSalary();
    const experience = developer.getExperience();
    const githubLink = developer.getGithubLink();

    const data = {
      expectedSalary,
      experience,
      githubLink
    };

    render(data);
  });
}

function showManagerList(managers: Manager[]) {
  managers.forEach((manager) => {
    const expectedSalary = manager.calculateExpectedSalary();
    const experience = manager.getExperience();
    const portfolio = manager.getMBAProjects();

    const data = {
      expectedSalary,
      experience,
      portfolio
    };

    render(data);
  })
}
```

### GOOD

```ts
class Developer {
  //...
  getExtraDetails() {
    return {
      githubLink: this.githubLink,
    }
  }
}

class Manager {
  // ...
  getExtraDetails() {
    return {
      portfolio: this.portfolio,
    }
  }
}

function show EmployeeList(employee: Developer | Manager) {
  employee.forEach((employee) => {
    const expectedSalary = employee.calculateExpectedSalary();
    const experience = employee.getExperience();
    const extra = employee.getExtraDetails();

    const data = {
      expectedSalary,
      experience,
      extra,
    };

    render(data);
  })
}
```

코드 복제에 대해 중요해야 합니다. 떄로는 불필요한 추상화를 도입하여 중복 코드와 복잡성 증가 사이에 상충 관계가 있습니다. 두 개의 서로 다른 모듈에서 두 개의 구현이 비슷해 보이지만 서로 다른 도메인에있는 경우 공통 코드를 추출하는 것보다 복제가 허용되고 선호 될 수 있습니다. 이 경우 추출 된 공통 코드는 두 모듈간에 간접적인 종속성을 발생시킵니다.

## Set default objects width Object.assign or destructureing

### BAD

```ts
type MenuConfig = {title?: string, body?: string, buttonText?: string, cancellable?: boolean};
function createMenu(config: MenuConfig) {
  config.title = config.title || 'Foo';
  config.body = config,body || 'Bar';
  config.buttonText = config.buttonText || 'Baz';
  config.cancellable = config.cancellable !== undefined ? config.cancellable : true;

  // ...
}
createMenu({ body: 'Bar' });
```

### GOOD

```ts
type MenuConfig = { title? string, body?: string, buttonText?: string, cancellable?: boolean };
function createMenu(config: MenuConfig) {
  const menuConfig = Object.assign({
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true
  }, config);

  // ...
}

createMenu({ body: 'Bar' });
```

또는 기본값으로 구조분해를 사용할 수 있습니다.

```ts
type MenuConfig = { title?: string, body?: string, buttonText?: string, cancellable?: boolean };
function createMenu({ title = 'Foo', body = 'Bar', buttonText = 'Baz', cancellable = true}: MenuConfig) {
  // ...
}

createMenu({ body: 'Bar' });
```

`undefined`또는 `null`값을 명시 적으로 전달하여 부작용과 예기치 않은 동작을 피하려면 TypeScript 컴파일러에 허용하지 않도록 지시 할 수 있습니다. `--strictNullChecks` TypeScript의 옵션을 참조하십시오.

## Don't use flags as function parameters

플래그는 사용자에게 이 기능이 둘 이상의 작업을 수행함을 알려줍니다. 함수는 한 가지 일을 해야합니다. `boolean` 결과에 따라 다른 코드 경로를 따르는 경우 함수를 분할하십시오.

### BAD

```ts
function createFile(name: string, temp: boolean) {
  if (temp) {
    fs.create(`./temp/${name}`);
  } else {
    fa.create(name);
  }
}
```

### GOOD

```ts
function createTempFile(name: string) {
  createFile(`./temp/${name}`);
}
function createFile(name: string) {
  fs.create(name);
}
```

## Avoid Side Effects (part1)

함수는 값을 가져와서 다른 값을 반환하는 것 이외의 작업을 수행하면 Side Effect을 일으 킵니다. Side Effect는 파일에 쓰거나 전역 변수를 수정하거나 실수로 모든 것에 연결하는 것일 수 있습니다.

이제 때때로 프로그램에 부작용이 있어야합니다. 이전 예제와 마찬가지로 파일에 써야 할 수도 있습니다. 당신이하고싶은 것은 이것을하고있는 곳을 집중시키는 것입니다. 특정 파일에 쓰는 여러 함수와 클래스가 없습니다. 하나의 서비스를 제공하십시오. 하나만

주요 요점은 어떤 구조로도 객체간에 상태를 공유하고, 어떤 것에 의해 쓰여질 수 있는 변경 가능한 데이터 유형을 사용하고 부작용이 발생하는 곳을 중앙 집중화하지 않는 등의 일반적인 함정을 피하는 것입니다. 이 작접을 수행 할 수 있다면 대다수의 다른 프로그래머보다 더 행복 할 것입니다.

### BAD

```ts
// Global variable referenced by following function.
```