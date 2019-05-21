const link = `http://localhost:3000/posts`;



function getTask() {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', `${link}`);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    if (xhr.status != 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      let data = JSON.parse(xhr.responseText);
      let wrapper = document.querySelector('.toDoList')
      wrapper.innerHTML = '';

      for(let i=0; i<data.length; i++){
        let newTask = document.createElement('div');
        let taskWraper = document.createElement('p');
        if(data[i].check == true){
          taskWraper.innerHTML = '<input type="checkbox" checked>' + data[i].id + ") " + data[i].task;
        }else {
          taskWraper.innerHTML = '<input type="checkbox">' + data[i].id + ") " + data[i].task;
        }
        newTask.classList.add('task');
        newTask.appendChild(taskWraper);

        
        
        let delButton = document.createElement('button');
        delButton.setAttribute('type', 'button');
        delButton.onclick = () => delTask(data[i].id);
        delButton.innerHTML = 'X';
        newTask.appendChild(delButton);
        wrapper.appendChild(newTask);
      }
    }
  }
}

function setCheckBox(task, check, id){
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', `http://localhost:3000/posts/${id}`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({task, check, id}));

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status !== 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      console.log(task, check, id)
    }
  }
}
/* ----------------------------------------------------
function getCheckedCheckBoxes() {
  var checkboxes = document.getElementsByClassName('checkbox');
  var checkboxesChecked = []; // можно в массиве их хранить, если нужно использовать 
  for (var index = 0; index < checkboxes.length; index++) {
     if (checkboxes[index].checked) {
        checkboxesChecked.push(checkboxes[index].value); // положим в массив выбранный
        alert(checkboxes[index].value); // делайте что нужно - это для наглядности
     }
  }
  return checkboxesChecked; // для использования в нужном месте
}


// for(var i = 0; i < getInput.length; i++){
//   if (getInput[i].checked) {
//    console.log('Выбран');
//  }
//  else {
//    console.log ('Не выбран');
//  }
// }

// ------------------------------------------------------------------------- */
function delTask(id){
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', `http://localhost:3000/posts/${id}`);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status !== 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      console.log(xhr.responseText);
      getTask();
    }
  }
}

function valid(task){
  if (task) {
    return true
  }
}

function addTask(task){
  if (valid(task)) {
    let check = false;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/posts');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
      task: task,
      check: check
    }));
  }
}

form.onsubmit = function (event) {
  let check = false;
  event.preventDefault();
  addTask(task.value, check.value);
  getTask();
}

getTask();