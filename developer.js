document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get the feedback value
    const feedback = document.getElementById('feedbackInput').value;
    
    // If feedback is not empty, show thank you message
    if (feedback.trim() !== '') {
        document.getElementById('thankYouMessage').classList.remove('hidden');
        
        // Clear the input after submission
        document.getElementById('feedbackInput').value = '';
        
        // Hide the message after a few seconds
        setTimeout(() => {
            document.getElementById('thankYouMessage').classList.add('hidden');
        }, 3000);
    }
});

function sendPushbulletNotification(message) {
  const apiToken = 'o.MfcM7XP7IAmiE55iWBqCUei81d48P6p7';
  const data = {
    type: "note",
    body: message
  };

  fetch("https://api.pushbullet.com/v2/pushes", {
      method: "POST",
      headers: {
        "Access-Token": apiToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to send notification");
      }
    })
    .then(data => console.log("Notification sent successfully:", data))
    .catch(error => console.error("Error:", error));
}

function sendNotification() {
  const message = document.getElementById("feedbackInput").value;

  if (message) {
    sendPushbulletNotification(message);
  } else {
    alert("Error sending feedback.");
  }
}
