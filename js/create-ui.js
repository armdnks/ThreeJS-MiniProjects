/**
 * ### CREATE UI
 * @desc User interface to select, search, and get the source code project
 *
 * @usage
 *  - Put create-ui.css in head tag
 *  - Put create-ui.js in body tag
 *
 * @example
 *  <head>
 *    <link rel="stylesheet" href="__path to create-ui.css"/>
 *  </head>
 *  <body>
 *    <script src="__path to create-ui.js" type="module"></script>
 *  </body>
 */

import toCapitalize from "../utils/to-capitalize.js";
import projectLinks from "../utils/project-links.js";

let data = [...projectLinks].sort((a, b) => b.id - a.id);

/**
 * ### HEAD TITLE
 */

const title = document.querySelector("title");
title.textContent = toCapitalize(projectLinks.find((project) => project.href === location.href).title);

/**
 * ### SOURCE CODE LINK
 * @desc ...
 */

const SourceCodeLink = document.createElement("a");
SourceCodeLink.href = projectLinks.find((project) => project.href === location.href).sourceCode;
SourceCodeLink.target = "_blank";
SourceCodeLink.className = "source-code-link";
SourceCodeLink.innerHTML = `
  <img src="${location.origin + "/assets/icons/github-logo-black.png"}" alt="github-logo-black" class="source-code-link-img" />
  <svg height="300" width="300" class="source-code-link-svg">
    <polygon points="300,0 0,0 300,300" class="source-code-link-svg-shape" />
  </svg>
`;

document.body.appendChild(SourceCodeLink);

/**
 * ### MAIN CONTAINER
 * @desc Load container on browser
 *
 * @structure
 *  <div class="container">
 *      <!-- navigation button -->
 *      <!-- navigation -->
 *      <!-- source code link -->
 *  </div>
 */

const Container = document.createElement("div");
Container.className = "container";

document.body.appendChild(Container);

/**
 * ### NAVIGATION PARENT ELEMENT
 * @desc hold every navigation element
 *
 * @structure
 *  <div class="navigation">
 *      <!-- navigation container -->
 *  </div>
 */

const Navigation = document.createElement("div");
Navigation.className = "navigation";

Container.appendChild(Navigation);

/**
 * ### NAVIGATION BUTTON
 * @desc open and close navigation
 *
 * @structure
 *  <div class="container">
 *      <button class="navigation-btn">
 *          <!-- icon -->
 *      </button>
 *  </div>
 */

const NavigationBtn = document.createElement("button");
NavigationBtn.className = "navigation-btn";
NavigationBtn.innerHTML = `
  <img src="${location.origin + "/assets/icons/icon-menu.svg"}"/>
`;

NavigationBtn.onclick = function () {
  Navigation.classList.toggle("show");
};

document.body.appendChild(NavigationBtn);

/**
 * ### NAVIGATION CONTAINER
 * @desc contains form and project list
 *
 * @structure
 *  <div class="navigation">
 *      <div class="navigation-container">
 *          <!-- navigation form & link list -->
 *      </div>
 *  </div>
 */

const NavigationContainer = document.createElement("div");
NavigationContainer.className = "navigation-container";
Navigation.appendChild(NavigationContainer);

/**
 * ### NAVIGATION FORM
 * @desc form to search existing project
 *
 * @structure
 *  <div class="navigation-container">
 *    <form class="navigation-form">
 *      <div class="navigation-form-control">
 *        <input type="text" class="navigation-form-input"/>
 *      </div>
 *    </form>
 *  </div>
 */

const NavigationForm = document.createElement("form");
NavigationForm.className = "navigation-form";

NavigationForm.addEventListener("keyup", (e) => searchProject(e));
NavigationForm.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchProject(e);
  }
});

function searchProject(e) {
  const searchString = e.target.value.toLowerCase();
  let filteredProjects = data.filter((project) => {
    return project.title.toLowerCase().includes(searchString);
  });

  if (filteredProjects.length === 0) {
    NavigationList.innerHTML = `
      <h1 class="navigation-item-not-found">
        Sorry, no project matched your search.
      </h1>
    `;
  } else {
    navigationItem(filteredProjects);
  }
}

NavigationForm.innerHTML = `
  <div class="navigation-form-control">
    <img src="${location.origin + "/assets/icons/icon-search.svg"}" class="navigation-form-icon"/>
    <input type="text" class="navigation-form-input"/>
  </div>
`;

NavigationContainer.appendChild(NavigationForm);

/**
 * ### NAVIGATION PROJECT LIST
 * @desc display all project items
 *
 * @structure
 *  <div class="navigation-container">
 *      <form class="navigation-form"></form>
 *      <ul class="navigation-list">
 *          <li class="navigation-item">
 *              <a class="navigation-link">
 *                  <img class="navigation-link-img"/>
 *                  <h3 class="navigation-link-title"></h3>
 *              </a>
 *          </li>
 *          <li class="navigation-item">...</li>
 *          <li class="navigation-item">...</li>
 *      </ul>
 *  </div>
 */

const NavigationList = document.createElement("ul");
NavigationList.className = "navigation-list";

function navigationItem(data) {
  const selectedProject = projectLinks.find((project) => project.href === location.href);

  return (NavigationList.innerHTML = data
    .map((link) => {
      return `
        <li class="navigation-item ${selectedProject.id === link.id ? "selected" : ""}">
            <a href="${link.href}" class="navigation-link">
                <img src="${link.imageSrc}" class="navigation-link-img"/>
                <h3 class="navigation-link-title">${link.title}</h3>
            </a>
        </li>
    `;
    })
    .join(""));
}

window.addEventListener("DOMContentLoaded", () => navigationItem(data));

NavigationContainer.appendChild(NavigationList);
