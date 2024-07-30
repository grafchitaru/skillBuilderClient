import {config} from "./config.js"
import {selectors} from "./selectors.js"
import {getCookie} from "./utils.js"
import {div, aside, ul, nav, section, a, b} from "./html.js";

export let entityId

export async function pages(page) {
    let module = (await import(`./pages/${defaultPage(page)}.js`))
    if (module) {
        const {title, bodyClass, icon, htmlReplace, html, pageInit} = module
        return {title, bodyClass, icon, htmlReplace, html, pageInit}
    }

    return null
}

function defaultPage(page) {
    if (page === "login" || page === "registration") {
        page = getCookie("token") ? config.defaultPage : page
    }
    if (page === "index") {
        page = getCookie("token") ? config.defaultPage : "login"
    }
    if (!config.pages.includes(page)) {
        page = "not_found"
    }
    return page
}

export function loadPage(p, id = "") {
    entityId = id
    console.log(entityId)
    pages(p).then(page => {
        $(selectors.body).attr(selectors.class, page.bodyClass)
        $(selectors.title).text(page.title)
        $(page.htmlReplace).html(page.html)
        page.pageInit()
    })
    //window.location.href = `/#${p}`
}

export function defaultStructurePage() {
    $(selectors.body).html(div((
        aside(nav(ul("", selectors.navUl, selectors.servicesMenus, "treeview", "menu", "false"), selectors.navMt2), selectors.defaultStructurePageAside) +
        div(section(div("", selectors.containerFluid), selectors.content), selectors.contentWrapper)
    ), selectors.wrapper))
}

export function loginStructurePage() {
    $(selectors.body).html(div((
        div(a(b(config.title), "", "", "#"), selectors.loginLogo) +
            div(div("", selectors.cardBodyLogin), selectors.card)
    ), selectors.loginBox))
}
