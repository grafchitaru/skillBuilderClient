import {loadPage} from "./pages.js"
import {selectors} from "./selectors.js";
import {config} from "./config.js";
import {generateServiceMenu} from "./menu.js";

loadPage("index")

config.main_menu.forEach((p) => {
    generateServiceMenu(p)
})

$(selectors.body).on("click", `.${selectors.navLink}`, function() {
    loadPage($(this).attr("id"))
})