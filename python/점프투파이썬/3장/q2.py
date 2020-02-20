three = []
counter = 0
result = 0

while counter < 1000:
  counter = counter + 1
  if counter % 3 == 0:
    three.append(counter)

for i in three:
  result = result + i

print result

# print 166833
# 🔑