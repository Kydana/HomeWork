import { renderComments } from './module/renderComments.js'
import { comments } from './module/comments.js'

renderComments()

const button = document.querySelector('.add-form-button')
const input = document.querySelector('.add-form-name')
const textarea = document.querySelector('.add-form-text')

const sanitizeHtml = (value) => {
    return value.replaceAll('<', '&lt;').replaceAll('>', '&lt;')
}

button.addEventListener('click', () => {
    if (!input.value || !textarea.value) {
        return
    }

    const newComment = {
        name: sanitizeHtml(input.value),
        date: new Date(),
        text: sanitizeHtml(textarea.value),
        likes: 0,
        isLiked: false,
    }

    comments.push(newComment)

    renderComments()

    input.value = ''
    textarea.value = ''
})
