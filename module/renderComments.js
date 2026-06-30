import { comments } from "./comments.js";
import { name, token } from './api.js';
import { initAddCommentListener, initLikeListeners, initReplyListeners } from "./init.js";
import { renderLogin } from "./renderLogin.js";

export const renderComments = () => {
    const container = document.querySelector(".container");

    const commentsHTML = comments.map((comment, index) => {
        return `
            <li class="comment" data-index="${index}">
            <div class="comment-header">
                <div>${comment.name}</div>
                <div>${comment.date.toLocaleDateString()}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">
                    ${comment.text}
                </div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button data-index="${index}" class="like-button ${comment.isLiked ? "-active-like" : ""}"></button>
                </div>
            </div>
        </li>
        `
    })
    .join('')

    const addCommentsHtml = `
        <div class="add-form">
            <input
                type="text"
                class="add-form-name"
                placeholder="Введите ваше имя"/>
            <textarea
                type="textarea"
                class="add-form-text"
                placeholder="Введите ваш коментарий"
                readonly
                value="${name}"
                rows="4"
            ></textarea>
            <div class="add-form-row">
                <button class="add-form-button">Написать</button>
            </div>
        </div>
        <div class="form-loading" style="display: none; margin-top: 20px;">
            Комментарий добавляется
        </div>
    `
    const linkToLoginText = `<p>чтобы отправить комментарий, 
        <span class="link-login">войдите</span></p>`

    const baseHtml = `
        <ul class="comments">${commentsHTML}</ul>
        ${ token ? addCommentsHtml : linkToLoginText}
    `

    container.innerHTML = baseHtml

    if (token) {
        initLikeListeners(renderComments)
        initReplyListeners()
        initAddCommentListener(renderComments)
    } else {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin()
        })
    }
}