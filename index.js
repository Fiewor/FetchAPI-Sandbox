document.getElementById('getText').addEventListener('click', getText);
document.getElementById('getUsers').addEventListener('click', getUsers);
document.getElementById('getPosts').addEventListener('click', getPosts);
document.getElementById('addPost').addEventListener('click', addPost);

function getText() {
    fetch('sample.txt')
    .then(res => res.text())
    .then(data => {
        document.getElementById('output').innerHTML = data;
    })
    .catch(error => console.log(error))
}

function getUsers() {
    fetch('users.json')
    .then(res => res.json())
    .then(data => {
        let output = '<h2>Users</h2>';
        data.forEach(function(user) {
            output += `
                <ul>
                    <li>ID: ${user.id}</li>
                    <li>Name: ${user.name}</li>
                    <li>Email: ${user.email}</li>
                </ul>
            `;
        });
        document.getElementById(`output`).innerHTML = output;
    })
}

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
        let output = '<h2>Posts</h2>';
        data.forEach(post => {
            output += `
                <div>
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                </div>
            `;
        });
        document.getElementById(`output`).innerHTML = output;
    })
}
// allowing us to post to the api
function addPost(e) {
    // to stop it from actually submitting to the file
    e.preventDefault();
    let title = document.querySelector(`#title`).value;
    let body = document.querySelector(`#body`).value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({title:title, body:body})
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}

// async function getText() {
//     let url = 'sample.txt';
//     try {
//         let res = await fetch(url);
//         // return await res.json();
//     } catch (error) {
//         console.log(error);
//     }
// }