import toCapitalize from "../utils/to-capitalize.js";
import projectLinks from "../utils/project-links.js";

class CreateUI {
  constructor(links) {
    this.links = [...links];

    this.arrayFunctions = [this.renameHeadTitle(), this.createNavigation(), this.search()];

    this.combineFunctions(this.arrayFunctions);
  }

  combineFunctions(functions = []) {
    return functions.reduceRight((a, c) => a + c, []);
  }

  renameHeadTitle() {
    const title = document.querySelector("title");
    console.log(this.links);

    // const titleString = this.links.find((link) => link.href === location.href).title;
    // title.textContent = toCapitalize(titleString);
  }

  createNavigation() {
    console.log("Create Navigation");
  }

  search() {
    console.log("Search");
  }
}

new CreateUI(projectLinks);
