// javascript window

const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
 
let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos=toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); //모든 toDos가 li의 id와 같지 않을 때
    });
    toDos = cleanToDos
    saveToDos(); 
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1; // id값이 비워져 있으니 1이 될 것이다. 
    delBtn.innerHTML="🙅‍♀️";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj ={
        text: text,
        id:newId
        
    };
    toDos.push(toDoObj); //toDos안에 toDoObj값을 넣는다
    saveToDos(); 
}

function handleSubmit (event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoList.value = "";
}

function loadTodos(){
    const loadedToDos = localStorage.getItem(TODOS_LS)
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }

}

function init() {
    loadTodos();
    toDoForm.addEventListener("submit", handleSubmit)


}

init();