const baseUrl = 'https://blog-apps-c12bf.firebaseio.com/';

function attachEvents() {
    let loadPostsElement = document.getElementById('btnLoadPosts');
    let viewPostElement = document.getElementById('btnViewPost');
    postsElement = document.getElementById('posts');

    loadPostsElement.addEventListener('click', () => {
        
        fetch(baseUrl + 'posts.json')
            .then((res) => res.json())
            .then(data => {
                let options = Object.keys(data)
                    .map(key => `<option value="${key}">${data[key]
                    .title}</option>`)
                    .join('');
                postsElement.innerHTML = options;
            });
    });

    viewPostElement.addEventListener('click', () => {
        document.getElementById('post-title').innerHTML = '';
        document.getElementById('post-body').innerHTML = '';
        document.getElementById('post-comments').innerHTML = '';
        let selectedPostKey = postsElement.value;
        let postId;
        let postComment = document.getElementById('post-comments');
        // console.log('Button is clicked! The post to print has the following key: ' + selectedPostKey);

        fetch(baseUrl + `posts/${selectedPostKey}.json`)
            .then((res) => res.json())
            .then((data) => {
                document.getElementById('post-title').innerHTML = data.title;
                document.getElementById('post-body').innerHTML = data.body;

                for (each of data.comments) {
                    let newComment = document.createElement('li');
                    let a = `<li id="${each.id}">${each.text}</li>`;
                    newComment.innerHTML = a;
                    postComment.appendChild(newComment);
                }
            });
    });
}

attachEvents();