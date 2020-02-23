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
  if (doSort == "sort") {
    displayList(list.sort(compare));
    function compare(a, b) {
      const dir = direction;
      if (value == "name") {
        const ValueA = a.name.toUpperCase();
        const ValueB = b.name.toUpperCase();
        let comparison = 0;
        if (ValueA > ValueB) {
          comparison = 1;
        } else if (ValueA < ValueB) {
          comparison = -1;
        }
        return comparison;
      }
      if (value == "type") {
        const ValueA = a.type.toUpperCase();
        const ValueB = b.type.toUpperCase();
        let comparison = 0;
        if (ValueA > ValueB) {
          comparison = 1;
        } else if (ValueA < ValueB) {
          comparison = -1;
        }
        return comparison;
      }
      if (value == "desc") {
        const ValueA = a.desc.toUpperCase();
        const ValueB = b.desc.toUpperCase();
        let comparison = 0;
        if (ValueA > ValueB) {
          comparison = 1;
        } else if (ValueA < ValueB) {
          comparison = -1;
        }
        return comparison;
      }
      if (value == "age") {
        const ValueA = a.desc;
        const ValueB = b.desc;
        let comparison = 0;
        if (ValueA > ValueB) {
          comparison = 1;
        } else if (ValueA < ValueB) {
          comparison = -1;
        }
        return comparison;
      }
    }
  } else {
    displayList(list);
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
// This is the main function that will decide what happens based on the dataset attributes.
const mainFunction = function() {
  const list = document.querySelectorAll("tr");
  const filterOrSort = this.dataset.action;
  if (filterOrSort == "filter") {
    const value = this.dataset.filter;
    filterFunction(value, list);
  }
  if (filterOrSort == "sort") {
    const value = this.dataset.sort;
    const direction = this.dataset.sort_direction;
    const doSort = "sort";
    loadJSON(value, direction, doSort);
  }
};
const Click = document.querySelectorAll(["[data-action]"]);
Click.forEach(e => {
  e.addEventListener("click", (e = mainFunction));
});

function filterFunction(value) {
  list.forEach(e => {
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
