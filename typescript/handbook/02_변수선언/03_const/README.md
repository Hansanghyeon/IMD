# const 선언

`const` 는 변수를 선언하는 또 다른 방법입니다.

```ts
const numLivesForCat = 9;
```

그것은 `let` 선언과 같지만 그 이름에서 알 수 있듯이 바인딩 된 후에는 값을 변경할 수 없습니다.<br/>
즉 `let`과 동일한 스코프 규칙을 가지고 있지만 규칙을 다시 할당할 수 없습니다.

이것은 참조하는 값이 불변이라는 개념과 혼동되어서는 안됩니다.

```ts
const numLivesForCat = 9;
const kitty = {
  name: "Aurora",
  numLives: numLivesForCat,
}

// Error
kitty = {
  name: "Danielle",
  numLives: numLivesForCat
}

// All 👍
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;
```

이를 방지하기 위해 구체적인 조치를 취하지 않는 한 `const` 변수의 내부 상태는 여전히 수정할 수 있습니다. 다행히 TypeScript를 사용하면 객체의 멤버를 `readonly` 로 지정할 수 있습니다.
