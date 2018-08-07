"use strict";
// Set up all DOM objects
const buttons = document.body.querySelectorAll(".buttons > button");
const output = document.querySelector(".window");
const operator = ["×", "÷", "-", "+", "%"];
let input = "0";
let operatorIsAllowed = false;
let dotIsAllowed = false;
let equation = "";
let result = "";

function clearInput(input) {
  if (input === "0") {
    return input.slice(0, input.length - 1);
  } else {
    return input;
  }
}

// Add event listeners for all buttons
for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function(e) {
    const btnText = this.innerHTML;
    if (btnText === "AC") {
      // clear the screen
      operatorIsAllowed = false;
      input = "0";
      equation = "";
    }
    else if (btnText === "CE") {
      // delete one character
      input = input.slice(0, input.length - 1);

    }
    else if (btnText === ".") {
      // process the dot input
      if (input.indexOf(".") === -1 || dotIsAllowed) {
        // only one dot is allowed
        input += ".";
        dotIsAllowed = false;
      }
    }
    else if (btnText === "=") {
      // process the equation when equals button is pressed
      if (operator.indexOf(input[input.length - 1]) > -1) {
        input = input.slice(0, input.length - 1);
      }
      equation = input.replace(/×/g, "*");
      equation = equation.replace(/÷/g, "/");
      result = Math.round(eval(equation) * 1000000) / 1000000;
      input = result;
      operatorIsAllowed = true;
    }
    else if (operator.indexOf(btnText) > -1) {
      // process the operator input
      if (operatorIsAllowed) {
        if (input !== "0") {
          input += btnText;
        }
        operatorIsAllowed = false;
      }
      else {
        if (input === "0") {
          input += btnText;
        } else {
          input = input.slice(0, input.length - 1) + btnText;
        }
      }
      dotIsAllowed = true;
      // after operator character it is allowed to insert another dot in equation
    }
    else {
      if (result !== "" && operator.indexOf(input[input.length - 1]) > -1) {
        input = clearInput(input);
        input += btnText;
        result = "";
      }
      else if (result !== "") {
        input = clearInput(input);
        input = btnText;
        result = "";
      }
      else {
        input = clearInput(input);
        input += btnText;
      }
      operatorIsAllowed = true;
    }
    // print the result on the screen
    output.innerHTML = input;
  };
}
