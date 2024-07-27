import {selectors} from "../selectors.js"
import {lang} from "../lang/ru.js"
import {sendPost} from "../forms.js";
import {setCookie} from "../utils.js";
import {config} from "../config.js";
import {loadPage} from "../pages.js";

export const title = lang.titleRegistration
export const bodyClass = selectors.bodyRegistration
export const icon = selectors.iconRegistration
export const htmlReplace = ".login-card-body"
export const html = `<p class="login-box-msg">${lang.titleRegistration}</p>
<form action="" method="post">
    <div class="input-group mb-3">
        <input type="login" id="login" class="form-control" placeholder="${lang.login}">
        <div class="input-group-append">
            <div class="input-group-text">
                <span class="fas fa-envelope"></span>
            </div>
        </div>
    </div>
    <div class="input-group mb-3">
        <input type="password" id="password" class="form-control" placeholder="${lang.password}">
        <div class="input-group-append">
            <div class="input-group-text">
                <span class="fas fa-lock"></span>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <button type="submit" id="submitRegistration" class="btn btn-primary btn-block">${lang.register}</button>
        </div>
    </div>
</form>
<p class="mb-0">
    <a href="/#login" id="login" class="text-center">${lang.titleLogin}</a>
</p>`

export function submitRegistration() {
    let login = $("#login").val()
    let password = $("#password").val()

    if (login === "" || password === "") {
        alert("Все поля обязательны для заполнения")
        return false
    }

    let data = {
        login: login,
        password: password
    }

    sendPost("/api/user/register", data, function (response){
        setCookie("token", response.token)
        window.location.href = `/#${config.defaultPage}`
        window.location.reload()
    })
}
