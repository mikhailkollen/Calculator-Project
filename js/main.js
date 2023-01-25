// QUERY SELECTORS
const keyDelete = document.querySelector(".key-delete");
const numBtns = document.querySelectorAll(".key-num");
const operationKeys = document.querySelectorAll(".operation-key");
const keyReset = document.querySelector(".key-reset");
const keyEqual = document.querySelector(".key-equal");
const input = document.querySelector("#number");
const themeSwitch = document.querySelector("#theme-range-switch");
const body = document.querySelector("body");

input.value = 0;

if (localStorage.getItem("selectedTheme")) {
  themeSwitch.value = localStorage.getItem("selectedTheme");
  body.setAttribute("data-theme", localStorage.getItem("selectedTheme"));
} else {
  themeSwitch.value = 1;
}

const calculator = {
  val1: "",
  val2: "",
  switchValues: "val1",
  operation: "",
  result: "",
  add() {
    this.result = Number(this.val1) + Number(this.val2);
    input.value = this.result;
  },
  substract() {
    this.result = Number(this.val1) - Number(this.val2);
    input.value = this.result;
  },
  divide() {
    if (Number(this.val2) > 0) {
      this.result = (Number(this.val1) / Number(this.val2)).toFixed(2);
      input.value = this.result;
    } else {
      alert("Division by zero does not make sense in ordinary arithmetic");
      this.resetVals();
    }
  },
  multiply() {
    this.result = (Number(this.val1) * Number(this.val2)).toFixed(2);
    input.value = this.result;
  },
  resetVals() {
    this.val1 = "";
    this.val2 = "";
    this.switchValues = "val1";
    this.operation = "";
    for (let i = 0; i < operationKeys.length; i++) {
      operationKeys[i].style.filter = "brightness(100%)";
    }
  },
  calculateAfterResult() {
    this.val1 = this.result;
    this.operation = "";
    this.val2 = "";
    for (let i = 0; i < operationKeys.length; i++) {
      operationKeys[i].style.filter = "brightness(100%)";
    }
  },
};

const calculate = () => {
  switch (calculator.operation) {
    case "add":
      calculator.add();
      calculator.calculateAfterResult();
      break;
    case "substract":
      calculator.substract();
      calculator.calculateAfterResult();
      break;
    case "divide":
      calculator.divide();
      calculator.calculateAfterResult();
      break;
    case "multiply":
      calculator.multiply();
      calculator.calculateAfterResult();
      break;

    default:
      console.log("no operation selected");
  }
};

const handleValues = (key) => {
  for (let i = 0; i < operationKeys.length; i++) {
    operationKeys[i].style.filter = "brightness(100%)";
  }
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

operationKeys.forEach((key) => {
  key.addEventListener("click", () => {
    for (let i = 0; i < operationKeys.length; i++) {
      operationKeys[i].style.filter = "brightness(100%)";
    }
    key.style.filter = "brightness(120%)";
    if (key.value === "substract" && calculator.val1 === "") {
      calculator.val1 += "-";
      input.value = calculator.val1;
      key.style.filter = "brightness(120%)";
    } else if (calculator.val1 !== "" && calculator.val2 !== "") {
      calculate();
      calculator.operation = key.value;
      key.style.filter = "brightness(120%)";
    } else {
      calculator.switchValues = "val2";
      calculator.operation = key.value;
    }
  });
  key.addEventListener("mouseover", () => {
    key.style.filter = "brightness(120%)";
  });
  key.addEventListener("mouseout", () => {
    if (calculator.operation !== key.value) {
      key.style.filter = "brightness(100%)";
    } else {
      console.log(calculator.operation);
    }
  });
});

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
  calculate();
});

themeSwitch.addEventListener("change", () => {
  body.setAttribute("data-theme", themeSwitch.value);
  localStorage.setItem("selectedTheme", themeSwitch.value);
});
