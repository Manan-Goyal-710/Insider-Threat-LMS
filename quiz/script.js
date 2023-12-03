//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "What does SOC stand for in the context of cybersecurity?",
        options: ["Security Oversight Center", "Security Operations Center", "System Optimization Center", "Security Observance Center"],
        correct: "Security Operations Center",
    },
    {
        id: "1",
        question: "What is the primary purpose of a Security Operations Center (SOC)?",
        options: ["To develop software applications", "To monitor and respond to security incidents", "To manage network infrastructure", "To provide customer support"],
        correct: "To monitor and respond to security incidents",
    },
    {
        id: "2",
        question: "What term describes the process of monitoring an organization's IT environment for security threats and incidents in real-time?",
        options: [" Incident Reporting", "Threat Analysis", "Intrusion Detection", "Continuous Monitoring"],
        correct: "Continuous Monitoring",
    },
    {
        id: "3",
        question: "Which of the following is NOT a common component of a SOC's infrastructure?",
        options: ["SIEM system", "Firewalls", "Physical access control systems", "Intrusion Detection System (IDS)"],
        correct: "Physical access control systems",
    },
    {
        id: "4",
        question: "What does SIEM stand for in the context of SOC operations?",
        options: ["Security Incident and Event Management", "System Information and Event Monitoring", "Security Incident Evaluation Module", "System Intelligence and Event Management"],
        correct: "Security Incident and Event Management",
    },
    {
        id: "5",
        question: "What is the primary goal of an incident response team within a SOC?",
        options: ["To prevent all security incidents from occurring", "To minimize the impact of security incidents and ensure a swift recovery", "To identify and punish individuals responsible for security incidents", "To conduct regular security awareness training for employees"],
        correct: "To minimize the impact of security incidents and ensure a swift recovery",
    }, {
        id: "6",
        question: "What is the purpose of a security incident ticketing system in a SOC?",
        options: ["To generate revenue for the organization", "To keep track of security incidents and their resolution progress", "To create reports for regulatory compliance", "To block all incoming network traffic"],
        correct: "To keep track of security incidents and their resolution progress",
    },
    {
        id: "7",
        question: "What does the term threat intelligencerefer to in the context of cybersecurity and SOC operations?",
        options: ["Information about potential natural disasters", "Information about the intentions and capabilities of cyber adversaries", "Information about the organization's financial status", "Information about network bandwidth usage"],
        correct: " Information about the intentions and capabilities of cyber adversaries",
    },
    {
        id: "8",
        question: "Which team within a SOC is responsible for proactively identifying vulnerabilities in the organization's systems and applications?",
        options: ["Incident Response Team", "Threat Hunting Team", "Network Security Team", "Security Awareness Team"],
        correct: "Threat Hunting Team",
    },
    {
        id: "9",
        question: "In the context of incident classification, what does false positive mean?",
        options: ["A security incident that was correctly identified and requires immediate action", "A security incident that was incorrectly identified as a threat", "A security incident that occurred due to employee negligence", "A security incident with no significant impact on the organization"],
        correct: "A security incident that was incorrectly identified as a threat",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};