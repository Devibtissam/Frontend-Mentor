import { advice } from './utils.js';

const fetchAdvice = async () => {
    const response = await fetch(advice, {cache: 'no-cache'});
    if(response.ok){
      const data = await response.json();
      return data;
    }else{
        alert('HTTP-Error: ' + response.status);
    } 
};

export { fetchAdvice };
