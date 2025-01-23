const amount = document.getElementById('amount');
const term = document.getElementById('term');
const interestrate = document.getElementById('interestrate');
const form = document.getElementById('form');
const resultsCalculated = document.querySelector('.results__calculated');
const resultsEmpty = document.querySelector('.results__empty');
const resultElement = document.querySelector('.payment'); // Where you want to display the result (monthly payment)
const totalRepayElement = document.querySelector('.total-repay'); // Where you want to display total repayment

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the values from the form
    const principal = parseFloat(amount.value); // Principal loan amount
    const annualInterestRate = parseFloat(interestrate.value); // Annual interest rate
    const loanTermYears = parseInt(term.value); // Loan term in years

    // Get the checkbox values on form submit (in case they change)
    const repayment = document.getElementById('repayment').checked;
    const interest = document.getElementById('interest').checked;

    // Validate input values
    if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(loanTermYears) || principal <= 0 || annualInterestRate <= 0 || loanTermYears <= 0) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Function to calculate the monthly payment
    function calculateMonthlyPayment(P, annualRate, years) {
        let r = (annualRate / 100) / 12; // Monthly interest rate
        let n = years * 12; // Total number of payments
        let M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1); // Monthly payment formula
        return M;
    }

    // Function to calculate total repayment
    function calculateTotalRepayment(monthlyPayment, years) {
        return monthlyPayment * years * 12; // Total repayment over the loan term (monthlyPayment * number of months)
    }

    // Calculate monthly payment
    const monthlyPayment = calculateMonthlyPayment(principal, annualInterestRate, loanTermYears);

    // Calculate total repayment
    const totalRepayment = calculateTotalRepayment(monthlyPayment, loanTermYears);

    // If the result is a number, show it
    if (!isNaN(monthlyPayment)) {
        // Toggle visibility
        resultsEmpty.classList.add('hidden');
        resultsCalculated.classList.remove('hidden');

        // Display the result (Monthly Payment)
        resultElement.textContent = `£${monthlyPayment.toFixed(2)}`;

        // Display total repayment over the term
        totalRepayElement.textContent = `£${totalRepayment.toFixed(2)}`;
    } else {
        alert("There was an error with the calculation.");
    }
});
