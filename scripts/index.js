// ========================================
// DOM Selection
// ========================================
const orderForm = document.querySelector('[data-form]');

// ========================================
// Helper Functions
// ========================================

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
    });
}

// let's ajax that bitch
    // call fetch()
    // pass it the url
    // and an object with a method and a body
// ========================================
// Main Event Listeners
// ========================================
orderForm.addEventListener('submit', handleSubmit);

