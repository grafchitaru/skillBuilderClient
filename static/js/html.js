export function a(el, clas= '', id = '', href= '#', params = []) {
    return `<a ${prepareParams(params)} href="${href}" class="${clas}" id="${id}">${el}</a>`
}

export function i(clas = '', id = '') {
    return `<i class="${clas}" id="${id}"></i>`
}

export function li(el, clas = '', id='') {
    return `<li class="${clas}" id="${id}">${el}</li>`
}

export function p(el, clas = '', id = '') {
    return `<p class="${clas}" id="${id}">${el}</p>`
}

export function ul(el, clas = '', id = '') {
    return  `<ul class="${clas}" id="${id}">${el}</ul>`
}

export function h4(el, clas = '') {
    return `<h4 class="${clas}">${el}</h4>`
}

export function input(type = 'text', clas = '', name = '', value = '', placeholder = '', id = '', checked = '') {
    let ch
    if (checked !== '') {
        ch = 'checked=""'
    }
    return `<input value="${value}" type="${type}" name="${name}" class="${clas}" id="${name}" placeholder="${placeholder}" ${ch} />`
}

export function option(value, name) {
    return `<option value="${value}">${name}</option>`
}

export function select(name, values, clas = '', id = '', params = []) {
    return `<select ${prepareParams(params)} class="${clas}" id="${name}" name="${name}">${values}</select>`
}

export function div(el = '', clas = '', id = '', params = []) {
    return `<div ${prepareParams(params)} class="${clas}" id="${id}">${el}</div>`
}

export function button(type = 'submit', clas = '', id = '', text = '', params = []) {
    return `<button ${prepareParams(params)} type="${type}" class="${clas}" id="${id}">${text}</button>`
}

export function span(el, clas = '', id = '') {
    return `<span class="${clas}" id="${id}">${el}</span>`
}

export function hr() {
    return `<hr />`
}

export function br() {
    return `<br />`
}

export function pre(el, id = '') {
    return `<pre id="${id}">${el}</pre>`
}

export function label(el, clas) {
    return `<label class="${clas}">${el}</label>`
}

function prepareParams(params) {
    let allParams = ''
    if (params !== {}) {
        params.forEach(item => {
            allParams += ` ${item.key}="${item.value}" `
        })
    }
    return allParams
}
