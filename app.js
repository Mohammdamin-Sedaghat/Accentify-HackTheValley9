const URL = 'https://teachablemachine.withgoogle.com/models/f_QTuK-Ln/';

let recognizer;
let indianCount = 0;
let americanCount = 0;
let totalPredictions = 0;
let listening = false;

async function createModel() {
    const checkpointURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    recognizer = speechCommands.create(
        'BROWSER_FFT',
        undefined,
        checkpointURL,
        metadataURL
    );

    await recognizer.ensureModelLoaded();
}

async function init() {
    if (!recognizer) {
        await createModel();  // Load the model if not already loaded
    }

    const classLabels = recognizer.wordLabels();
    const labelContainer = document.getElementById('label-container');

    for (let i = 0; i < classLabels.length; i++) {
        labelContainer.appendChild(document.createElement('div'));
    }

    listening = true;
    recognizer.listen(result => {
        if (!listening) return;  // Exit if not listening

        const scores = result.scores;
        for (let i = 0; i < classLabels.length; i++) {
            const classPrediction = classLabels[i] + ': ' + result.scores[i].toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }

        // Assuming Indian accent is in index 0 and American is in index 1 (adjust accordingly)
        if (scores[0] > scores[1]) {
            indianCount++;
        } else {
            americanCount++;
        }
        totalPredictions++;
    }, {
        includeSpectrogram: true,
        probabilityThreshold: 0.75,
        overlapFactor: 0.50
    });

    document.getElementById('result').innerHTML = 'Listening...';
}

function stopRecording() {
    if (recognizer) {
        recognizer.stopListening();
        listening = false;

        const indianPercentage = (indianCount / totalPredictions) * 100;
        const americanPercentage = (americanCount / totalPredictions) * 100;

        const finalAccent = indianPercentage > americanPercentage ? 'Indian' : 'American';
        if (indianPercentage > americanPercentage) {
            document.getElementById('result').innerHTML = `Your accent is ${indianPercentage.toFixed(2)}% Indian (Foreign)`;
        } else {
            document.getElementById('result').innerHTML = `Your accent is ${americanPercentage.toFixed(2)}% American`;
        }
        if (indianPercentage > 30) {
            // Display the message
            document.getElementById('extraMessage').innerHTML = 
                `Based on the sample, your accent is ${indianPercentage.toFixed(2)}% foreign. Let's work on that.`;
            
            // Create a button element
            const button = document.createElement('button');
            button.innerHTML = "Work on Accent";
            button.onclick = function() {
                window.location.href = 'practice.html'; // Replace with the actual page URL
            };
        
            // Add the button to the DOM
            document.getElementById('buttonContainer').appendChild(button);
        } else {
            // Redirect to another page if the accent is not foreign (less than 30%)
            window.location.href = 'end.html'; // Replace with the URL for the non-foreign accent page
        }
        
        // Reset the counters for the next session
        indianCount = 0;
        americanCount = 0;
        totalPredictions = 0;
    }
    
}
// Example JavaScript to set progress and streak
const progressCircle = document.getElementById('progressCircle');
const progressPercentage = document.getElementById('progressPercentage');

// Example progress value (75% completion)
const progressValue = 75;
progressCircle.style.setProperty('--progress', `${progressValue}%`);
progressPercentage.textContent = `${progressValue}%`;

// Example streak value
const streakCount = 3; // This could be fetched from local storage or server
document.querySelector('.streak-container p').innerHTML = 
    `<i class="fa-solid fa-calendar"></i> You’re on a <strong>${streakCount}-day streak!</strong> Keep going!`;
