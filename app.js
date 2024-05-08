// const textInput = document.getElementById('text-input');
// const speakButton = document.getElementById('speak-button');

// speakButton.addEventListener('click', () => {
//     const text = textInput.value;
//     const utterance = new SpeechSynthesisUtterance(text);
//     speechSynthesis.speak(utterance);
// });
const textInput = document.getElementById('text-input');
const speakButton = document.getElementById('speak-button');
const voiceSelect = document.getElementById('voice-select');

// Wait for the voices to be loaded before creating the voice options
window.speechSynthesis.onvoiceschanged = () => {
    // Get the list of available voices
    const voices = speechSynthesis.getVoices();

    // Create a select element with the available voices
    const voiceSelectOptions = voices.map((voice, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = voice.name;
        return option;
    });

    // Clear any existing options and append the new ones
    voiceSelect.innerHTML = '';
    voiceSelect.append(...voiceSelectOptions);

    // Set the default voice to the first one in the list
    voiceSelect.value = 0;
};

// Update the voice when the user selects a new one
voiceSelect.addEventListener('change', () => {
    const selectedVoice = speechSynthesis.getVoices()[voiceSelect.value];
    speechSynthesis.cancel(); // Cancel any ongoing speech
    speechSynthesis.resume(); // Resume if paused
    speechSynthesis.pause(); // Pause if speaking
    speechSynthesis.cancel(); // Cancel again to ensure the new voice is set
    speechSynthesis.voice = selectedVoice;
});

speakButton.addEventListener('click', toSpeech);

function toSpeech() {
    const text = textInput.value;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis.getVoices()[voiceSelect.value];
    speechSynthesis.speak(utterance);
}



