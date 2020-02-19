pin = '881120-1068234'

divider = pin.index('-')

yyyy = '19' + pin[:2]
mm = pin[2:4]
dd = pin[4:6]

rest = pin[divider+1:]

print 'YYYYMMDD', yyyy, mm, dd
print 'rest', rest