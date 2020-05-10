//Create a constant variable to store the quote URL of the API
const RANDOM_QUOTE_URL = 'http://api.quotable.io/random';

//Get quote display element from index.html.
const quoteDisplayElement = document.getElementById('quoteDisplay');

//Clear out quote input value.
const quoteInputValue = document.getElementById('quoteInput');

//Timer
const timerElement = document.getElementById('timer');


//Add event listener based on user typed input
quoteInputValue.addEventListener('input', ()=>{
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputValue.value.split('');
    let correct = true;
    arrayQuote.forEach((characterSpan, index) =>{
        const character = arrayValue[index];
        if(character == null){
            characterSpan.classList.remove('correct');
            characterSpan.classsList.remove('incorrect');
            correct = false;
        }
        if(character === characterSpan.innerText){
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
            correct = true;
        }else{
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');
            correct = false;
        }
    })
    if (correct){
        getNextQuote();
    }
    
})

//Create a function that gets the content attribute from the url.
//1. Use Fetch to call upon the URL
//2. The fetch will send a promise, so use 'then' to handle the promise.
//3. Handle by requesting the info in json format.
//4. Then use the data stored in the content varaible.
function getQuote(){
    return fetch(RANDOM_QUOTE_URL)
    .then(res => res.json())
    .then(data => data.content)
}

//Function that asynchronously calls the getQuote function.
//Also replaces 'quoteDisplay' with the quote content from the API.
//Also removes the placeholder text inside the textbox.
//quote.split turns the string into an array.
//Split each character and create a span,thus allowing to use each character.
async function getNextQuote(){
    const quote = await getQuote();
    quoteDisplayElement.innerHTML = '';
    quote.split('').forEach(element => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = element;
        quoteDisplayElement.appendChild(characterSpan);
    });
    quoteInputValue.value = null;
    startTimer();
}

let startTime
function startTimer(){
    timerElement.innerText = 0;
    startTime = new Date();
    setInterval(() =>{
        timer.innerText = getTimerTime();
    }, 1000)
}

function getTimerTime(){
    return Math.floor((new Date() - startTime)/1000);
}

getNextQuote();