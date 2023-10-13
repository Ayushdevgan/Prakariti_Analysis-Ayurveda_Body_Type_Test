const questions = document.querySelectorAll('.question');
let currentQuestionIndex = 0;

const questionContainer = document.getElementById("question-container");
questionContainer.style.overflow = "hidden";
const nextButton = document.getElementById("next-button");

// Define an object to store dosha scores
const doshaScores = {
    vata: 0,
    pitta: 0,
    kapha: 0
};

nextButton.addEventListener("click", function () {
    // Check if an answer is selected for the current question
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.querySelector('input[name^="q"]:checked');

    if (!selectedAnswer) {
        // Display an alert if no answer is selected
        alert("Please select an answer before proceeding.");
        return;
    }

    // Update dosha scores
    const dosha = selectedAnswer.value;
    doshaScores[dosha]++;

    // Hide the current question
    currentQuestion.style.display = "none";

    // Move to the next question
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        // Display the next question
        questions[currentQuestionIndex].style.display = "block";
    } else {
        // Determine the predominant dosha
        let predominantDosha = "vata";
        if (doshaScores.pitta > doshaScores[predominantDosha]) {
            predominantDosha = "pitta";
        }
        if (doshaScores.kapha > doshaScores[predominantDosha]) {
            predominantDosha = "kapha";
        }

        // Display the result
        questionContainer.innerHTML = `
            <h2>Your Ayurveda Body Type: ${predominantDosha}</h2>
            <p>${getDescriptionForDosha(predominantDosha)}</p>
        `;

        nextButton.style.display = "none"; // Hide the "Next" button
    }
});

// Function to get a description for the Ayurveda body type
function getDescriptionForDosha(dosha) {
    // You can customize descriptions for each dosha here
    if (dosha === "vata") {
        return "You have a predominance of Vata dosha.<br> Vata individuals are <br> typically creative <br> lively <br> adaptable.";
    } else if (dosha === "pitta") {
        return "You have a predominance of Pitta dosha.<br> Pitta individuals are <br> often focused <br> driven <br> strong leadership qualities.";
    } else if (dosha === "kapha") {
        return "You have a predominance of Kapha dosha.<br> Kapha individuals are usually <br> calm <br> nurturing <br> a strong sense of stability.";
    }
}
