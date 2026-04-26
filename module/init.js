import {comments} from "./comments.js"

const textarea = document.querySelector(".add-form-text");

export const initLikeListeners = (renderComments) => {
    const likeButtons = document.querySelectorAll(".like-button");

    for (const likeButton of likeButtons) {
        likeButton.addEventListener("click", (event) => {
            event.stopPropagation();

            const index = likeButton.dataset.index;
            const comment = comments[index];

            comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;

            comment.isLiked = !comment.isLiked;

            renderComments();
        });
    }}
export const initReplyListeners = () => {
    const commentsElements = document.querySelectorAll(".comment");
    
        for (const commentElement of commentsElements) {
            commentElement.addEventListener("click", () => {
                const currentComment = comments [commentElement.dataset.index];
                textarea.value = `${currentComment.name}: ${currentComment.text}`;
            });
        }
};