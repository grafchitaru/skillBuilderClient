import {selectors} from "../selectors.js"
import {lang} from "../lang/ru.js"
import {sendGet} from "../forms.js";
import {getCookie, parseJwt} from "../utils.js";

export const title = lang.titleCollections
export const bodyClass = selectors.bodyCollections
export const icon = selectors.iconCollections
export function pageInit() {
    let i = 0
    sendGet("/api/collections/user", function (response) {
        JSON.parse(response).forEach((data) => {
            i++
            let pregress = data.xp.Int64 === 0 ? 0 : (data.sum_xp.Int64 / data.xp.Int64)
            appendProgressTr(data.id, i, data.name, pregress, parseJwt(getCookie("token")).user_id === data.user_id)
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

function appendProgressTr(id, number, title, progress, isThisUserCreated = false) {
    let updateCollectionTr
    if (isThisUserCreated) {
        updateCollectionTr = `<td class="updateCollectionTr" id="${id}" style="cursor: pointer"><i class="fas fa-edit"></i></td>`
    }
    $("#collectionList").append(`
<tr>
    <td class="collectionTr" id="${id}" style="cursor: pointer">${number}.</td>
    <td class="collectionTr" id="${id}" style="cursor: pointer">${title}</td>
    <td class="collectionTr" id="${id}" style="cursor: pointer">
        <div class="progress progress-xs">
            <div class="progress-bar ${prepareClassBar(progress)}" style="width: ${progress}%"></div>
        </div>
        <span class="badge ${prepareClassBar(progress)}">${progress}%</span>
    </td>
    ${updateCollectionTr}
</tr>`)
}

function prepareClassBar(progress) {
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
