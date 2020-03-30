# JSX

JSX는 XML 같은 구무니 포함 가능합니다.<br/>
의미는 구현에 따라 다르지만 유효한 JavaScript로 변형되어야 합니다.<br/>
JSX는 React에서 인기를 얻었으나 이후 다른 애플리케이션도 볼 수 있습니다.<br/>
TypeScript는 JSX를 직접 JavaScript에 포함, 타입 검사 및 컴파일할 수 있도록 지원합니다.

## 기본 사용 방법

JSX를 사용하려면 두 가지 작업을 해야 합니다.<br/>

1. 파일의 이름은 `.tsx` 확장자로 지정하세요
2. `jsx` 옵션을 활성화하세요

TypeScript에는 세 가지 JSX 모드가 있습니다. `preserve`, `react`, 그리고 `react-native`.<br/>
이 모드는 방출 단계에만 영향을 미칩니다 - 타입 검사에는 영향을 받지 않습니다.<br/>
`preserve` 모드는 다른 변환 단계 (예: Babel)에서 더 사용되도록 출력의 일부로 JSX를 계속 유지합니다.<br/>
추가적으로 출력에는 `.jsx` 파일 확장자가 지정되어 있습니다.<br/>
`react` 모드는 `React.createElement`를 방출하고 사용하기 전에 JSX 변환을 거칠 필요가 없으며 출력은 `.js` 파일 확장자를 갖습니다.<br/>
`react-native` 모드는 모든 JSX를 유지하고 있다는점에서 `prserve`와 같지만 대신 출력은 `.js` 파일 확장자를 갖습니다.

모드 | 입력 | 출력 | 출력 파일 확장자
---- | ---- | ---- | ----------------
preserve | <div /> | <div /> | .jsx
react | <div /> | React.createElement('div') | .js
react-native | <div /> | <div /> | js

이 모드는 커맨드 라인의 `--jsx` 명령어 또는 tsconfig.json 파일의 해당 옵션을 사용하여 지정할 수 있습니다.