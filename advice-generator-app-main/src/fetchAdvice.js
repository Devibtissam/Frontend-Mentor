import { advice, getRandomId } from './utils.js';

const fetchAdvice = async () => {
  try {
    const response = await fetch(`${advice}/${getRandomId()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export { fetchAdvice };
