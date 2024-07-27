import {selectors} from "../selectors.js"
import {lang} from "../lang/ru.js"
import {sendPost} from "../forms.js";
import {setCookie} from "../utils.js";
import {config} from "../config.js";
import {loadPage} from "../pages.js";

export const title = lang.titleLogin
export const bodyClass = selectors.bodyLogin
export const icon = selectors.iconLogin
export const htmlReplace = ".login-card-body"
export const html = `<p class="login-box-msg">${lang.titleLogin}</p>
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
            <button type="submit" id="submitLogin" class="btn btn-primary btn-block">${lang.authorize}</button>
        </div>
    </div>
</form>
<p class="mb-0">
    <a href="/#registration" id="registration" class="text-center">${lang.titleRegistration}</a>
</p>`

export function submitLogin() {
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

    sendPost("/api/user/login", data, function (response){
        setCookie("token", response.token)
        window.location.href = `/#${config.defaultPage}`
        window.location.reload()
    })
}
