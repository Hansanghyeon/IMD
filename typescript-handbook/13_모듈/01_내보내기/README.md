# 내보내기 (Export)

## 내보내기 선언

변수, 함수, 클래스, 타입 별칭(alias) 또는 인터페이스와 같은 선언문은 `export` 키워드를 추가하여 내보낼 수 있습니다.

**Validation.ts**

```ts
export interface StringValidator {
  isAcceptable(s: string): boolean;
}
```

**ZipCodeValidatro.ts**

```ts
export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
```

## 내보내기 문

Export 문은 사용자를 위해 Export의 이름을 변경해야 하는 경우에 유용하므로 위의 예제를 다음과 같이 작성할 수 있습니다.

```ts
class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}

export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };
```

## 다시 내보내기

종종 모듈은 다른 모듈을 확장하고 일부 기능을 부분적으로 노출합니다.<br/>
다시 내보내기 (re-export)는 로컬로 import 하거나 로컬 변수를 도입하지 않습니다.

**ParselntBasedZipCodeValidator.ts**

```ts
export class ParseIntBasedZipCodeValidator {
  isAcceptable(s: string) {
    return s.length === 5 && parseInt(s).toString() === s;
  }
}

// 원본 validator 내보내야지만 이름을 변경합니다.
export { ZipCodeValidator as RegExpbasedZipCodeValidator} from './ZipCodeValidator";
```

선택적으로 모듈은 하나 이상의 모듈을 감싸고 `export * from 'module'` 구문을 사용하여 모든 export를 결합할 수 있습니다.

**AllValidators.ts**

```ts
export * from './StringValidator';       // export interface 'StringValidator'
export * from './LettersOnlyValidator';  // export interface 'LettersOnlyValidator'
export * from './ZipCodeValidator';      // export interface 'ZipCodeValidator'
```