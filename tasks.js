document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('new-task');
  const taskList = document.getElementById('task-list');
  const addTaskBtn = document.getElementById('add-task-btn');
  const reminderModal = document.getElementById('reminder-modal');
  const reminderInput = document.getElementById('reminder-input');
  const reminderConfirm = document.getElementById('reminder-confirm-btn');
  const reminderCancel = document.getElementById('reminder-cancel-btn');
  const reminderConfirmationModal = document.getElementById('reminder-confirmation-modal');
  const reminderConfirmationText = document.getElementById('reminder-confirmation-text');
  const reminderConfirmationCloseBtn = document.getElementById('reminder-confirmation-close-btn');
  const popup = document.getElementById('popup');
  const popupText = document.getElementById('popup-text');
  const popupClose = document.getElementById('popup-close-btn');
  const errorModal = document.getElementById('error-modal');
  const errorCloseBtn = document.getElementById('error-close-btn');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let activeTaskIndex = null;

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = task.completed ? 'task-card completed' : 'task-card';
      li.innerHTML = `
        <div class="task">
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
          <span>${task.name}</span>
        </div>
        <div class="actions">
          <button class="set-reminder">Set Reminder</button>
          <button class="delete-task">Delete</button>
        </div>
      `;
      li.querySelector('input[type="checkbox"]').addEventListener('click', () => toggleCompleteTask(index));
      li.querySelector('.delete-task').addEventListener('click', () => deleteTask(index));
      li.querySelector('.set-reminder').addEventListener('click', () => openReminderModal(index));
      taskList.appendChild(li);
    });
  }

  function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName) {
      tasks.push({ name: taskName, completed: false, reminderTime: null });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
      taskInput.value = '';
    }
  }

  function toggleCompleteTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }

  function openReminderModal(index) {
    activeTaskIndex = index;
    reminderModal.classList.remove('hidden');
  }

  reminderConfirm.addEventListener('click', function () {
    const reminderTime = reminderInput.value.trim();
    const reminderMs = parseInt(reminderTime) * 60000;

    if (isNaN(reminderMs) || reminderMs <= 0) {
      reminderModal.classList.add('hidden');
      errorModal.classList.remove('hidden'); // Show error modal
      return;
    }

    tasks[activeTaskIndex].reminderTime = Date.now() + reminderMs;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Show confirmation message
    reminderConfirmationText.textContent = `Reminder set for task: ${tasks[activeTaskIndex].name} in ${reminderTime} minutes.`;
    reminderModal.classList.add('hidden');
    reminderConfirmationModal.classList.remove('hidden');

    reminderInput.value = '';

    setTimeout(() => {
      popupText.textContent = `Reminder: It's time to complete your task: ${tasks[activeTaskIndex].name}`;
      popup.classList.remove('hidden');
    }, reminderMs);
  });

  errorCloseBtn.addEventListener('click', function () {
    errorModal.classList.add('hidden');
  });

  reminderCancel.addEventListener('click', function () {
    reminderModal.classList.add('hidden');
    reminderInput.value = '';
  });

  reminderConfirmationCloseBtn.addEventListener('click', function () {
    reminderConfirmationModal.classList.add('hidden');
  });

  popupClose.addEventListener('click', function () {
    popup.classList.add('hidden');
  });

  addTaskBtn.addEventListener('click', () => {
    taskInput.focus();
    addTask();
  });

  renderTasks();
});