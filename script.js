const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('endgame-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words
const words = [
'sigh',
'tense',
'airplane',
'ball',
'pies',
'juice',
'warlike',
'bad',
'north',
'dependent',
'steer',
'silver',
'highfalutin',
'superficial',
'quince',
'eight',
'feeble',
'admit',
'drag',
'loving'
];

// init word
let randomWord;

// init score
let score = 0;

// init time
let time = 10;

// set difficulty to value in local storage
let difficulty = localStorage.getItem('difficulty')!==null ? localStorage.getItem('difficulty') : 'medium'; 

// set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty')!==null ? localStorage.getItem('difficulty') : 'medium'; 

// Focus on text on start
text.focus();

// Count Time Down
const timeInterval = setInterval(updateTime,1000);

// function to generate random words
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];    
}

// add word to DOM
function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerText = randomWord;
}

addWordToDOM();

// Update score
function updateScore(){
    score++;
    scoreEl.innerText = score;
}

// Update Time
function updateTime(){
    time--;
    timeEl.innerText = time + 's';

    if(time === 0){
        clearInterval(timeInterval);
        // end game
        gameOver();
    }
}

// game over
function gameOver(){
    endgameEl.innerHTML = `
    <h1>Time Ran Out</h1>
    <p>Your final score is ${score}</p>
    <button onclick='location.reload()' >Retry!</button>
    `;
    endgameEl.style.display = 'flex';
}

// Event Listeners
text.addEventListener('input',e=>{
    const insertedText = e.target.value;
    if(insertedText === randomWord){
        addWordToDOM();
        updateScore();
        // clear
        e.target.value = '';

        if(difficulty == 'easy'){
            time+=5;
        }

        else if(difficulty == 'medium'){
            time += 3;
        }

        else{
            time += 2;
        }

        updateTime();
    }
});

// SETTINGS TOGGLE
settingsBtn.addEventListener('click',()=>
    settings.classList.toggle('hide'));

// settings difficulty
    settingsForm.addEventListener('change', e => {
        difficulty = e.target.value;
        localStorage.setItem('difficulty',difficulty)
    });
    
  
