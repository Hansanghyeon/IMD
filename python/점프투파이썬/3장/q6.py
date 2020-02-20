numbers = [1, 2, 3, 4, 5]
result = [num * 2 for num in numbers if num % 2 == 1]
print(result)

# [표현식 for 항목 in 반복가능객체 if 조건문]