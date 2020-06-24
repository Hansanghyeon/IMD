## `6 kyu` 모임

JONE은 친구를 초대했습니다. 그의 목록은 다음과 같습니다.

```
s = "Fred:Corwill;Wilfred:Corwill;Barney:Tornbull;Betty:Tornbull;Bjon:Tornbull;Raphael:Corwill;Alfred:Corwill";
```

이 목록을 가지고 아래 조건을 통해서 리스트를 만들어야 합니다.

- 문자열은 모두 대문자로 변경
- 알파벳 순으로 정렬
  - 성이 같은 경우 이름별로 정렬하십시오. 손님의 성과 이름은 쉼표로 구분 된 괄호 사이에 결과로 나타나야 합니다.

따라서 아래와 같은 리스트로 변환되어야 합니다.

```
"(CORWILL, ALFRED)(CORWILL, FRED)(CORWILL, RAPHAEL)(CORWILL, WILFRED)(TORNBULL, BARNEY)(TORNBULL, BETTY)(TORNBULL, BJON)"
```

같은 성을 가진 두명의 서로 다른 가족에서 두 사람도 같은 이름을 가질 수도 있습니다.