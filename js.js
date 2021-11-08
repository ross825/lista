let title_task = document.getElementById("title-task");
let description_task = document.getElementById("description-task");
let datetime_task = document.getElementById("datetime-task");
let list_container = document.getElementById("list-container");
let save_btn = document.getElementById("save-btn");
let task_detail_dialog = document.getElementById("task-detail-dialog");
let close_dialog = document.getElementById("close-dialog");
let task_time = document.getElementById("task-time");
let tasks = [];

const get_data_localstorage = () => {
  tasks = [];
  if (localStorage.getItem("tasks") != null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
};

const set_data_localstorage = () => {
  if (title_task.value && description_task.value && datetime_task.value) {
    let data = {
      id: tasks.length + 1,
      title: title_task.value,
      description: description_task.value,
      datetime: datetime_task.value,
      complete: false,
    };
    tasks.push(data);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    print_tasks();

    title_task.value = "";
    description_task.value = "";
    datetime_task.value = "";
  } else {
    alert("Complete todos los campos");
  }
};

const print_tasks = () => {
  get_data_localstorage();
  list_container.innerHTML = "";
  tasks.forEach((e) => {
    list_container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="item">
            <div class="right">
              <input class="check" id="check-${e.id}" type="checkbox" ${
        e.complete ? "checked" : ""
      }>
              <p>${e.title}</p>
            </div>
            <div class="left">
              <img id="detail-${
                e.id
              }" class="detail-btn" src="img/eye.svg" alt="" />
              <img id="edit-${
                e.id
              }" class="edit-btn" src="img/edit.svg" alt="" />
              <img id="delete-${
                e.id
              }" class="delete-btn" src="img/delete.svg" alt="" />
            </div>
          </div>
        
        `
    );
  });
};

const change_complete_state = (event) => {
  let res = tasks.find((e) => "check-" + e.id == event.target.id);
  if (res) {
    res.complete = !res.complete;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

const view_data = (id_detail) => {
  let res = tasks.find((e) => "detail-" + e.id == id_detail);
  if (res) {
    let task_detail_container = document.getElementById("task-detail");
    task_detail_container.innerHTML = "";

    task_detail_container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="task-detail__title">${res.title}</div>
        <p class="task-detail__description"> ${res.description}</p>
        <p class="task-detail__datetime">fecha limite : ${res.datetime}</p>
        <div class="task-detail__complete">completo : ${
          res.complete ? "SI" : "NO"
        }</div>
    `
    );
  }
};

const generate_form = (id_edit) => {
  let res = tasks.find((e) => "edit-" + e.id == id_edit);
  if (res) {
    let task_detail_container = document.getElementById("task-detail");
    task_detail_container.innerHTML = "";

    task_detail_container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="edit-form-container">
        <input id="title-task-edit" type="text" placeholder="Título de la tarea" value="${res.title}" />
        <textarea
          id="description-task-edit"
          type="text"
          placeholder="Descripción de la tarea"
        >${res.description}</textarea>
        <input id="datetime-task-edit" type="datetime-local" placeholder="Fecha Limite" value="${res.datetime}"/>
        <button id="save-btn-edit">Guardar</button>
        </div>
      
    `
    );
    let save_btn_edit = document.getElementById("save-btn-edit");
    save_btn_edit.addEventListener("click", () => {
      let title_task_edit = document.getElementById("title-task-edit");
      let description_task_edit = document.getElementById(
        "description-task-edit");
      let datetime_task_edit = document.getElementById("datetime-task-edit");

      
      if (title_task_edit.value && description_task_edit.value && datetime_task_edit.value) {
        let index_res = tasks.findIndex((e) => e.id == res.id);
        tasks[index_res] = {
          id: res.id,
          title: title_task_edit.value,
          description: description_task_edit.value,
          datetime:datetime_task_edit.value,
          complete: res.complete,
        };
        localStorage.setItem("tasks", JSON.stringify(tasks));
        print_tasks();
        task_detail_dialog.close();
      } else {
        alert("Complete todos los campos");
      }
    });
  }
};

const delete_data_by_id = (id) => {
  let res_index = tasks.findIndex((e) => "delete-" + e.id == id);
  tasks.splice(res_index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  print_tasks();
};

save_btn.addEventListener("click", () => {
  set_data_localstorage();
});

list_container.addEventListener("change", (event) => {
  change_complete_state(event);
});
list_container.addEventListener("click", (event) => {
  if (event.target.matches(".detail-btn")) {
    task_detail_dialog.showModal();
    view_data(event.target.id);
  } else if (event.target.matches(".edit-btn")) {
    task_detail_dialog.showModal();
    generate_form(event.target.id);
  } else if (event.target.matches(".delete-btn")) {
    delete_data_by_id(event.target.id);
  }
});
close_dialog.addEventListener("click", () => {
  task_detail_dialog.close();
});
print_tasks();
//Buscador de contenido



//Declarando variables
let bars_search =       document.getElementById("bars-search");
let cover_ctn_search =  document.getElementById("cover-ctn-search");
let inputSearch =       document.getElementById("inputSearch");
let box_search =        document.getElementById("box-search");


//Funcion para mostrar el buscador
function mostrar_buscador(){

    bars_search.style.top = "80px";
    cover_ctn_search.style.display = "block";
    inputSearch.focus();

    if (inputSearch.value === ""){
        box_search.style.display = "none";
    }

}




//Creando filtrado de busqueda

document.getElementById("inputSearch").addEventListener("keyup", buscador_interno);

function buscador_interno(){


    filter = inputSearch.value.toUpperCase();
    li = box_search.getElementsByTagName("li");

    //Recorriendo elementos a filtrar mediante los "li"
    for (i = 0; i < li.length; i++){

        a = li[i].getElementsByTagName("a")[0];
        textValue = a.textContent || a.innerText;

        if(textValue.toUpperCase().indexOf(filter) > -1){

            li[i].style.display = "";
            box_search.style.display = "block";

            if (inputSearch.value === ""){
                box_search.style.display = "none";
            }

        }else{
            li[i].style.display = "none";
        }

    }



}
