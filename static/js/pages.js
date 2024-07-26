import {config} from "./config.js"
import {selectors} from "./selectors.js";

export async function pages(page) {
    let module = (await import(`./pages/${defaultPage(page)}.js`))
    if (module) {
        const { title, bodyClass, icon } = module
        return { title, bodyClass, icon }
    }

    return null
}

function defaultPage(page) {
    if (page === "index") {
        page = config.defaultPage
    }
    if (!config.pages.includes(page)) {
        page = "not_found"
    }
    return page
}

export function loadPage(p) {
    pages(p).then(page=>  {
        $(selectors.body).attr(selectors.class, page.bodyClass)
        $(selectors.title).text(page.title)
    })
}