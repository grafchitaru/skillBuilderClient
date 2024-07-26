import {pages} from "./pages.js"
import {selectors} from "./selectors.js";

pages('login').then(page=>  {
    $(selectors.body)
        .attr("class", page.bodyClass)
    $(selectors.title).text(page.title)
})
