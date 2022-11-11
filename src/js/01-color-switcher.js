const startBTN = document.querySelector('button[data-start]');
console.log(startBTN);
const stopBTN = document.querySelector('button[data-stop]');
console.log(stopBTN);
const bodyRef = document.querySelector('body');
console.log(bodyRef);

startBTN.addEventListener('click', onStartBtnClick);
stopBTN.addEventListener('click', onStopBtnClick);

let interval = null;

function onStartBtnClick () {
    startBTN.disabled = true;
    stopBTN.disabled = false;

    interval = setInterval(() => {
        const bkgColor = getRandomHexColor();
        bodyRef.style.background = bkgColor;
    }, 1000);
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  function onStopBtnClick () {
    startBTN.disabled = false;
    stopBTN.disabled = true;
    clearInterval(interval);
  }