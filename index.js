import { fetchComments } from './module/api.js';
import { updateComments } from './module/comments.js';
import { initAddCommentListener } from './module/init.js'
import { renderComments } from './module/renderComments.js'

fetchComments().then(data => {
    updateComments(data)
    renderComments()
})

initAddCommentListener(renderComments);