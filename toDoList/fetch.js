const link = `http://localhost:3000/task`;
const content_type = {'Content-Type': 'application/json'}



function setCheckBox(task){
  let value = {
    task: task.task,
    checked: !task.checked
  };
  fetch(`${link}/${task.id}`, {
    method: 'PUT',
    headers:content_type,
    body: JSON.stringify(value)
  })
  .then( () => console.log('checked'));
}

function delTask(id){
  fetch(`${link}/${id}`, {
    method: 'DELETE',
    headers:content_type,
  })
  .then( () => getTask())
}

function valid(task){
  if (task) {
    return true
  };
}

function editTasks(task, input){
	let value = {
		task: input.value,
		checked: task.checked,
		id: task.id
	}

	fetch(`${link}/${task.id}`,{
		method: 'PUT',
		headers: content_type,
		body: JSON.stringify(value)
	})
  .then( () => console.log('change'));
  
  getTask()
}

function addTask(task){
  if (valid(task)) {
    const checked = false;
    const value = {
      task: task.task,
      checked: checked.checked
    };
    
    fetch(`${link}`, {
      method: 'POST',
      headers:content_type,
      body: JSON.stringify({
        task: task,
        checked: checked
      })
    })
    .then( () => getTask())
  }
}

form.onsubmit = function (event) {
  let checked = false;
  event.preventDefault();
  addTask(task.value, checked.value);
  getTask();
}



function getTask() {

  fetch(`${link}`, {
    method: 'GET',
    headers:content_type
  })
  .then(json => json.json())
  .then(data => {

    let wrapper = document.querySelector('.toDoList');
    wrapper.innerHTML = '';

    data.forEach( function(elem) {
      
      let newTask = document.createElement('div');
      newTask.classList.add('task');
      
      let checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.checked = elem.checked;
      checkBox.onclick = setCheckBox.bind(null, elem)
      newTask.appendChild(checkBox);
      
      let taskDescription = document.createElement('p');
      newTask.appendChild(taskDescription);
      taskDescription.innerHTML = elem.task;
      
      let editButton = document.createElement('i');
      editButton.classList.add('fas', 'fa-pencil-alt');
      editButton.onclick = () => {
      	
      	let editTask = document.createElement('input');
      	editTask.value = elem.task;
      	taskDescription.style.display = 'none';
      	editButton.style.display = 'none';
      	delButton.style.display = 'none';
    	
    	newTask.appendChild(editTask);

    	let save = document.createElement('i');
    	save.classList.add('far', 'fa-save');
    	save.onclick = () => editTasks(elem, editTask);
    	newTask.appendChild(save);
      };

      newTask.appendChild(editButton);

      let delButton = document.createElement('i');
      delButton.classList.add('fas', 'fa-trash-alt');
      delButton.onclick = () => delTask(elem.id);
      newTask.appendChild(delButton);
      wrapper.appendChild(newTask);
    });
  });
}

getTask();