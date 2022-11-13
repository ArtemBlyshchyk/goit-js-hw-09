import Notiflix from "notiflix";


const formEl = document.querySelector('.form');

formEl.addEventListener('submit', startPromise);


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
     
        if (shouldResolve) {
          return resolve({ position, delay });
        } else {
          return reject({ position, delay });
        }
  })
};

function startPromise(e) {
  e.preventDefault()
  const inputForm = e.currentTarget;

  let delayEl = +inputForm['delay'].value;
  const stepEl = +inputForm['step'].value;
  const amountEl = +inputForm['amount'].value;

  let position = 0;
  
    for (let i = 1; i <= amountEl; i += 1) {
      position = i;
      
      const firstDelay = delayEl;
      let delay = delayEl += stepEl;

      createPromise(position, firstDelay, delay)
            
        .then(({ position, delay }) => {
            
          setTimeout(() => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          }, delay);
        })
    
        .catch(({ position, delay }) => {
            
          setTimeout(() => {
            Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          }, delay);
        })
    }
};