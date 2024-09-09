const quizData =[ 
    {
        question:"Who developed C++ Language?",
        options:["Dennis Ritchie","Bill Gates","Ken Thompson","Bjarne Stroustrup"],
        correctAnswer:"Bjarne Stroustrup"
    },
    {
        question:"which of the following is a valid keyword in Python?",
        options:["int","void","def","static"],
        correctAnswer:"def"
    }
];
const timerDuration=60;

let currentQuestionIndex=0;
let score=0;
let correctAnswers=0;
let incorrectAnswers=0;
let timeInterval;

document.addEventListener('DOMContentLoaded',startQuiz)

function startQuiz(){
    showQuestion();
    startTimer();
}
function showQuestion()
{
    const questionElement=document.getElementById('question');
    const optionsContainer=document.getElementById('options-container');
    const currentQuestion=quizData[currentQuestionIndex];
    questionElement.textContent=currentQuestion.question;

    optionsContainer.innerHTML="";
    currentQuestion.options.forEach((option,index)=>{
        const optionButton=document.createElement('button');
        optionButton.textContent=option;
        optionButton.addEventListener('click',()=>checkAnswer(option));
        optionsContainer.appendChild(optionButton);
    } );
}
function checkAnswer(selectedOption){
    const currentQuestion=quizData[currentQuestionIndex];

    if(selectedOption=== currentQuestion.correctAnswer){
        score+=10;
        correctAnswers++;
    }
    else{
        incorrectAnswers++;
    }
    nextQuestion();
}
function nextQuestion(){
    currentQuestionIndex++;

    if(currentQuestionIndex<quizData.length){
        showQuestion();
    }
    else{
        endQuiz();
    }
}
function startTimer(){
    let secondsRemaining=timerDuration;

    function updateTimerDisplay(){
        const timerElement=document.getElementById('timer');
        const minutes=Math.floor(secondsRemaining/60);
        const seconds=secondsRemaining%60;
        timerElement.textContent=`${minutes}:${seconds<10?'0':''}${seconds}`;
    }
    timerInterval=setInterval(()=>{
        if(secondsRemaining>0){
            secondsRemaining--;
            updateTimerDisplay();
        }
        else{
            endQuiz();
        }
    },1000);
}
function endQuiz(){
    clearInterval(timerInterval);
    const quizContainer = document.getElementById('quiz-container');
    const resultsContainer=document.getElementById('results-container');
    const scoreElement = document.getElementById('score');
    const correctAnswersElement = document.getElementById('correct-answers');
    const incorrectAnswersElement = document.getElementById('incorrect-answers');

    quizContainer.style.display='none';
    resultsContainer.style.display = 'block';

    scoreElement.textContent=`Your Score: ${score}`;
    correctAnswersElement.textContent=`Correct Answers: ${correctAnswers}`;
    incorrectAnswersElement.textContent=`Incorrect Answers: ${incorrectAnswers}`;
}