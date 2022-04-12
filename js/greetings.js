const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const greeting = document.querySelector('#greeting');

const HIDDEN_CLASSNAME = 'hidden'; // 의미없는 문자열만 포함된 변수는 대문자 사용
const USERNAME_KEY = 'username';

// submit 기능 막고 
function onLoginSubmit(e) {
    e.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
}

function paintGreetings(username) {
    greeting.innerText = `hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

loginForm.addEventListener('submit', onLoginSubmit) // () 만나면 바로 실행 되지만 이벤트에게 위임할땐 () 사용 안함

const savedUserName = localStorage.getItem(USERNAME_KEY);


// localstorage에 저장된 username 이 없다면 loginform 생성
if (savedUserName === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener('submit', onLoginSubmit);
} else {
   paintGreetings(savedUserName);
}











