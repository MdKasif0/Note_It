document.addEventListener("DOMContentLoaded", function() {
  const notesList = document.getElementById('notes-list');
  const confirmationBanner = document.getElementById('confirmation-banner');
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  
  let startX, endX;

  // Display the notes in the list
  function displayNotes() {
    notesList.innerHTML = '';
    if (notes.length > 0) {
      notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${note.topic}</strong> <br> ${note.task}`;
        li.classList.add('note-item');

        // Swipe event listeners
        li.addEventListener('touchstart', handleTouchStart);
        li.addEventListener('touchend', (e) => handleTouchEnd(e, index, li));
        li.addEventListener('mousedown', handleMouseDown);
        li.addEventListener('mouseup', (e) => handleMouseUp(e, index, li));

        notesList.appendChild(li);
      });
    } else {
      notesList.innerHTML = '<li>No notes available</li>';
    }
  }

  // Handle mouse down for swipe detection
  function handleMouseDown(e) {
    startX = e.clientX;
  }

  // Handle mouse up to detect swipe and delete note
  function handleMouseUp(e, index, li) {
    endX = e.clientX;
    if (startX > endX + 100) {
      deleteNoteWithAnimation(index, li, 'left');
    }
  }

  // Handle touch start for swipe detection
  function handleTouchStart(e) {
    startX = e.touches[0].clientX;
  }

  // Handle touch end to detect swipe and delete note
  function handleTouchEnd(e, index, li) {
    endX = e.changedTouches[0].clientX;
    if (startX > endX + 100) {
      deleteNoteWithAnimation(index, li, 'left');
    }
  }

  // Delete the note with sliding animation
  function deleteNoteWithAnimation(index, li, direction) {
    li.classList.add(`slide-out-${direction}`);
    setTimeout(() => {
      deleteNote(index);
    }, 500); // Wait for animation to finish
  }

  // Delete note from the list and localStorage
  function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
    showConfirmationBanner();
  }

  // Show a confirmation banner after deletion
  function showConfirmationBanner() {
    confirmationBanner.classList.remove('banner-hide');
    setTimeout(() => {
      confirmationBanner.classList.add('banner-hide');
    }, 2000); // Hide the banner after 2 seconds
  }

  // Display notes when the page loads
  displayNotes();
});