import {selectors} from "../selectors.js"
import {lang} from "../lang/ru.js"
import {sendGet, sendPost} from "../forms.js";
import {getCookie, parseJwt} from "../utils.js";
import {appendProgressTr} from "./collections.js"

export const title = lang.titleSearch
export const bodyClass = selectors.bodySearch
export const icon = selectors.iconSearch
export function pageInit() {
    userCollections()
    defaultSearch()
}
export let userCollectionIds = []
export const htmlReplace = ".container-fluid"
export const html = `<br />
<div class="row">
    <div class="col-md-12">
        <div class="card card-success">
            <div class="card-header">
                <h3 class="card-title">${lang.titleCollections}</h3>
            </div>

            <div class="card-body p-0"><br />
                <div class="form-inline">
                    <div class="input-group">
                        <input class="form-control form-control-sidebar" id="searchs" type="search" placeholder="${lang.search}">
                        <div class="input-group-append">
                            <button class="btn btn-sidebar" id="searchCollections">
                                <i class="fas fa-search fa-fw"></i>
                            </button>
                        </div>
                    </div>
                </div>
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
            </div>
        </div>
    </div>
</div>`

export function submitSearchCollection() {
    let search = $("#searchs").val()

    if (search === "") {
        $("#collectionList").html("")
        defaultSearch()
        return false
    }

    let data = {
        query: search,
    }

    sendPost("/api/search", data, function (response){
        $("#collectionList").html("")
        let i = 0
        response = JSON.parse(response)
        let collections = response.collections
        collections.forEach((data) => {
            i++
            let progress = data.xp.Int64 === 0 ? 0 : (data.sum_xp.Int64 / data.xp.Int64)
            appendProgressTr(data.id, i, data.name, progress, parseJwt(getCookie("token")).user_id === data.user_id, userCollectionIds.includes(data.id))
        })
        //let materials = response.materials
        //TODO add search by material
        //TODO add pagination
    })
}

function defaultSearch() {
    let i = 0
    sendGet("/api/collections", function (response) {
        JSON.parse(response).forEach((data) => {
            i++
            let progress = data.xp.Int64 === 0 ? 0 : (data.sum_xp.Int64 / data.xp.Int64)
            appendProgressTr(data.id, i, data.name, progress, parseJwt(getCookie("token")).user_id === data.user_id, userCollectionIds.includes(data.id))
        })
    })
}

export function userCollections() {
    sendGet("/api/collections/user", function (response) {
        JSON.parse(response).forEach((data) => {
            userCollectionIds.push(data.id)
        })
    })
}