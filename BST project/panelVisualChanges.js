"use strict";

const dropdowns = document.querySelectorAll(".dropdown");

const insertPanel = document.querySelector("#insert-panel");
const traversePanel = document.querySelector("#traverse-panel");

const insertOption = document.querySelector("#insert-option");
const traverseOption = document.querySelector("#traverse-option");
const searchOption = document.querySelector("#search-option");
const removeOption = document.querySelector("#remove-option");


const inorder = document.querySelector("#inorder");
const preorder = document.querySelector("#preorder");
const postorder = document.querySelector("#postorder");
const levelorder = document.querySelector("#levelorder");

const traverseContainer = document.querySelector("#traverse-container");
const inorderContainer = document.querySelector("#inorder-container");

const listChoice = document.querySelectorAll(".dropdown li");
const optionFields = document.querySelectorAll(".option-field");


listChoice.forEach(item => {
  item.addEventListener('click', () => {
    const choice = item.innerHTML;
    localStorage.setItem('menuChoice', state);
  });
});


inorder.addEventListener('click', function () {
  traverseContainer.classList.toggle('hidden');
  inorderContainer.classList.toggle('hidden');
  inorderContainer.classList.toggle('active-traverse');
});


insertOption.addEventListener("click", function () {
  const activePanel = document.querySelector(".active-panel");
  activePanel.classList.remove("active-panel");
  activePanel.classList.add("hidden");
  
  insertPanel.classList.remove("hidden");
  insertPanel.classList.add("active-panel");
});


traverseOption.addEventListener("click", function () {
  const activePanel = document.querySelector(".active-panel");
  activePanel.classList.remove("active-panel");
  activePanel.classList.add("hidden");

  traversePanel.classList.remove("hidden");
  traversePanel.classList.add("active-panel");

  const activeTraverse = document.querySelector(".active-traverse");
  if (activeTraverse) {
    activeTraverse.classList.toggle('active-traverse');
    activeTraverse.classList.toggle('hidden');
    traverseContainer.classList.toggle('hidden');
  }

});


dropdowns.forEach((dropdown) => {
  const select = document.querySelector(".select");
  const caret = document.querySelector(".caret");
  const menu = document.querySelector(".menu");
  const options = document.querySelectorAll(".menu li");
  const selected = document.querySelector(".selected");

  select.addEventListener("click", () => {
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;

      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");

      options.forEach((option) => {
        option.classList.remove("active-menu");
      });
      option.classList.add("active-menu");
    });
  });

  // Close the dropdown menu on Esc key press
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
    }
  });

  // Close the dropdown menu on outside click
  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const checkboxButton = document.querySelector("#checkbox-button");
  const spanPlaceholder = document.querySelector(".inputBox-section span");

  // Check if the checkbox state is stored in localStorage
  const isChecked = localStorage.getItem("checkboxChecked") === "true";

  const menuChoice = localStorage.getItem("menuChoice");
  if (menuChoice)
  {

  }


  // Set the initial state of the checkbox and related elements
  checkboxButton.checked = isChecked;
  if (isChecked) {
    spanPlaceholder.innerHTML = "Insert array or CSV";
  } else {
    spanPlaceholder.innerHTML = "Enter a single value";
  }

  // Event listener for checkbox click
  checkboxButton.addEventListener("click", () => {
    if (checkboxButton.checked) {
      spanPlaceholder.innerHTML = "Insert array or CSV";
    } else {
      spanPlaceholder.innerHTML = "Enter a single value"; // Or whatever placeholder you want
    }
  
    // Store the checkbox state in localStorage
    localStorage.setItem("checkboxChecked", checkboxButton.checked);
 
    // Apply the .squeeze class to trigger the animation
    spanPlaceholder.classList.add("squeeze");
    
  });

  // Detect when the transition ends
  spanPlaceholder.addEventListener("transitionend", () => {
    // Remove the .squeeze class to reset the animation
    spanPlaceholder.classList.remove("squeeze");
  });

});

