const input = document.getElementById('todo-input');
		const addButton = document.getElementById('add-button');
		const todoList = document.getElementById('todo-list');
		
		// Get the todo list from localStorage (if it exists)
		let todos = JSON.parse(localStorage.getItem('todos')) || [];
		
		// Render the todo list
		renderTodoList();
		
		// Add event listeners
		addButton.addEventListener('click', addTodo);
		todoList.addEventListener('click', handleTodoClick);
		
		function addTodo() {
			const newTodo = input.value.trim();
			if (newTodo) {
				todos.unshift(newTodo);
				localStorage.setItem('todos', JSON.stringify(todos));
				input.value = '';
				renderTodoList();
			}
		}
		
		function removeTodoAtIndex(index) {
			todos.splice(index, 1);
			localStorage.setItem('todos', JSON.stringify(todos));
			renderTodoList();
		}
		
		function handleTodoClick(event) {
			if (event.target.tagName === 'BUTTON') {
				const index = parseInt(event.target.dataset.index);
				removeTodoAtIndex(index);
			}
		}
		
		function renderTodoList() {
			todoList.innerHTML = '';
			todos.forEach((todo, index) => {
				const li = document.createElement('li');
				li.innerHTML = `<span>${todo}</span><button data-index="${index}">Remove</button>`;
				todoList.appendChild(li);
			});
		}