import { fetchAdvice } from './src/fetchAdvice.js';

const adviceNum = document.querySelector('.advice-number');

const adviceText = document.querySelector('.advice-text');

const getAdviceBtn = document.querySelector('[data-get-advice]');

function displayAdvice(id, advice) {
  adviceNum.innerHTML = `Advice #${id}`;
  adviceText.innerHTML = `"${advice}"`;
}

const getAdvice = async () => {
  const adviceData = await fetchAdvice();
  if (adviceData) {
    const {
      slip: { id, advice },
    } = adviceData;
    displayAdvice(id, advice);
  }
};

window.addEventListener('DOMContentLoaded', getAdvice);

getAdviceBtn.addEventListener('click', getAdvice);
