import {selectors} from "../selectors.js"
import {lang} from "../lang/ru.js"
import {getCookie, parseJwt, summernoteInit} from "../utils.js";
import {sendGet, sendPost, sendPut} from "../forms.js";
import {config} from "../config.js";
import {entityId} from "../pages.js";

export const title = lang.titleUpdateCollection
export const bodyClass = selectors.bodyUpdateCollection
export const icon = selectors.iconCollections
export const htmlReplace = ".container-fluid"
export const html = `<br /><div class="card card-success">
    <div class="card-header">
        <h3 class="card-title">${lang.titleUpdateCollection}</h3>
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
                    <button type="submit" id="submitUpdateCollection" class="btn btn-primary btn-block">${lang.titleUpdateCollection}</button>
                </div>
            </div>
        </form>
    </div>
`
export function pageInit() {
    sendGet(`/api/collection/${entityId}`, function (response) {
        response = JSON.parse(response)
        $("#title").val(response.name)
        $("#description").html(response.description)
        summernoteInit()
    })
}

export function submitUpdateCollection() {
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

    sendPut(`/api/collection/${entityId}`, data, function (response){
        window.location.href = `/#${config.defaultPage}`
        window.location.reload()
    })
}