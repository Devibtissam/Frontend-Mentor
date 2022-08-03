const input = document.getElementById('email');
const submitBtn = document.getElementById('submit');
const msg = document.querySelector('.subs-msg');

function validEmail(email){
    const regex = /^\w+@[a-z]+.[a-z]{2,3}$/g;
    if(email.value !== ''){
        return regex.test(email);
    }
}
function displayMsg(elt,addedClassName,removedClassName){
    elt.classList.remove(removedClassName);
    elt.classList.add(addedClassName);
}

submitBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const inputValue = input.value;
    if(validEmail(inputValue)){
        msg.textContent = 'Thank you for Subscribing to our Newsletter';
        displayMsg(msg,'success-msg','error-msg');
        input.value = '';
       
    }else{
        msg.textContent = 'Please, Provide us a valid Email';
        displayMsg(msg,'error-msg','success-msg');
    }
})