const toDoForm = document.getElementById('todo-form');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.getElementById('todo-list');

const TODOS_KEY = 'todos';

let toDoArray = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDoArray));
}

function deleteTodo(e) {
    const li = e.target.parentElement;
    // 🤔 필터는 true 값만 반환하기 함!! todoarry.fliter = haveItem에 todoArray를 복사해놓고 복사한 haveitme.id 와 클릭한 li의 아이디가 안 같아? 물어보고 ㅇㅇ안같음 = true 나오면 살아남고 /  아니? 얘네 같은데? = false 라서 탈락함
    li.remove();
    // 밑에 코드 테스트 console.log(` dom li.id : ${typeof li.id}, storage id : ${typeof toDoArray[0].id}`)
    toDoArray = toDoArray.filter(haveItme => haveItme.id !== parseInt(li.id));
    // li의 id는 string 왜냐면 우리가 date.now 해서 number로 받았지만 dom에 id를 넣게 되면 string으로 형변환 됨 그래서 todoarray에서 받은 id는 숫자 이기 때문에 li.id의 데이터 타입을 number로 변경
    saveToDos();  // 지우고 다시 저장
}

function paintTodo(newTodo) {
    const li = document.createElement('li');
    li.id = newTodo.id;
    const span = document.createElement('span');
    span.innerText = newTodo.text;
    const button = document.createElement('button');
    button.innerText = '❌';
    button.addEventListener('click', deleteTodo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(e) {
    e.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = '';
    const newTodoObj = {
        text : newTodo,
        id : Date.now()
    }
    toDoArray.push(newTodoObj);
    paintTodo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener('submit', handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

// 저장된 todo 있다면 savetodo를 parsedtodo에 저장해서 뿌려라
if(savedToDos !== null) {
    const parsedTodos = JSON.parse(savedToDos);
    toDoArray = parsedTodos;
    parsedTodos.forEach(paintTodo);
}

