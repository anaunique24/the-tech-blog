const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    if (title && content) {
    const response = await fetch('/api/', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Falied to add new post. Try again.');
        }
      }
    };

const delButtonHandler = async (event) => {
       if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribut('data-id');
        
        const response = await fetch(`/api/${id}`, {
            method: 'DELETE',
        });
        
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
            alert('Failed to delete this post. Try again.');
        }
    }
};

document
.querySelector('.new-post-form')
.addEventListener('click', newPostHandler);

document
.querySelector('#blog-list')
.addEventListener('click', delButtonHandler);