import {selectors} from "../selectors.js"
import {lang} from "../lang/ru.js"
import {sendGet, sendPost} from "../forms.js";
import {entityId} from "../pages.js";
import {getCookie, parseJwt} from "../utils.js";
import {userCollectionIds} from "./search.js";
import {appendProgressTr, prepareClassBar} from "./collections.js";
import {typeMaterials, getTypeMaterials} from "./create_material.js";

export const title = lang.titleCollection
export const bodyClass = selectors.bodyCollection
export const icon = selectors.iconCollections
export function pageInit() {
    getTypeMaterials()
    sendGet(`/api/collection/${entityId}`, function (response) {
        let data = JSON.parse(response)

        let progress = data.xp.Int64 === 0 ? 0 : ((100 * data.xp.Int64) / data.sum_xp.Int64)
        appendProgressTr(data.id, 1, data.name, progress, parseJwt(getCookie("token")).user_id === data.user_id, userCollectionIds.includes(data.id))
        $("#descriptionCollection").html(data.description)
        if (data.user_id === parseJwt(getCookie("token")).user_id) {
            addNewMaterial()
        }
    })
    sendGet(`/api/collection/${entityId}/materials`, function (response) {
        let i = 0
        JSON.parse(response).forEach((data) => {
            i++
            appendMaterialTr(data.id, i, data.name, data.type_id, data.xp, data.link, data.completed)
        })
    })
}
export const htmlReplace = ".container-fluid"
export const html = `<br /><div class="row">
    <div class="col-md-12">
        <div class="card card-success">
            <div class="card-header">
                <h3 class="card-title">${lang.titleCollections}</h3>
            </div>

            <div class="card-body p-0">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th style="width: 10px">#</th>
                            <th>${lang.titleCollection}</th>
                            <th>${lang.progress}</th>
                            <th style="width: 40px"></th>
                        </tr>
                    </thead>
                    <tbody id="collectionList">

                    </tbody>
                </table>
                <br />
                <div id="descriptionCollection"></div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="card card-info">
            <div class="card-header">
                <h3 class="card-title">${lang.titleMaterials}</h3>
                <div class="card-tools" id="addNewMaterial" data-id="${entityId}"></div>
            </div>
            <div class="card-body p-0">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th style="width: 10px">#</th>
                            <th style="width: 10px"></th>
                            <th>${lang.titleCollection}</th>
                        </tr>
                    </thead>
                    <tbody id="materialList">

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>`

export function appendMaterialTr(id, number, title, type, xp, link, isUserComplete = false) {
    let typeName
    typeMaterials.forEach((data) => {
        if(data.id === type) {
            typeName = data.name
        }
    })
    $("#materialList").append(`
<tr>
    <td class="materialTr" id="${id}" style="cursor: pointer">${number}.</td>
    <td class="materialTr" id="${id}" style="cursor: pointer">
        <div class="form-group clearfix">
            <div class="icheck-primary d-inline">
                <input type="checkbox" class="user${isUserComplete ? "Un" : ""}CompleteMaterial" data-xp="${xp}" id="c${id}" data-id="${id}" ${isUserComplete ? "checked" : ""}>
                <label for="c${id}">
                </label>
            </div>
        </div>
    </td>
    <td class="materialTr" id="${id}" style="cursor: pointer">${link != "" ? '<a href="${link}">' : ''}${typeName} ${title} (${xp}xp)${link != "" ? '</a>' : ''}</td>
</tr>`)
}

function addNewMaterial() {
    $("#addNewMaterial").html(`<button type="button" class="btn btn-tool" title="${lang.addMaterial}"><i class="fas fa-plus-circle"></i></button>`)
}

export function setUserCompleteMaterial(id, xp) {
    sendPost(`/api/material/${id}/completed`, {id:id}, function (response) {
        $(`.userCompleteMaterial[data-id="${id}"]`)
            .removeClass("userCompleteMaterial")
            .addClass("userUnCompleteMaterial")
        updateProgress()
    })

}

function updateProgress() {
    sendGet(`/api/collection/${entityId}`, function (response) {
        let data = JSON.parse(response)
        let newProgress = parseInt(data.xp.Int64 === 0 ? 0 : ((100 * data.xp.Int64) / data.sum_xp.Int64))
        $(`.progress-bar`).attr("data-progress", newProgress).attr("style", `width: ${newProgress}%`).attr("class", `progress-bar ${prepareClassBar(newProgress)}`)
        $(`.badge`).attr("data-progress", newProgress).html(`${newProgress}%`).attr("class", `badge ${prepareClassBar(newProgress)}`)

    })
}

export function setUserUnCompleteMaterial(id, xp) {
    sendPost(`/api/material/${id}/incomplete`, {id:id}, function (response) {
        $(`.userUnCompleteMaterial[data-id="${id}"]`)
            .removeClass("userUnCompleteMaterial")
            .addClass("userCompleteMaterial")
        updateProgress()
    })
}