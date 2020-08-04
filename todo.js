
let todo_input = document.querySelector(".todo_input");
let todo_button = document.querySelector(".todo_button");
let todo_ul = document.querySelector(".todo_ul");
let add_message = "add todo to show up here";
const createElement = (elem, text = "") => {
  let element = document.createElement(elem);
  element.innerHTML = text;
  return element;
};
const create_id = () => {
  return Math.floor(Math.random() * Date.now());
};
let list = [
  { text: "learn js ", id: create_id(), complete: true },
  { text: "create js app", id: create_id(), complete: false },
  { text: "check for bugs", id: create_id(), complete: false }
];

const mark_complete = e => {
  let id = e.target.getAttribute("data-id");
  let item = list.find(li => li.id === Number(id));
  item.complete = !item.complete;
  write_todo(list);
};

const removeListener = e => {
  let [tick_button, ,delete_button] = [...e.target.parentNode.children];
  tick_button.removeEventListener("click", mark_complete);
  delete_button.removeEventListener("click", remove_list);
};

const remove_list = e => {
  let button = e.target;
  let id = button.getAttribute("data-id");
  removeListener(e);
  let new_list = list.filter(item => item.id !== Number(id));
  list = [...new_list];
  write_todo(new_list);
};
const addList = () => {
  let val = todo_input.value;
  if (val === "") return;
  let obj = {
    text: val,
    id: create_id(),
    complete: false
  };
  list.push(obj);
  todo_input.focus();
  todo_input.value = "";
  write_todo(list);
};
const is_empty = arr => {
  if (arr.length === 0) {
    let list = createElement("li", add_message);
    todo_ul.append(list);
  }
};
const write_todo = arr => {
  todo_ul.innerHTML = "";
  is_empty(list);
  //creating elements
  arr.forEach(data => {
    let li = createElement("li");
    let p = createElement('p', data.text)
    let tick_button = createElement("button", "✔");
    let delete_button = createElement("button", "❌");
    li.setAttribute("data-id", data.id);
    delete_button.addEventListener("click", remove_list);
    delete_button.setAttribute("data-id", data.id);
    delete_button.classList.add('delete')
    tick_button.setAttribute("data-id", data.id);
    tick_button.addEventListener("click", mark_complete);
    tick_button.classList.add('tick')
    if (data.complete) li.classList.add("list-done");
    li.append(tick_button);
    li.append(p)
    li.append(delete_button);
    todo_ul.append(li);
  });
};
write_todo(list);

todo_button.addEventListener("click", addList);
