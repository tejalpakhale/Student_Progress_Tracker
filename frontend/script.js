const form = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const marks = document.getElementById('marks').value;

  await fetch('http://localhost:5000/students/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, marks })
  });

  form.reset();
  loadStudents();
});

async function loadStudents() {
  const res = await fetch('http://localhost:5000/students/all');
  const students = await res.json();
  studentList.innerHTML = '';
  students.forEach(s => {
    const li = document.createElement('li');
    li.textContent = `${s.name} - ${s.marks} marks`;
    studentList.appendChild(li);
  });
}

loadStudents();
