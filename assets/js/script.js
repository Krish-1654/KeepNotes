const form = document.querySelector("form");
const title = document.querySelector(".title");
const details = document.querySelector(".details");
const datarow = document.querySelector("#data-row");

let updateId = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    title: title.value,
    details: details.value,
  };

  if (updateId !== null) {
    notes[updateId] = data;
    updateId = null;
  } else {
    notes.push(data);
  }
  localStorage.setItem("note", JSON.stringify(notes));
  show();
  // location.reload();
  form.reset();
});

function show() {
  const notes = JSON.parse(localStorage.getItem("note")) || [];
  let result = "";
  notes.map((text, index) => {
    result += `
                <div class="col-md-3 py-1 bg px-3">
                    <div>
                       <p class="h5 text-end text-secondary mt-2"><span class="px-3 bg py-1 rounded-circle">${
                         index + 1
                       }</span></p>
                        <p>
                     <span class="fw-bold h5 text-secondary">Topic <br></span>
                    ${text.title}</p>
                    <p>
                    <span class="fw-bold h5 text-secondary">Notes <br></span>
                    ${text.details}</p>
                    </div>
                    <div class="text-end">
                    <button class="btn btn-outline-warning border-0 rounded-pill" onclick="edit(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn btn-outline-danger border-0 rounded-pill" onclick="del(${index})"><i class="fa-solid fa-trash-can"></i></button>
                    </div>

            </div>
                `;
    datarow.innerHTML = result;
  });
}

function del(id) {
  const notes = JSON.parse(localStorage.getItem("note")) || [];

  notes.splice(id, 1);

  localStorage.setItem("note", JSON.stringify(notes));
  show();
}

function edit(id) {
  const notes = JSON.parse(localStorage.getItem("note")) || [];
  title.value = notes[id].title;
  details.value = notes[id].details;

  updateId = id;
}

show();


