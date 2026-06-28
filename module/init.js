import { postComment } from "./api.js";
import { comments, updateComments } from "./comments.js";
import { sanitizeHtml } from "./sanitizeHtml.js";

export const initLikeListeners = (renderComments) => {
    const likeButtons = document.querySelectorAll(".like-button");

    for (const likeButton of likeButtons) {
        likeButton.addEventListener("click", (event) => {
            event.stopPropagation();

            const index = likeButton.dataset.index;
            const comment = comments[index];

            comment.likes = comment.isLiked 
                ? comment.likes - 1 
                : comment.likes + 1;

            comment.isLiked = !comment.isLiked;

            renderComments();
        });
    }
}
    
export const initReplyListeners = () => {
    const textarea = document.querySelector(".add-form-text");
    const commentsElements = document.querySelectorAll(".comment");
    
    for (const commentElement of commentsElements) {
        commentElement.addEventListener("click", () => {
            const currentComment = comments [commentElement.dataset.index];
            textarea.value = `${currentComment.name}: ${currentComment.text}`;
        })
    }
}

export const initAddCommentListener = (renderComments) => {
    const input = document.querySelector('.add-form-name');
    const textarea = document.querySelector('.add-form-text');
    const button = document.querySelector('.add-form-button');

    button.addEventListener('click', () => {
        if (!input.value || !textarea.value) {
            console.error("заполните форму");
            return;
        }

<<<<<<< HEAD
=======
        // button.disabled = true
        // button.textContent = 'ПОДОЖДИ...'
        document.querySelector('.form-loading').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'

>>>>>>> f69f5d326a8aab4e2bd48211d27a1c610c88eef8
        postComment(sanitizeHtml(textarea.value), sanitizeHtml(input.value),).then(
        (data) => {
            document.querySelector('.form-loading').style.display = 'none'
            document.querySelector('.add-form').style.display = 'flex'
            // button.disabled = false
            // button.textContent = 'Написать'

            updateComments(data);
            renderComments()
            input.value = ''
            textarea.value = ''
        })
    });
}