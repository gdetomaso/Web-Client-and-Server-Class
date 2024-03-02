let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector('#user-answer')
let submitButton = document.querySelector('#submit-answer')
let resultTextElement = document.querySelector('#result')
let playAgainButton = document.querySelector('#play-again')
let countryCode = '';
let randomCountry = '';
// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array country names and two-letter country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files included with script elements as one big file,
// organized in the order of the script tags. So the countriesAndCodes array from countries.js
// is available to this script.

//console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available 
function getRandomCountryInfo() {
    let randomIndex = Math.floor(Math.random() * countriesAndCodes.length);
    randomCountry = countriesAndCodes[randomIndex];
    //console.log(randomCountry); // Logs the random element to the console for testing
    //sets the countryCode to the random country's alpha-2 code
    countryCode = randomCountry["alpha-2"];
    // TODO display the country's name in the randomCountryElement 
    // displays the random country in the randomCountryElement
    let randomCountryElement = document.getElementById('random-country');
    randomCountryElement.innerText = randomCountry.name;
}

// TODO when the page loads, select an element at random from the countriesAndCodes array
window.onload = function() {
    // grabs random from countriesAndCodes in countries.js
    getRandomCountryInfo();
};
// TODO add a click event handler to the submitButton.  When the user clicks the button,
// Assuming submitButton is an element
submitButton.addEventListener('click', function(event) {
    
//  * read the text from the userAnswerElement 
    userAnswer = userAnswerElement.value;
    //let userAnswerElement = document.getElementById('user-answer');
    //let userAnswer = userAnswerElement.value.trim().toLowerCase();
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
    
    console.log(countryCode);
    fetch(`https://api.worldbank.org/v2/country/${countryCode}?format=json`)
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response pooped out!');
            }
            return response.json();
        })
//  * If the API call was successful, extract the capital city from the World Bank API response.
// *Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 
// For example 'Correct! The capital of Germany is Berlin' or 'Wrong - the capital of Germany is not G, it is Berlin'
// Assuming randomCountry is the randomly selected country object with properties 'name' and 'code'
//  * Compare the actual capital city to the user's answer. 
//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein
        .then(data => {
            let capitalCity = data[1][0].capitalCity.toLowerCase();
            let resultMessage = '';

            if (userAnswer === capitalCity) {
                resultMessage = `Correct! The capital of ${randomCountry.name} is ${capitalCity}`;
            } else {
                resultMessage = `Wrong - the capital of ${randomCountry.name} is not ${userAnswer}, it is ${capitalCity}`;
            }

            resultTextElement.innerText = resultMessage;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching data from the World Bank API');
        });

});
// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice. 
playAgainButton.addEventListener('click', function(event) {
    userAnswerElement.value = '';
    resultTextElement.innerText = '';
    getRandomCountryInfo();
});