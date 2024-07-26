import {config} from "./config.js"

export async function pages(page) {
    let module = (await import(`./pages/${defaultPage(page)}.js`))
    if (module) {
        const { title, bodyClass } = module
        return { title, bodyClass }
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