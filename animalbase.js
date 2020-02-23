"use strict";
window.addEventListener("DOMContentLoaded", start);
let allAnimals = [];
// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0
};
function start() {
  // TODO: Add event-listeners to filter and sort buttons
  loadJSON();
}
async function loadJSON(value, direction, doSort) {
  const response = await fetch("animals.json");
  const jsonData = await response.json();
  // when loaded, prepare data objects
  prepareObjects(jsonData, value, direction, doSort);
}
function prepareObjects(jsonData, value, direction, doSort) {
  allAnimals = jsonData.map(preapareObject);
  // TODO: This might not be the function we want to call first
  sortFunction(allAnimals, value, direction, doSort);
}
function preapareObject(jsonObject) {
  const animal = Object.create(Animal);
  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;
  return animal;
}
function sortFunction(list, value, direction, doSort) {
  if (doSort == "sort" && direction == "asc") {
    displayList(list.sort(compare));
  }
  if (doSort == "sort" && direction == "desc") {
    displayList(list.reverse(compare));
  } else {
    displayList(list);
  }
  function compare(a, b) {
    const sortBy = value;
    const ValueA = a[sortBy];
    const ValueB = b[sortBy];
    let comparison = 0;
    if (ValueA > ValueB) {
      comparison = 1;
    } else if (ValueA < ValueB) {
      comparison = -1;
    }
    return comparison;
  }
}
function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";
  // build a new list
  animals.forEach(displayAnimal);
}
function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);
  // set clone data
  clone.querySelector("tr").setAttribute("data-field", animal.type);
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;
  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
const mainFunction = function() {
  const listtr = document.querySelectorAll("tr");
  const filterOrSort = this.dataset.action;
  if (filterOrSort == "filter") {
    const value = this.dataset.filter;
    filterFunction(value, listtr);
  }
  if (filterOrSort == "sort") {
    const value = this.dataset.sort;
    const direction = this.dataset.sort_direction;
    const doSort = "sort";
    loadJSON(value, direction, doSort);
    if (document.querySelector(".active")) {
      document.querySelector(".active").classList.remove("active");
    }
    this.classList.add("active");
    if (direction == "asc") {
      this.setAttribute("data-sort_direction", "desc");
    }
    if (direction == "desc") {
      this.setAttribute("data-sort_direction", "asc");
    }
  }
};
const Click = document.querySelectorAll(["[data-action]"]);
Click.forEach(e => {
  e.addEventListener("click", (e = mainFunction));
});
function filterFunction(value, listtr) {
  listtr.forEach(e => {
    e.classList.remove("displaynone");
    if (value != e.dataset.field) {
      e.classList.add("displaynone");
      document.getElementById("sorting").classList.remove("displaynone");
    }
    if (value == "*") {
      e.classList.remove("displaynone");
    }
  });
}
