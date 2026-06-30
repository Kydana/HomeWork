import { fetchComments } from './module/api.js'
import { updateComments } from './module/comments.js'
import { renderComments } from './module/renderComments.js'

export const fetchAndRenderComments = (isFirstLoading) => {

    if (isFirstLoading) {
        document.querySelector('.container').innerHTML = 
            `<p>Пожалуйста подождите, загружаю комментарий...</p>`
    } else {
        
    }
    fetchComments().then(data => {
        updateComments(data)
        renderComments()
    })
}

fetchAndRenderComments(true)