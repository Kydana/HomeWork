import { postComment } from "./api.js";
import {comments, updateComments} from "./comments.js";
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
    const commentsElements = document.querySelectorAll(".comment");
    const textarea = document.querySelector(".add-form-text");
    
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

        // const newComment = {
        //     name: sanitizeHtml(input.value),
        //     date: new Date(),
        //     text: sanitizeHtml(textarea.value),
        //     likes: 0,
        //     isLiked: false,
        // };

        postComment(sanitizeHtml(textarea.value), sanitizeHtml(input.value),).then(
        (data) => {
            updateComments(data);
            renderComments()
            input.value = ''
            textarea.value = ''
        })

        // comments.push(newComment);
        // renderComments();
        // input.value = "";
        // textarea.value = "";
    });
}