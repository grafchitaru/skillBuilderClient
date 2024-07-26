import {defaultStructurePage, loadPage, loginStructurePage} from "./pages.js"
import {selectors} from "./selectors.js";
import {config} from "./config.js";
import {generateServiceMenu} from "./menu.js";
import {getCookie, getHash} from "./utils.js";

loadPage(getHash() || config.defaultHash)

if (getCookie("token")) {
    defaultStructurePage()
    config.mainMenu.forEach((p) => {
        generateServiceMenu(p)
    })
} else {
    loginStructurePage()
}

$(selectors.body).on("click", `.${selectors.navLink}`, function() {
    loadPage($(this).attr("id"))
})