import {defaultStructurePage, loadPage, loginStructurePage} from "./pages.js"
import {selectors} from "./selectors.js";
import {config} from "./config.js";
import {generateServiceMenu} from "./menu.js";
import {getCookie, getHash} from "./utils.js";
import {submitLogin} from "./pages/login.js";
import {submitRegistration} from "./pages/registration.js";
import {submitCreateCollection} from "./pages/create_collection.js";
import {submitUpdateCollection} from "./pages/update_collection.js";
import {submitSearchCollection} from "./pages/search.js"
import {addToUserCollection, removeFromUserCollection} from "./pages/collections.js";
import {setXpFromTypeMaterials, submitCreateMaterial} from "./pages/create_material.js";
import {setUserCompleteMaterial, setUserUnCompleteMaterial} from "./pages/collection.js";

loadPage(getHash() || config.defaultHash)

if (getCookie("token")) {
    defaultStructurePage()
    config.mainMenu.forEach((p) => {
        generateServiceMenu(p)
    })
} else {
    loginStructurePage()
}

$(selectors.body)
    .on("click", `.${selectors.navLink}, a`, function() {
        loadPage($(this).attr("id"))
    })
    .on("click", `#submitLogin`, function() {
        submitLogin()
        return false
    })
    .on("click", `#submitRegistration`, function() {
        submitRegistration()
        return false
    })
    .on("click", `#submitCreateCollection`, function() {
        submitCreateCollection()
        return false
    })
    .on("click", `#submitCreateMaterial`, function() {
        submitCreateMaterial()
        return false
    })
    .on("click", `.collectionTr`, function() {
        loadPage("collection", $(this).attr("id"))
        return false
    })
    .on("click", `.updateCollectionTr`, function() {
        console.log($(this).attr("data-id"))
        loadPage("update_collection", $(this).attr("data-id"))
        return false
    })
    .on("click", `#submitUpdateCollection`, function() {
        submitUpdateCollection()
        return false
    })
    .on("click", `#searchCollections`, function() {
        submitSearchCollection()
        return false
    })
    .on("click", `.addToUserCollection`, function() {
        addToUserCollection($(this).attr("data-id"))
        return false
    })
    .on("click", `.removeFromUserCollection`, function() {
        removeFromUserCollection($(this).attr("data-id"))
        return false
    })
    .on("click", `#addNewMaterial`, function() {
        console.log($(this).attr("data-id"))
        loadPage("create_material", $(this).attr("data-id"))
        return false
    })
    .on("change", `#typeMaterials`, function() {
        setXpFromTypeMaterials($(this).val())
        return false
    })
    .on("change", `.userCompleteMaterial`, function() {
        setUserCompleteMaterial($(this).attr("data-id"), $(this).attr("data-xp"))
        return false
    })
    .on("change", `.userUnCompleteMaterial`, function() {
        setUserUnCompleteMaterial($(this).attr("data-id"), $(this).attr("data-xp"))
        return false
    })