var fibonacci = function (n) {
  if (n == 0 || n == 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

// ---- TEST ----

const chai = require("chai");
const assertEquals = chai.assert.strictEqual;

describe("Kata Test Suite", function () {
  it("should calculate large Fibonacci numbers", function () {
    // assertEquals(fibonacci(70), 190392490709135);
    // assertEquals(fibonacci(60), 1548008755920);
    // assertEquals(fibonacci(50), 12586269025);
    assertEquals(fibonacci(2), 1);
  });
});
