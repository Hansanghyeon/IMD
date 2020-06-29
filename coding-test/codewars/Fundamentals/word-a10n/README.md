## Word a10n `6 kuy`

이 단어 `i18n`는 `internationaliaztion` 개발자 커뮤니티에서 일반적으로 사용되는 약어로 전체 단어를 입력하고 철자를 정확하게 입력하는 대신 사용됩니다. 마찬가지로 `a11y`는 `accessibility`의 약어입니다.

다음 규칙에 따라 문자열을 가져와서 **길이가 4 이상인** 문자열 내의 모든 "단어"를 약어로 만드는 함수를 작성하십시오.

- "단어"는 일련의 알파벳 문자입니다. 이 정의에 따라 공백이나 하이픈 같은 다른 문자는 일변의 문자를 두 단어로 분리합니다. ("elephant-ride" -> "elephant" + "ride")
- 축약 된 단어 버전에는 첫 글자, 제거 된 글자 수, 마지막 글자가 있어야 합니다.

ex

```
abbreviate("elephant-rides are really fun!")
//          ^^^^^^^^*^^^^^*^^^*^^^^^^*^^^*
// words (^):   "elephant" "rides" "are" "really" "fun"
//                123456     123     1     1234     1
// ignore short words:               X              X

// abbreviate:    "e6t"     "r3s"  "are"  "r4y"   "fun"
// all non-word characters (*) remain in place
//                     "-"      " "    " "     " "     "!"
=== "e6t-r3s are r4y fun!"
```