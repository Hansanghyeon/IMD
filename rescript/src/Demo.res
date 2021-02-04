Js.log("Hello, World!")

let x = ref(5)
x := x.contents + 1

Js.log(x)

Js.log("Hello" ++ "world")

Js.log(true)
Js.log(false)
Js.log(!true)
// Js.log(true && "text true")
// 텍스트와 비교할 수가 없다??
if true && true {
  Js.log("test")
}
Js.log(3)
Js.log(3.1415)
Js.log(3 + 5)
Js.log(mod(5, 3))

// Object
type point = {
  x: int,
  mutable y: string,
}
let point = {
  x: 20,
  y: "test",
}
Js.log(point)

// Array
let myArray = [1, 2, 3]
Js.log(myArray)
myArray[1] = 0
Js.log(myArray)
let myarraty = (1, "Bob", true)
Js.log(myarraty)

(
  arg => {
    Js.log(arg)
  }
)("test")

let named = arg => {
  Js.log(arg)
}

// name("name test")
