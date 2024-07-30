import {selectors} from "../selectors.js"
import {lang} from "../lang/ru.js"
import {summernoteInit} from "../utils.js";
import {sendGet, sendPost} from "../forms.js";
import {entityId} from "../pages.js";

export let typeMaterials
export const title = lang.titleCreateMaterial
export const bodyClass = selectors.bodyCreateMaterial
export const icon = selectors.iconCollections
export const htmlReplace = ".container-fluid"
export const html = `<br /><div class="card card-success">
    <div class="card-header">
        <h3 class="card-title">${lang.titleCreateMaterial}</h3>
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
                <div class="col-sm-12">
                    <div class="form-group">
                        <label>${lang.type}</label>
                        <div class="card-body">
                        <select class="form-control select2" id="typeMaterials" style="width: 100%;" name="type_id">
                    
                        </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label>${lang.xp}</label>
                        <input type="number" id="xp" class="form-control" placeholder="${lang.xp} ...">
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label>${lang.link}</label>
                        <input type="text" id="link" class="form-control" placeholder="${lang.link} ...">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <button type="submit" id="submitCreateMaterial" class="btn btn-primary btn-block">${lang.titleCreateMaterial}</button>
                </div>
            </div>
        </form>
    </div>
`
export function pageInit() {
    summernoteInit()
    getTypeMaterials()
    $('.select2').select2()
}

export function submitCreateMaterial() {
    let title = $("#title").val(),
        description = $("#description").val(),
        type_id = $("#typeMaterials").val(),
        xp = $("#xp").val(),
        link = $("#link").val()


    if (title === "" || type_id === "" || xp === "") {
        alert(lang.allFieldsNeedToFeel)
        return false
    }

    let data = {
        collectionID: entityId,
        name: title,
        description: description,
        type_id: type_id,
        xp: xp,
        link: link,
    }

    sendPost("/api/material", data, function (response){
        window.location.href = `/#collection`
        window.location.reload()
    })
}

export function getTypeMaterials() {
    sendGet(`/api/material/type`, function (response) {
        typeMaterials = JSON.parse(response)
        typeMaterials.forEach((data) => {
            $("#typeMaterials").append(`<option value="${data.id}">${data.name}</option>`)
        })
        setXpFromTypeMaterials($("#typeMaterials").val())
    })
}

export function setXpFromTypeMaterials(val) {
    typeMaterials.forEach((data) => {
        if(data.id === val) {
            $("#xp").val(data.xp)
        }
    })
}
