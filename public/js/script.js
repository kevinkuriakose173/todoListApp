document.getElementById('addTodoForm').onsubmit = function(event) {
    event.preventDefault();
    const todoInput = document.getElementById('todoInput');
    addTodo(todoInput.value);
    fetchTodos();
    todoInput.value = '';
};

function fetchTodos() {
    fetch('http://localhost:3000/todos')
        .then(response => response.json())
        .then(todos => {
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = ''; // Clear existing todos
            todos.forEach(todo => {
                const li = document.createElement('li');
                li.textContent = todo.text;
                const checkButton = document.createElement('button');
                checkButton.textContent = todo.completed ? "Completed!" : "In the works!";
                checkButton.onclick = function() {
                    toggleTodoCompletion(todo._id, !todo.completed);
                };
                console.log(todo.completed);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = function() { deleteTodo(todo._id); };
                li.appendChild(checkButton);
                li.appendChild(deleteButton);
                todoList.appendChild(li);
            });
        });
}

function addTodo(text) {
    fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
    })
    .then(() => fetchTodos()); // Refresh the list
}

function toggleTodoCompletion(id, completed) {
    fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: completed })
    })
    .then(response => response.json())
    .then(() => {
        fetchTodos(); // Refresh the list to show updated completion status
    });
}


function deleteTodo(id) {
    fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE'
    })
    .then(() => fetchTodos()); // Refresh the list
}

fetchTodos(); // Initial fetch of todos
