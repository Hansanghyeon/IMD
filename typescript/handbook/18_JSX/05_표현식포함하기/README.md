# 표현식 포함하기

JSX는 중괄호 (`{}`)로 표현식을 감싸고 태그 사이에 표현식을 삽입할 수 있게합니다.

```ts
var a = <div>
  {["foo", "bar"].map(i => <span>{i / 2}</span>)}
  </div>
```

위의 코드는 문자열을 숫자로 나눌 수 없으므로 오류가 발생합니다.<br/>
출력은 `preserve` 옵션을 사용할 때 다음과 같습니다.

```ts
var a = <div>
  {["foo", "bar"].map(function (i) { return <span>{i / 2}</span>; })}
</div>
```
