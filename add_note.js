document.addEventListener("DOMContentLoaded", function() {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  // Get modal elements
  const successModal = document.getElementById("success-modal");
  const errorModal = document.getElementById("error-modal");
  const closeButtons = document.querySelectorAll(".close-button");

  // Add note
  document.getElementById('add-note').addEventListener('click', function() {
    const topic = document.getElementById('topic').value.trim();
    const task = document.getElementById('task').value.trim();

    if (topic && task) {
      notes.push({ topic: topic, task: task });
      localStorage.setItem("notes", JSON.stringify(notes));
      document.getElementById('topic').value = ''; // Clear input fields
      document.getElementById('task').value = '';
      successModal.style.display = "block"; // Show the success modal
    } else {
      errorModal.style.display = "block"; // Show the error modal
    }
  });

  // Close modals when close buttons are clicked
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      successModal.style.display = "none";
      errorModal.style.display = "none";
    });
  });

  // Close modals when clicking anywhere outside of the modal content
  window.addEventListener('click', function(event) {
    if (event.target === successModal) {
      successModal.style.display = "none";
    } else if (event.target === errorModal) {
      errorModal.style.display = "none";
    }
  });
});