const addMessage = document.querySelector('.message');
const addButton = document.querySelector('.add');
const todo = document.querySelector('.todo')

let todoList = [] // пустой массив куда дефолтно заносятся дела

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo')); // загрузка в жсон чтобы дела сохранялись
    displayMessage();
}

addButton.addEventListener('click' , function() { // при нажатии на кнопку добавить создается новый массив с делами
    if (!addMessage.value) return;
    let newTodo = {
        todo : addMessage.value,
        checked : false,
        important : false

    }

    todoList.push(newTodo);  // заносится дело в массив с делами
    displayMessage();  
    localStorage.setItem('todo', JSON.stringify(todoList)) // парсится в жсон
    addMessage.value = '';  // пустое дело нельзя доббавить
});

function displayMessage () {  // перевод дела в хтмл
    let displayMessage = ''  
    if(todoList.length === 0) todo.innerHTML = ''; // если дел нет, то можно удалить первое дело
    todoList.forEach(function(item, i){ 
        displayMessage  += `
        <li>
        <input type="checkbox" id='item_${i}' ${item.checked ? 'checked' : ''}> 
        <label for='item_${i}' class="${item.important ? 'important' : '' }">${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
    });
};

todo.addEventListener('change', function(event) {
   let idInput =  event.target.getAttribute('id');
   let forLabel = todo.querySelector('[for='+ idInput +']');
   let valueLabel = forLabel.innerHTML;
  // console.log('valueLabel: ', valueLabel);

  todoList.forEach(function(item){
      if (item.todo ===valueLabel){
          item.checked = !item.checked;
          localStorage.setItem('todo', JSON.stringify(todoList));
      }
  })
});


todo.addEventListener('contextmenu', function(event){
    event.preventDefault(); // отмена стандартных действий в меню
    todoList.forEach(function(item, i){
        if(item.todo === event.target.innerHTML) {
            if(event.ctrlKey) {
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            
            displayMessage();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
});