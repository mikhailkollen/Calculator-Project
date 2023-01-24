// QUERY SELECTORS

// const keyAdd = document.querySelector(".key-add");
// const keySubstract = document.querySelector(".key-substract");
// const keyDivide = document.querySelector(".key-divide");
// const keyMultiply = document.querySelector(".key-multiply");
const keyDelete = document.querySelector(".key-delete");
const numBtns = document.querySelectorAll(".key-num");
const operationKeys = document.querySelectorAll(".operation-key");
const keyReset = document.querySelector(".key-reset");
const keyEqual = document.querySelector(".key-equal");
const input = document.querySelector("#number");
const themeSwitch = document.querySelector("#theme-range-switch");
const body = document.querySelector("body");

input.value = 0;

// -----CHANGING COLOR THEMES

const calculator = {
  val1: "",
  val2: "",
  switchValues: "val1",
  operation: "",
  add() {
    input.value = Number(this.val1) + Number(this.val2);
  },
  substract() {
    input.value = Number(this.val1) - Number(this.val2);
  },
  divide() {
    if (Number(this.val2) > 0 && Number(this.val1) !== 0) {
      input.value = (Number(this.val1) / Number(this.val2)).toFixed(2);
    } else {
      alert("Division by zero does not make sense in ordinary arithmetic");
      this.resetVals();
    }
  },
  multiply() {
    input.value = (Number(this.val1) * Number(this.val2)).toFixed(2);
  },
  resetVals() {
    this.val1 = "";
    this.val2 = "";
    this.switchValues = "val1";
    this.operation = "";
  },
};

const handleValues = (key) => {
  if (calculator.switchValues === "val1") {
    calculator.val1 += key.value;
    input.value = Number(calculator.val1);
  } else {
    calculator.val2 += key.value;
    input.value = Number(calculator.val2);
  }
};

input.addEventListener("change", () => {
  if (calculator.switchValues === "val1") {
    calculator.val1 = input.value;
    console.log(calculator.val1);
  } else {
    calculator.val2 = input.value;
    console.log(calculator.val2);
  }
});

numBtns.forEach((numKey) =>
  numKey.addEventListener("click", () => handleValues(numKey))
);

operationKeys.forEach((key) =>
  key.addEventListener("click", () => {
    calculator.switchValues = "val2";
    calculator.operation = key.value;
  })
);

keyReset.addEventListener("click", () => {
  input.value = 0;
  calculator.resetVals();
});

keyDelete.addEventListener("click", () => {
  if (calculator.switchValues === "val1") {
    calculator.val1 = calculator.val1.substring(0, calculator.val1.length - 1);
    input.value = Number(calculator.val1);
  } else {
    calculator.val2 = calculator.val2.substring(0, calculator.val2.length - 1);
    input.value = Number(calculator.val2);
  }
});

keyEqual.addEventListener("click", () => {
  // console.log(calculator.val1, calculator.val2);
  switch (calculator.operation) {
    case "add":
      calculator.add();
      calculator.resetVals();
      break;
    case "substract":
      calculator.substract();
      calculator.resetVals();
      break;
    case "divide":
      calculator.divide();
      calculator.resetVals();
      break;
    case "multiply":
      calculator.multiply();
      calculator.resetVals();
      break;

    default:
      console.log("no operation selected");
  }
});

themeSwitch.addEventListener("change", () => {
  body.setAttribute("data-theme", themeSwitch.value);
});
// const calc = (func, num) => {
//   return func ? func(num) : num;
// };

// function zero(operation) {
//   return calc(operation, 0);
// }
// function one(operation) {
//   return calc(operation, 1);
// }
// function two(operation) {
//   return calc(operation, 2);
// }
// function three(operation) {
//   return calc(operation, 3);
// }
// function four(operation) {
//   return calc(operation, 4);
// }
// function five(operation) {
//   return calc(operation, 5);
// }
// function six(operation) {
//   return calc(operation, 6);
// }
// function seven(operation) {
//   return calc(operation, 7);
// }
// function eight(operation) {
//   return calc(operation, 8);
// }
// function nine(operation) {
//   return calc(operation, 9);
// }

// function plus(num2) {
//   return function (num1) {
//     return num1 + num2;
//   };
// }

// function minus(num2) {
//   return function (num1) {
//     return num1 - num2;
//   };
// }

// function times(num2) {
//   return function (num1) {
//     return num1 * num2;
//   };
// }

// function dividedBy(num2) {
//   return function (num1) {
//     return Math.floor(num1 / num2);
//   };
// }
