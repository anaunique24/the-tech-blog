const newCommentHandler = async (event) => {
    event.preventDefault();
    const post_id = "";

    const comment_text = document.querySelector('#comment-form').value.trim();

    if (comment_text && post_id) {
        const response = await fetch (`/api/comment/:id`, {
            method: 'POST',
            body: JSON.stringify({comment_text, post_id}),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Falied to create a new comment. Try again.');
        }
    }
};

document
    .querySelector('#post-comment')
    .addEventListener('click', newCommentHandler);