const jobList = document.getElementById('title');
const otherTitle = document.getElementById('other-title');
const theme = document.getElementById('design');
const color = document.getElementById('color');
const newTheme = document.createElement('option');
const activity = document.createElement('h2');
const act = document.querySelector('.activities');
const actInput = document.querySelectorAll('.activities input');
let totalCost = 0;
const payment = document.getElementById('payment');
const cc = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const name = document.getElementById('name');
const email = document.getElementById('mail');
const emailLabel = email.previousElementSibling;
const errorMessage = document.createElement('p');
const actError = document.createElement('h2');
const credit = document.getElementById('cc-num');


//gives newTheme element text and value
newTheme.textContent = 'Please select a T-shirt theme.';
newTheme.value = 'newtheme';

//adds newTheme to the color options menu
color.add(newTheme, color[0]);
newTheme.selected = true;

//when other is selected in the job select bar the input bar will display
jobList.addEventListener('change', (e) =>{
  if (e.target.value === "other") {
    otherTitle.style.display = '';
  } else {
    otherTitle.style.display = 'none';
  }
})

const colorDiv = document.getElementById('colors-js-puns');

//displays newTheme when no design is selected when the page is first loaded
const design = () => {
  if (theme.value === 'Select Theme'){
    color[0].style.display = 'block';
    colorDiv.style.display = 'none';
    for(i = 1; i < 7; i += 1){
    color[i].style.display = 'none';
    }
  }
}
design();

//displays color based on theme selected
theme.addEventListener('change', (e) => {
if (e.target.value === 'js puns'){
  for (i = 4; i < 7; i += 1){
    color[i].style.display = 'none';
  }
  for (i = 1; i < 4; i += 1){
    color[i].style.display = 'block';
  }
  color[0].style.display = 'none';
  colorDiv.style.display = '';
} else if (e.target.value === 'heart js'){
  for (i = 1; i < 4; i += 1){
    color[i].style.display = 'none';
  }
  for (i = 4; i < 7; i += 1){
    color[i].style.display = 'block';
  }
  color[0].style.display = 'none';
  colorDiv.style.display = '';
} else {
  color[0].style.display = 'block';
  for(i = 1; i < 7; i += 1){
    color[i].style.display = 'none';
    }
  colorDiv.style.display = 'none';
  }
})

//adds the costTotal to the domain
act.appendChild(activity);

//displays total cost based on activities chosen
act.addEventListener('change', (e) => {
  const target = e.target;
  const targetCost = target.getAttribute('data-cost');
  if (target.checked === true){
    totalCost += Number(targetCost);
  } else if (target.checked === false){
    totalCost -= Number(targetCost);
  }
  if (totalCost > 0){
    activity.textContent = `Total: $${totalCost}`;
    activity.style.display = '';
    actError.style.display = 'none';
  } else if(totalCost === 0) {
    activity.style.display = 'none';
    actError.style.display = '';

  }
})

//activity error element and attributes
act.appendChild(actError);
actError.textContent = 'Please choose at least one activity.';
actError.style.color = 'red';
actError.style.display = 'none';


//disables blocks that have conflicting times if checkboxes are checked
act.addEventListener('change', (e) => {
  const target = e.target;
  const targetDT = target.getAttribute('data-day-and-time');
  for(i = 0; i < actInput.length; i += 1){
    const dateTime = actInput[i].getAttribute('data-day-and-time');
    if(targetDT === dateTime){
      if(target.checked && actInput[i] !== target){
        actInput[i].disabled = true;
      } else if (target.checked === false && actInput[i] !== target ){
        actInput[i].disabled = false;
      }
    }
  }
})

//displays payment method when option is selected
payment.addEventListener('change', (e) => {
  if (e.target.value === 'credit card'){
    cc.style.display = '';
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';
  } else if (e.target.value === 'paypal'){
    cc.style.display = 'none';
    paypal.style.display = '';
    bitcoin.style.display = 'none';

  } else if (e.target.value ==='bitcoin'){
    cc.style.display = 'none';
    paypal.style.display = 'none';
    bitcoin.style.display = '';
  }
})

//validate username
function isValidUsername(username) {
  return /^[a-z\sA-Z]+$/.test(username);
}
//validate email
function isValidEmail(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

//credit card card Number (add conditional 13-16 numbers)
function isValidCredit(credit) {
  return /^(\d{16}|\d{15}|\d{14}|\d{13})$/.test(credit);
}
//zip Code
function isValidZip(zip) {
  return /^\d{5}$/.test(zip);
}
//CVV
function isValidCvv(cvv) {
  return /^\d{3}$/.test(cvv);
}



//email and error message attributes
emailLabel.appendChild(errorMessage);
email.className = 'error';
emailLabel.className = 'email';
errorMessage.textContent = 'Please enter a valid email.';
errorMessage.style.color = 'red';
errorMessage.style.display = 'none';


//Set up events
function validOrInvalid(valid, element) {
  if (valid && element.className === 'error') {
    element.style.borderColor = 'red';
    errorMessage.style.display = '';
  } else if (valid) {
    element.style.borderColor = 'red';
  } else {
    element.style.borderColor = 'rgb(111, 157, 220)';
    errorMessage.style.display = 'none';
  }
}

function createListener(validator) {
  return e => {
    const text = e.target.value;
    const valid = validator(text);
    const showTip = text !== "" && !valid;
    const tooltip = e.target;
    validOrInvalid(showTip, tooltip);
  };
}

//validates the real time input of the targeted elements
name.addEventListener('input', createListener(isValidUsername));
email.addEventListener('input', createListener(isValidEmail));
zip.addEventListener('input', createListener(isValidZip));
cvv.addEventListener('input', createListener(isValidCvv));
credit.addEventListener('input', createListener(isValidCredit));


//submit button
const register = document.querySelector('button');
register.addEventListener('click', (e) => {
  if(!isValidUsername(name.value)) {
    name.style.borderColor = 'red';
    e.preventDefault();
  } else if(!isValidEmail(email.value)) {
    email.style.borderColor = 'red';
    e.preventDefault();
  } else if(totalCost === 0){
    actError.style.display = '';
    e.preventDefault();
  } else if(payment.value === 'credit card') {
      if(!isValidCredit(credit.value)){
        credit.style.borderColor = 'red';
        e.preventDefault();
      } else if (!isValidZip(zip.value)) {
        zip.style.borderColor = 'red';
        e.preventDefault();
      } else if (!isValidCvv(cvv.value)) {
        cvv.style.borderColor = 'red';
        e.preventDefault();
      }
  }
})



//sets focus to the name input when the page is first loaded
document.getElementById("name").focus();

//hides the input bar when the page first loads
otherTitle.style.display = 'none';

//disables select payment method option
payment[0].disabled = true;

//hides payment methods until selected
cc.style.display = 'none';
paypal.style.display = 'none';
bitcoin.style.display = 'none';
