let o = {
  a: "foo",
  b: 12,
  c: "bar",
};

// let {a, b}: {a: string, b: number} = o;

interface dest {
  a: string;
  b: number;
}

let {a, b}: dest = o;

console.log(a);
console.log(b);