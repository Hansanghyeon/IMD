## `6 kyu` 중복 계산

중복 수를 센다.

입력 문자열에서 **대소문자를 구분하지 않는** 영문자와 숫자의 개수를 반환하는 함수를 작성하십시오. 입력 문자열은 알파벳(대문자 및 소문자)과 숫자 만 포함한다고 가정 할 수 있습니다.

ex)

"abcde" -> 0 `# no characters repeats more than once`
"aabbcde" -> 2 `# 'a' and 'b'`
"aabBcde" -> 2 `# 'a' occurs twice and 'b' twice ('b' and 'B')`
"indivisibility" -> 1 `# 'i' occurs six times`
"Indivisibilities" -> 2 `# 'i' occurs seven times and 's' occurs twice`
"aA11" -> 2 `# 'a' and '1'`
"ABBA" -> 2 `# 'A' and 'B' each occur twice`