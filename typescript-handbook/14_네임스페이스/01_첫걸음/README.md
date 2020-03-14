# 첫 걸음

먼저 이 페이지의 예제로 사용할 프로그램에서부터 시작해보겠습니다.<br/>
웹 페이지의 양식에 대한 사용자 입력을 확인하거나 외부에서 제공하는 데이터 파일의 형식을 확인하기 위해 작성할 수 있는 간단한 문자열 유효성 검사기를 작성했습니다.

## 단일 파일의 유효성 검사기

```ts
interface StringValidator {
  isAcceptable(s: string): boolean;
}
let lettersRegexp = /^[A-Za-z]+$/;
let numberRegexp = /^[0-9]+$/;

class LetterOnlyValidator implements StringValidator {
  isAceeptable(s: string) {
    return lettersRegexp.test(s);
  }
}

class ZipCodeValidator implements StringValidator {
  isAceeptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}

// 시험용 샘플
let string = ['Hello', '98052', '101'];

// 사용할 Validators
let validators: {[s: string]: StringValidator } = {};
validators['ZIP Code'] = new ZipCodeValidator();
validators['Letters only'] = new LettersIOnlyValidator();

// 각 문자열이 Validator를 통과헀는지 여부를 보여줍니다.
for ( let s of string) {
  for ( let name in validator) {
    let isMatch = validator[name].isAcceptable(s);
    console.log(`'${s}' ${isMatch ? 'matches' : 'does not match'} '${name}'.`);
  }
}
```

## Namespacing

Validator를 더 추가함에 따라 타입을 추적하고 다른 객체와의 이름 충돌에 대해 걱정하지 않을 수 있는 일종의 조직 체계를 원할 것입니다.<br/>
전역 네임스페이스에 다른 이름을 많이 추가하는 대신 객체를 네임스페이스로 마무리합시다.

이 예제에서는 모든 vlidator 관련 엔티티를 `Validator`라는 네임스페이스로 이동합니다.<br/>
여기서 인터페이스와 클래스를 네임스페이스 외부에서 볼 수 있기를 원하기 때문에 `export`를 머리말에 붙입니다.<br/>
반대로 변수 `lettersRegexp`와 `numberRegexp`는 구현 세부 사항이므로 노출되지 않은 상태로 남아있어 네임스페이스 외부의 코드에는 보이지 않습니다.<br/>
파일의 아래쪽에 있는 테스트 코드에서 (예: `Validation.LettersOnlyValidator`)와 같이 네임스페이스 오비ㅜ에서 사용할 경우 타입의 이름을 확인해야 합니다.

## Namespaced Validators

```ts
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}

// 시험용 샘플
let strings = ["Hello", "98052", "101"];

// 사용할 Validators
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// 각 문자열이 Validator를 통과했는지 여부를 보여 줍니다.
for (let s of strings) {
    for (let name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
}
```