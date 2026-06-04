/* script.js */

// Helper utility: Converts the player's text guess into a standard SHA-256 string hash
async function sha256(string) {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(bytes => bytes.toString(16).padStart(2, '0')).join('');
}

// Master execution engine loop for processing dynamic flag string validation
async function unlockStage(stageNumber) {
    // Locate target elements dynamically using the numeric block parameters
    const container = document.getElementById("question" + stageNumber);
    const userInput = container.querySelector('input[type="text"]').value.trim();
    const display = container.querySelector('.output-box');
    
    // Retrieve the pre-computed secure hash asset from the HTML property
    const correctHash = container.getAttribute("data-hash");

    if (!userInput) {
        display.className = "output-box";
        display.innerText = "Error: Input text box cannot be blank.";
        return;
    }

    // Convert player response into hash representation format string
    const userHash = await sha256(userInput);

    // Validate string equivalents securely inside browser execution space
    if (userHash === correctHash) {
        display.className = "output-box success";
        display.innerText = "Flag captured! Stage cleared successfully.";
    } else {
        display.className = "output-box";
        display.innerText = "Invalid flag key. Please try again.";
    }
}

