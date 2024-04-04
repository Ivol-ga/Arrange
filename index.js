"use strict";
(function(){
const sourceItems = document.querySelectorAll(".source__box_item");
const source = document.querySelector(".source__box");
const result = document.querySelector(".result__box");

const btnRight = document.querySelector(".button__box_right");
const btnRightAll = document.querySelector(".button__box_rightAll");
const btnLeft = document.querySelector(".button__box_left");
const btnLeftAll = document.querySelector(".button__box_leftAll");
const btnDelete = document.querySelector(".button__delete");
const select = document.getElementById("sorting-options");
const sortingItemsDropOptions = document.querySelectorAll(
  ".sorting__items-drop"
);
const resetBtn = document.querySelector(".button__reset");
const addNew = document.querySelector(".button__new");
const inputSearch = document.querySelector(".search");


let initialItems = [];
sourceItems.forEach((item) => {
  initialItems.push(item.innerText);
  localStorage.setItem("items", JSON.stringify(initialItems));
});

function saveToStorage(item) {
  const savedSource = JSON.parse(localStorage.getItem("items")) || [];
  localStorage.setItem("items", JSON.stringify([...savedSource, item]));
}
function deleteToStorage(item) {
  const items = JSON.parse(localStorage.getItem("items"));
  localStorage.setItem(
    "items",
    JSON.stringify(items.filter((elem) => elem !== item))
  );
}
function handleClickMove(event) {
  if (event.target.classList.contains("source__box_item")) {
    event.target.classList.toggle("active");
  }
}

function handleBtnMove() {
  document.querySelectorAll(".source__box_item").forEach((item) => {
    if (item.classList.contains("active")) {
      result.appendChild(item);
      item.classList.remove("active");
    }
  });
}
function handleBtnMoveBack() {
  document.querySelectorAll(".source__box_item").forEach((item) => {
    if (item.classList.contains("active")) {
      source.appendChild(item);
      item.classList.remove("active");
    }
  });
}
function handleBtnMoveAll() {
  document.querySelectorAll(".source__box_item").forEach((item) => {
    result.appendChild(item);
  });
}
function handleBtnMoveAllBack() {
  document.querySelectorAll(".source__box_item").forEach((item) => {
    source.appendChild(item);
  });
}

for (let option of sortingItemsDropOptions) {
  option.onclick = function () {
    sorting(this.dataset.filter);
  };
}
function sorting(dropOption) {
    const updatedSource = document.querySelectorAll(".source__box_item")
  for (let item of updatedSource) {
    if (!item.classList.contains(dropOption)) {
      item.style.display = "none";
    } else {
      item.style.display = "block";
    }
  }
}

function handleAddNew() {
  const newSource = this.previousElementSibling.value.trim();
  if (newSource) {
    createRandomSource(newSource);
    this.previousElementSibling.value = "";
  } else {
    alert("Input field is empty");
  }
}
function createRandomSource(text) {
  const classList = ["language", "framework", "style", "builder"];
  let randomIndex = Math.floor(Math.random() * classList.length);
  let randomClass = classList[randomIndex];
  const div = document.createElement("div");
  div.innerText = text;
  div.className = "source__box_item";
  div.classList.add("all");
  div.classList.add("random");
  div.classList.add(randomClass);
  saveToStorage(div.innerText);
  source.append(div);
}
function search(event) {
  const searchText = event.target.value.trim().toLowerCase();
  if (searchText !== "") {
    document.querySelectorAll(".source__box_item").forEach((item) => {
      if (item.innerText.toLowerCase().search(searchText) == -1) {
        item.classList.add("hide");
      } else {
        item.classList.remove("hide");
      }
    });
  } else {
    sourceItems.forEach((item) => {
      item.classList.remove("hide");
    });
  }
}

function initialSources() {
  let res = JSON.parse(localStorage.getItem("items"));
  const updatedSource = document.querySelectorAll(".source__box_item")
  for (let i = 1; i <= res.length; i++) {
    localStorage.setItem(
      "items",
      JSON.stringify(initialItems.filter((elem) => elem !== initialItems[i]))
    );
  }
  updatedSource.forEach((item) => {
    if (!item.classList.contains("random")) {
      source.appendChild(item);
    } else {
      item.classList.add("hide");
    }
  });


}

function handleClickDeleteItem() {
  document.querySelectorAll(".source__box_item").forEach((item) => {
    if (item.classList.contains("active")) {
      item.classList.add("hide");
      const storageItem = JSON.parse(localStorage.getItem("items"));
      localStorage.setItem(
        "items",
        JSON.stringify(storageItem.filter((elem) => elem !== item.innerText))
      );
    }
  });
}

source.addEventListener("click", handleClickMove);
result.addEventListener("click", handleClickMove);

btnRight.addEventListener("click", handleBtnMove);
btnLeft.addEventListener("click", handleBtnMoveBack);
btnRightAll.addEventListener("click", handleBtnMoveAll);
btnLeftAll.addEventListener("click", handleBtnMoveAllBack);
btnDelete.addEventListener("click", handleClickDeleteItem);
select.addEventListener("change", () => {
  sorting(select.value);
});
resetBtn.addEventListener("click", initialSources);
addNew.addEventListener("click", handleAddNew);
inputSearch.addEventListener("input", search);
})()