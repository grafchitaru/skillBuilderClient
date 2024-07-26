import { li, p, i, a } from "./html.js"
import { selectors } from "./selectors.js"
import {pages} from "./pages.js";

export function generateServiceMenu(name) {
    pages(name).then(page=>  {
        $(selectors.servicesMenu).append(
            li(
                a(
                    i(page.icon) + p(page.title),
                    selectors.navLink,
                    `${name}`,
                    `#${name}`
                ), selectors.navItem
            )
        )
    })
}
