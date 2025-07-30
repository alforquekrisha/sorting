/* file: script.js */
const generateElement = () => Math.floor(Math.random() * 100) + 1;

const generateArray = () => {
const numsArr = [];
for (let i = 0; i < 5; i++) numsArr.push(generateElement());
return numsArr;
}

const generateContainer = () => document.createElement("div");

const fillArrContainer = (element, arr) => {
element.innerHTML = "";
arr.forEach((num) => {
const spanElement = document.createElement("span");
spanElement.innerText = num;
element.appendChild(spanElement);
});
}

const isOrdered = (firstNum, secondNum) => firstNum <= secondNum;

const swapElements = (arr, index) => {
if (isOrdered(arr[index], arr[index + 1])) return;
arr[index] = arr[index] ^ arr[index + 1];
arr[index + 1] = arr[index] ^ arr[index + 1];
arr[index] = arr[index] ^ arr[index + 1];
}

const highlightCurrentEls = (element, index) => {
element.querySelectorAll("span")[index].style.border = "2px dashed red";
element.querySelectorAll("span")[index + 1].style.border = "2px dashed red";
}

const generateBtn = document.getElementById("generate-btn");
const sortBtn = document.getElementById("sort-btn");

const startingArrayContainer = document.getElementById("starting-array");
const allArraysContainer = document.getElementById("array-container");

sortBtn.style.display = "none";

generateBtn.addEventListener("click", () => {
sortBtn.style.display = "inline";
allArraysContainer.innerHTML = "";
allArraysContainer.appendChild(startingArrayContainer);
fillArrContainer(startingArrayContainer, generateArray());
});

sortBtn.addEventListener("click", () => {
sortBtn.style.display = "none";
const numsArr = [];
startingArrayContainer.querySelectorAll("span").forEach((span) =>
numsArr.push(Number(span.innerText))
);
highlightCurrentEls(startingArrayContainer, 0);
if (!isOrdered(numsArr[0], numsArr[1])) swapElements(numsArr, 0);

let firstStep = true;
while (true) {
for (let i = 0; i < 4; i++) {
if (firstStep) {
firstStep = false;
continue;
}
const newDivElement = generateContainer();
allArraysContainer.appendChild(newDivElement);
fillArrContainer(newDivElement, numsArr);
highlightCurrentEls(newDivElement, i);
if (!isOrdered(numsArr[i], numsArr[i + 1])) swapElements(numsArr, i);
}
if (
isOrdered(numsArr[0], numsArr[1]) &&
isOrdered(numsArr[1], numsArr[2]) &&
isOrdered(numsArr[2], numsArr[3]) &&
isOrdered(numsArr[3], numsArr[4])
) {
const newDivElement = generateContainer();
allArraysContainer.appendChild(newDivElement);
fillArrContainer(newDivElement, numsArr);
newDivElement.style.border = "4px solid green";
break;
}
}
});