const firstName = document.querySelector('input[name="firstName"]');
const lastName = document.querySelector('input[name="lastName"]');
const email = document.querySelector('input[name="email"]');
const password = document.querySelector('input[name="password"]');
const btn = document.querySelector('button[type="submit"]');
const inputs = document.querySelectorAll('input');

function checkValidEmail(email){
    const regex = /^\w+@[a-z]+.[a-z]{2,3}$/g;
    return regex.test(email);
}

function checkIsNotEmpty(str){
    return str.length;
}

function removeNextElt(elt){
    elt.nextElementSibling.remove();
    elt.classList.remove('red-border-error')

}
function removePrevElt(elt){
    elt.previousElementSibling.remove();
}

function displayMsgError(elt,msg){
    elt.classList.add('red-border-error');
    // create p to display the error msg
    const msgParag = document.createElement('p');
    msgParag.textContent = msg;
    msgParag.classList.add('error-msg');
    elt.after(msgParag);
    // img to display the error icon
    const errorIcon = document.createElement('img');
    errorIcon.src = './images/icon-error.svg';
    errorIcon.classList.add('error-icon');
    elt.before(errorIcon)

}

function hideErrorMsgs() {
    inputs.forEach(input =>  {
            if(input.nextElementSibling.classList.contains('error-msg')){
                removeNextElt(input);
            }
            if(input.previousElementSibling.classList.contains('error-icon')){
                removePrevElt(input)
            } 
    })

    
}

btn.addEventListener('click', function(e){
    hideErrorMsgs();
    const firstNameVal = firstName.value;
    const lastNameVal = lastName.value;
    const emailVal = email.value;
    const passwordVal = password.value;
    

    if(!checkIsNotEmpty(firstNameVal)){
        displayMsgError(firstName, 'First Name cannot be empty');
    }

    if(!checkIsNotEmpty(lastNameVal)){
        displayMsgError(lastName,'Last Name cannot be empty');
    }
    if(!checkIsNotEmpty(passwordVal)){
        displayMsgError(password, 'Password cannot be empty');
    }

    if(!checkIsNotEmpty(emailVal)){
        displayMsgError(email, 'Email cannot be empty');
    }else if (!checkValidEmail(emailVal)){
        displayMsgError(email, 'Looks like this is not an email')

    }
})

inputs.forEach(input =>  {
    input.addEventListener('keypress', (e)=> {
        if(e.target.nextElementSibling.classList.contains('error-msg')){
            removeNextElt(e.target)
        }
        if(e.target.previousElementSibling.classList.contains('error-icon')){
            removePrevElt(e.target);
        }
    })
})

