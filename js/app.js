// Classes

class Budget{
  constructor(budget) {
    this.budget = Number(budget);
    this.budgetLeft = this.budget;
  }

  // Subtract From Budget
  substractFromBudget(amount){
    return this.budgetLeft -= amount;
  }
}

// Class handling everything HTML
class HTML{
  insertBudget(budget){
    budgetTotal.innerHTML = `${budget}`;
    budgetLeft.innerHTML = `${budget}`;
  }

  // Print messages (Errors or success)
  printMessage(message,className){
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('text-center', 'alert', className);
    messageWrapper.appendChild(document.createTextNode(message));

    // Add to HTML  
    document.querySelector('.primary').insertBefore(messageWrapper, form);

    // Clear error 
    setTimeout(function(){
      document.querySelector('.primary .alert').remove();
      form.reset();
    }, 3000);
  }

  // Add Expenses To List
  addExpenses(name,amount){
    const expenseList = document.querySelector('#expenses ul');

    // Create an LI
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    
    // Create HTML Template
    li.innerHTML = `
      ${name} <span class="badge badge-primary badge-pill">$ ${amount}</span>
    `;

    // Add LI to List
    expenseList.appendChild(li);
  }

  // Balance Budget
  trackBalance(amount){
    const balance = budget.substractFromBudget(amount);
    budgetLeft.innerHTML = `${balance}`;

    if ( (budget.budget / 4) > balance ){
      budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
      budgetLeft.parentElement.parentElement.classList.add('alert-danger');
    } else if ( (budget.budget / 2) > balance ){
      budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
      budgetLeft.parentElement.parentElement.classList.add('alert-warning');
    }
  }
}


// Variables

const form = document.getElementById('add-expense'),
      budgetTotal = document.querySelector('span#total'),
      budgetLeft = document.querySelector('span#left');


let budget, userBudget;

// Instantiate HTML object
const html = new HTML();



// Event Listeners
eventListeners();
function eventListeners(){

  document.addEventListener('DOMContentLoaded', function(){
    userBudget = prompt(" Welcome! What's your budget for this week? ")

    // Validate userBudget
    if (userBudget === null || userBudget === '' || userBudget === '0'){
      window.location.reload();
    } else {
      // Instantiate Budget Class
      budget = new Budget(userBudget);

      // Insert current budget
      html.insertBudget(budget.budget)
    }
  })

  form.addEventListener('submit', function(e){
    // Prevent Default
    e.preventDefault();

    const expenseName = document.getElementById('expense').value;
    const amount = document.getElementById('amount').value;

    if(expenseName === '' || amount === ''){
      html.printMessage('There was an error. All fields are required', 'alert-danger');
    } else{
      // Add Expense To List
      html.addExpenses(expenseName, amount);
      // Balance The Budget (Reduce expenses from available balance)
      html.trackBalance(amount);
      html.printMessage('Added...', 'alert-success');
    }
  })

}