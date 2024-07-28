import {selectors} from "../selectors.js"
import {lang} from "../lang/ru.js"
import {setCookie, summernoteInit} from "../utils.js";
import {sendPost} from "../forms.js";
import {config} from "../config.js";

export const title = lang.titleCreateCollection
export const bodyClass = selectors.bodyCreateCollection
export const icon = selectors.iconCreateCollection
export const htmlReplace = ".container-fluid"
export const html = `<br /><div class="card card-success">
    <div class="card-header">
        <h3 class="card-title">${lang.titleCreateCollection}</h3>
    </div>

    <div class="card-body">
        <form>
            <div class="row">
                <div class="col-sm-12">

                    <div class="form-group">
                        <label>${lang.title}</label>
                        <input type="text" id="title" class="form-control" placeholder="${lang.title} ...">
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label>${lang.description}</label>
                        <div class="card-body">
                            <textarea id="description" class="summernote"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <button type="submit" id="submitCreateCollection" class="btn btn-primary btn-block">${lang.titleCreateCollection}</button>
                </div>
            </div>
        </form>
    </div>
`
export function pageInit() {
    summernoteInit()
}

export function submitCreateCollection() {
    let title = $("#title").val()
    let description = $("#description").val()

    if (title === "") {
        alert("Необходимо заполнить название")
        return false
    }

    let data = {
        name: title,
        description: description
    }

    sendPost("/api/collection", data, function (response){
        window.location.href = `/#${config.defaultPage}`
        window.location.reload()
    })
}
