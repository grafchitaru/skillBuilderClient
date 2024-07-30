import {selectors} from "../selectors.js"
import {lang} from "../lang/ru.js"
import {sendDelete, sendGet, sendPost} from "../forms.js";
import {getCookie, parseJwt} from "../utils.js";
import {userCollections, userCollectionIds} from "./search.js"

export const title = lang.titleCollections
export const bodyClass = selectors.bodyCollections
export const icon = selectors.iconCollections
export function pageInit() {
    userCollections()
    let i = 0
    sendGet("/api/collections/user", function (response) {
        JSON.parse(response).forEach((data) => {
            i++
            let progress = data.xp.Int64 === 0 ? 0 : ((100 * data.xp.Int64) / data.sum_xp.Int64)
            appendProgressTr(data.id, i, data.name, progress, parseJwt(getCookie("token")).user_id === data.user_id, userCollectionIds.includes(data.id))
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
            </div>
        </div>
    </div>
</div>`

export function appendProgressTr(id, number, title, progress, isThisUserCreated = false, inUserCollection = false) {
    progress = Math.ceil(progress)
    let updateCollectionTr, addToUserCollection
    if (isThisUserCreated) {
        updateCollectionTr = `<td class="updateCollectionTr" data-id="${id}" style="cursor: pointer"><i title="${lang.edit}" class="fas fa-edit"></i></td>`
    } else {
        addToUserCollection = `<td class="addToUserCollection" data-id="${id}" style="cursor: pointer"><i title="${lang.addToCollectionUser}" class="fas fa-plus"></i></td>`
        if (inUserCollection) {
            addToUserCollection = `<td class="removeFromUserCollection" data-id="${id}" style="cursor: pointer"><i title="${lang.removeFromCollectionUser}" class="fas fa-minus"></i></td>`
        }
    }

    $("#collectionList").append(`
<tr>
    <td class="collectionTr" id="${id}" style="cursor: pointer">${number}.</td>
    <td class="collectionTr" id="${id}" style="cursor: pointer">${title}</td>
    <td class="collectionTr" id="${id}" style="cursor: pointer">
        <div class="progress progress-xs">
            <div class="progress-bar ${prepareClassBar(progress)}" data-progress="${progress}" style="width: ${progress}%"></div>
        </div>
        <span class="badge ${prepareClassBar(progress)}" data-progress="${progress}">${progress}%</span>
    </td>
    ${updateCollectionTr}
    ${addToUserCollection}
</tr>`)
}

export function prepareClassBar(progress) {
    if (progress > 90) {
        return `bg-success`
    }
    if (progress < 15) {
        return `bg-danger`
    }
    if (progress > 14 && progress < 50) {
        return `bg-warning`
    }
    return `bg-primary`
}

export function addToUserCollection(id) {
    sendPost(`/api/collection/${id}/user`, {id:id}, function () {
        $(`td.addToUserCollection[data-id="${id}"]`).html(`<i title="${lang.removeFromCollectionUser}" class="fas fa-minus"></i>`)
        window.location.reload()
    })
}

export function removeFromUserCollection(id) {
    sendDelete(`/api/collection/${id}/user`, {id:id}, function () {
        $(`td.removeFromUserCollection[data-id="${id}"]`).html(`<i title="${lang.addToCollectionUser}" class="fas fa-plus"></i>`)
        window.location.reload()
    })
}
