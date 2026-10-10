// Interactive features for the portfolio website
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const dialog = document.getElementById('projectDialog');

document.getElementById('year').textContent = new Date().getFullYear();

// Dark/light mode toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
});

// Responsive mobile navigation
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

// Project detail pop-up
const projectInfo = {
  portfolio: {
    title: 'Personal Portfolio',
    text: 'This project uses HTML to organize content, CSS for responsive styling, and JavaScript for interactive controls such as dark mode, navigation, and the contact form.'
  },
  planner: {
    title: 'Task Planner',
    text: 'A planned future project that could let users add tasks, mark tasks as complete, and filter tasks by status using JavaScript.'
  },
  dashboard: {
    title: 'Study Dashboard',
    text: 'A planned interface for displaying study goals, completed lessons, and progress summaries in a clear dashboard layout.'
  }
};
document.querySelectorAll('.project-details').forEach(button => {
  button.addEventListener('click', () => {
    const info = projectInfo[button.dataset.project];
    document.getElementById('dialogTitle').textContent = info.title;
    document.getElementById('dialogText').textContent = info.text;
    dialog.showModal();
  });
});
function closeDialog() { dialog.close(); }
document.getElementById('dialogClose').addEventListener('click', closeDialog);
document.getElementById('dialogOkay').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => {
  if (event.target === dialog) closeDialog();
});

// Client-side form validation. This demonstration does not send messages to a server.
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

  formFeedback.className = 'form-feedback';
  if (!name || !email || !message) {
    formFeedback.textContent = 'Please fill in all fields before submitting.';
    formFeedback.classList.add('error');
    return;
  }
  if (!emailPattern.test(email)) {
    formFeedback.textContent = 'Please enter a valid email address.';
    formFeedback.classList.add('error');
    return;
  }
  formFeedback.textContent = `Thanks, ${name}! The form was validated successfully (demo only).`;
  formFeedback.classList.add('success');
  contactForm.reset();
});
