// ========================================
// DOM Selection
// ========================================
const orderForm = document.querySelector('[data-form]');
const body = document.querySelector('body');
const trigger = document.querySelector('[data-trigger]');



// ========================================
// Helper Functions
// ========================================

// When the server sends the response after you submit an order, add some DOM elements to the page, letting the user know that the order was successfully submitted.
function confirmInfo(obj){
    let div = document.createElement('div');
    div.classList.add('info');
    let list = document.createElement('ul');
    let coffee = document.createElement('li');
    coffee.textContent = `Coffee: ${obj.coffee}`;
    let email = document.createElement('li');
    email.textContent = `Email: ${obj.emailAddress}`;
    let flavor = document.createElement('li');
    flavor.textContent = `Flavor: ${obj.flavor}`;
    let size = document.createElement('li');
    size.textContent = `Size: ${obj.size}`;
    let strength = document.createElement('li');
    strength.textContent = `Strength: ${obj.strength}`;

    list.appendChild(coffee);
    list.appendChild(email);
    list.appendChild(flavor);
    list.appendChild(size);
    list.appendChild(strength);
    div.appendChild(list);
    body.appendChild(div);
}

function confirmOrder(){
    let box = document.createElement('div');
    box.classList.add('confirmBox');
    let header = document.createElement('h3');
    header.textContent = 'Order Confirmation:'
    let par = document.createElement('p');
    par.textContent = "Your order was successful."
    box.appendChild(header);
    box.appendChild(par);
    orderForm.appendChild(box);
}

function handleSubmit(event){
    event.preventDefault();
    console.log('Submit successful.');
    // console.log(event.target.elements);
    const url = event.target.action;
    const method = event.target.method;
    const elements = event.target.elements;
    const data = {
        strength: elements.strength.value, 
        coffee: elements.coffee.value, 
        flavor: elements.flavor.value, 
        size: elements.size.value, 
        emailAddress: elements.emailAddress.value
    };

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(confirmInfo);
    confirmOrder();
}

function iterator(obj){
    const arr = Object.values(obj);
    orderForm.classList.add('form-hidden');
    body.classList.add('body-alt');
    for(item of arr){
        confirmInfo(item);
    }
}

function getAllOrders(){
    fetch(`https://dc-coffeerun.herokuapp.com/api/coffeeOrders`)
    .then(r => r.json())
    .then(iterator);
    
}


// ========================================
// Main Event Listeners
// ========================================
orderForm.addEventListener('submit', handleSubmit);

trigger.addEventListener('click', getAllOrders);
