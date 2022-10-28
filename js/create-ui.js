/**
 * ### CREATE UI
 * @desc User interface to select, search, and get the source code project
 *
 * @usage
 *  - Load create-ui.css in head tag
 *  - Load create-ui.js in body tag
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

class CreateUI {
  constructor() {
    /**
     * ### SINGLETON PATTERN
     * @desc The Singleton Pattern limits the number of instances of a particular object to just one.
     * @url https://www.dofactory.com/javascript/design-patterns/singleton
     */

    if (CreateUI.instance instanceof CreateUI) return CreateUI.instance;
    CreateUI.instance = this;

    /**
     * ### ARRAY OF PROJECTS
     * @desc ...
     */

    this.projects = [...projectLinks].sort((a, b) => b.id - a.id);

    /**
     * ### CONTAINER
     * @desc Entry point to load user interface components
     *
     * @structure
     *  <div class="container">
     *      <!-- navigation button -->
     *      <!-- navigation -->
     *      <!-- source code link -->
     *  </div>
     */

    this.container = document.createElement("div");
    this.container.className = "container";
    document.body.appendChild(this.container);

    /**
     * ### INVOKE FUNCTIONS
     * @desc ...
     */

    this.navigation = this.Navigation();
    this.navigationContainer = this.NavigationContainer();
    this.navigationForm = this.NavigationForm();
    this.navigationProjectList = this.NavigationProjectList();

    this.arrayFunctions = [this.HeadTitle(), this.SourceCodeLink(), this.NavigationBtn(), this.navigationProjectItem(this.projects)];
    this.combineFunctions(this.arrayFunctions);
  }

  /**
   * ### COMBINE FUNCTIONS
   * @type Function
   * @desc Combine all functions
   */

  combineFunctions(functions = []) {
    return functions.reduceRight((a, c) => a + c, []);
  }

  /**
   * ### HEAD TITLE
   * @type Component
   * @desc Rename browser tabbar title
   */

  HeadTitle() {
    const title = document.querySelector("title");
    const existingProject = this.projects.find((project) => project.href === location.href);
    return (title.textContent = toCapitalize(existingProject ? existingProject.title : title.textContent));
  }

  /**
   * ### SOURCE CODE LINK
   * @type Component
   * @desc Create source code link
   */

  SourceCodeLink() {
    const SourceCodeLink = document.createElement("a");
    const existingProject = projectLinks.find((project) => project.href === location.href);

    SourceCodeLink.href = existingProject ? existingProject.sourceCode : "#";
    SourceCodeLink.target = existingProject ? "_blank" : null;
    SourceCodeLink.className = "source-code-link";
    SourceCodeLink.innerHTML = `
      <img src="${location.origin + "/assets/icons/github-logo-black.png"}" alt="github-logo-black" class="source-code-link-img" />
      <svg height="300" width="300" class="source-code-link-svg">
        <polygon points="300,0 0,0 300,300" class="source-code-link-svg-shape" />
      </svg>
    `;

    return this.container.appendChild(SourceCodeLink);
  }

  /**
   * ### NAVIGATION
   * @type Component
   * @desc Navigation parent element
   *
   * @structure
   *  <div class="navigation">
   *      <!-- navigation container -->
   *  </div>
   */

  Navigation() {
    const navigation = document.createElement("div");
    navigation.className = "navigation";

    return this.container.appendChild(navigation);
  }

  /**
   * ### NAVIGATION BUTTON
   * @type Component
   * @desc open and close navigation
   *
   * @structure
   *  <div class="container">
   *      <button class="navigation-btn">
   *          <!-- icon -->
   *      </button>
   *  </div>
   */

  NavigationBtn() {
    const navigationBtn = document.createElement("button");
    navigationBtn.className = "navigation-btn";
    navigationBtn.innerHTML = `
       <img src="${location.origin + "/assets/icons/icon-menu.svg"}"/>
     `;

    navigationBtn.addEventListener("click", () => this.showNavigation(this.navigation));

    return document.body.appendChild(navigationBtn);
  }

  /**
   * ### SHOW NAVIGATION
   * @type Function
   * @desc Show or hide navigation functionality
   * @note invoke in Navigation Button
   */

  showNavigation(element) {
    element.classList.toggle("show");

    if (element.classList.contains("show")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

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

  NavigationContainer() {
    const navigationContainer = document.createElement("div");
    navigationContainer.className = "navigation-container";

    return this.navigation.appendChild(navigationContainer);
  }

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

  NavigationForm() {
    const navigationForm = document.createElement("div");
    navigationForm.className = "navigation-form";

    navigationForm.innerHTML = `
       <div class="navigation-form-control">
         <img src="${location.origin + "/assets/icons/icon-search.svg"}" class="navigation-form-icon"/>
         <input type="text" class="navigation-form-input search-field"/>
         <button type="button" class="navigation-form-clear-btn">
           <img src="${location.origin + "/assets/icons/icon-times.svg"}" class="navigation-form-clear-btn-icon clear-search"/>
         </button>
       </div>
     `;

    navigationForm.addEventListener("keyup", (e) => this.searchProject(e));
    navigationForm.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.searchProject(e);
      }
    });

    navigationForm.addEventListener("click", (e) => this.clearSearch(e));

    return this.navigationContainer.appendChild(navigationForm);
  }

  /**
   * ### SEARCH PROJECTS
   * @type Function
   * @desc ...
   */

  searchProject(e) {
    if (e.target.classList.contains("search-field")) {
      const searchString = e.target.value;

      let filteredProjects = this.projects.filter((project) => {
        return project.title.toLowerCase().includes(searchString.toLowerCase());
      });

      if (filteredProjects.length === 0) {
        return (this.navigationProjectList.innerHTML = `
         <h1 class="navigation-item-not-found">
           Sorry, no project matched your search.
         </h1>
       `);
      } else {
        return this.navigationProjectItem(filteredProjects);
      }
    }
  }

  /**
   * ### CLEAR SEARCH
   * @type Component
   * @desc ...
   */

  clearSearch(e) {
    if (e.target.classList.contains("clear-search")) {
      const searchField = e.target.parentElement.previousElementSibling;
      searchField.value = "";
      return this.navigationProjectItem(this.projects);
    }
  }

  /**
   * ### NAVIGATION PROJECT LIST
   * @desc display all project items
   *
   * @structure
   *  <div class="navigation-container">
   *      <form class="navigation-form"></form>
   *      <ul class="navigation-project-list">
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

  NavigationProjectList() {
    const navigationProjectList = document.createElement("ul");
    navigationProjectList.className = "navigation-project-list";

    return this.navigationForm.insertAdjacentElement("afterend", navigationProjectList);
  }

  /**
   * ### CLEAR SEARCH
   * @type Function
   * @desc ...
   */

  navigationProjectItem(projects) {
    const findProject = projectLinks.find((project) => project.href === location.href);
    const existingProject = findProject !== undefined ? findProject : {};

    return (this.navigationProjectList.innerHTML = projects
      .map((link) => {
        return `
         <li class="navigation-item ${existingProject.id === link.id ? "selected" : ""}">
             <a href="${link.href}" class="navigation-link">
                 <img src="${link.imageSrc}" class="navigation-link-img"/>
                 <h3 class="navigation-link-title">${link.title}</h3>
             </a>
         </li>
     `;
      })
      .join(""));
  }
}

/**
 * ### INVOKE CREATE UI CLASS
 * @desc ...
 */

new CreateUI();
