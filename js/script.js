const jobList = document.getElementById('title');
const otherTitle = document.getElementById('other-title');
const theme = document.getElementById('design');
const color = document.getElementById('color');
const newTheme = document.createElement('option');
const activity = document.createElement('h2');
const act = document.querySelector('.activities');
const actInput = document.querySelectorAll('.activities input');
let totalCost = 0;

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

//displays newTheme when no design is selected when the page is first loaded
const design = () => {
  if (theme.value === 'Select Theme'){
    color[0].style.display = 'block';
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
} else if (e.target.value === 'heart js'){
  for (i = 1; i < 4; i += 1){
    color[i].style.display = 'none';
  }
  for (i = 4; i < 7; i += 1){
    color[i].style.display = 'block';
  }
  color[0].style.display = 'none';
} else {
  color[0].style.display = 'block';
  for(i = 1; i < 7; i += 1){
    color[i].style.display = 'none';
    }
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
  } else if(totalCost === 0) {
    activity.style.display = 'none';
  }
})

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

//display payment based on the payment options

//display credit card with #credit-card div and hide paypal and bitcoin information

//when paypal is chosen display info, hide cc and Bitcoin

//when bitcoin is chosen display info, hide cc and PayPal










//hides the input bar when the page first loads
otherTitle.style.display = 'none';
//sets focus to the name input when the page is first loaded
document.getElementById("name").focus();
