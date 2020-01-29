const body = document.querySelector('body')
const header = document.querySelector('header')
const appNameDiv = document.querySelector('#appName')
const appName = document.querySelector('#appName')
const logCorner = document.querySelector('#logCorner')
const loginButton = document.querySelector('#loginButton')
const logoutButton = document.querySelector('#logoutButton')
const profileInput = document.querySelector('#profileInput')
const userLink = document.querySelector('#userLink')
const pageHeading = document.querySelector('#pageHeading')
const profilePicDiv = document.querySelector('#profilePicDiv')
const profileImage = document.querySelector('#profileImage')
const themeImage = document.querySelector('#themeImage')
const postDiv = document.querySelector('#posts')
const postForm = document.querySelector('#postForm')
const postList = document.querySelector('#postList')
const widgets = document.querySelector('#widgets')
const taskForm = document.querySelector('#taskForm')
const taskList = document.querySelector('#taskList')
const friendForm = document.querySelector('#friendForm')
const friendList = document.querySelector('#friendList')
const themeSelect = document.querySelector('#themeSelect')

const communiteePage = 'http://localhost:3000/'
const usersUrl = 'http://localhost:3000/users'
const postsUrl = 'http://localhost:3000/posts'
const tasksUrl = 'http://localhost:3000/tasks'
const commentsUrl = 'http://localhost:3000/comments'

let userIndex = {}
let currentUser = {}


function logout() {
    currentUser = {}
    resetPage()
}
logoutButton.addEventListener('click', logout)

function resetPage() {
    changeTheme('manatee')
    pageHeading.innerText = 'Communitee Pool'
    profilePicDiv.style.backgroundImage = "url('https://www.jakks.com/img/products/nintendo/702190.jpg')";
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    while (friendList.firstChild) {
        friendList.removeChild(friendList.firstChild);
    }
    while (postList.firstChild) {
        postList.removeChild(postList.firstChild);
    }
}

function resetPageLite() {
    pageHeading.innerText = 'Communitee Pool'
    while (postList.firstChild) {
        postList.removeChild(postList.firstChild);
    }
}

// adding new friends (optimistic rendering only)
friendForm.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const friend = formData.get('friend')
    displayFriend(friend)
        // add code to postFriend(friend) to back end
    event.target.reset()
})

// adding new tasks
taskForm.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const task = formData.get('task')
    displayTask(task)
    postTask(task)
    event.target.reset()
})
function displayTask(task) {
    const div = document.createElement('div')
    const p = document.createElement('p')
    const trash = document.createElement('button')
    p.innerText = task
    trash.className = 'trash'
    trash.innerText = 'Trash'
    p.appendChild(trash)
    div.appendChild(p)
    taskList.appendChild(div)
}
function postTask(task) {
    const taskObject = {
        content: task,
        user_id: currentUser.data.id
    }
    postToBack(tasksUrl, taskObject)
}

// adds event delegation for trash class WIDGET
widgets.addEventListener('click', event => {
        if (event.target.className == 'trash') {
            event.target.parentNode.remove();
        }
    })

// adding new posts
postForm.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const postContent = formData.get('postInput')
    let postAnon = formData.get('anon')
    postAnon == null ? postAnon = false : postAnon = true
    const postObject = {
        user_id: currentUser.data.id,
        anon: postAnon,
        crash: 0,
        splash: 0,
        content: postContent
    }
    // * back end = crash, front end = bash *
    event.target.reset()
    displayPost(postObject)
    postToBack(postsUrl, postObject)
})
// optimistically rendering post
function displayPost(post, comments = []) {
    const postCard = document.createElement('div')
    postCard.className = 'card'

    const contentContainer = document.createElement('div')
    contentContainer.className = 'content'

    const postButtonContainer = document.createElement('div')
    postButtonContainer.className = 'post-button-container'

    const content = document.createElement('p')
    styleContent(content, post)

    const splashes = document.createElement('span')
    styleSplashes(splashes)
    const splashButton = document.createElement('button')
    styleSplashButton(splashButton, post)

    const bashes = document.createElement('span')
    styleBashes(bashes)
    const bashButton = document.createElement('button')
    styleBashButton(bashButton, post)

    displayComments(comments, contentContainer)

    splashes.appendChild(splashButton)
    bashes.appendChild(bashButton)
    postButtonContainer.append(splashes, bashes)
    contentContainer.appendChild(content)
    postCard.append(contentContainer, postButtonContainer)
    postList.appendChild(postCard)
}
function postToBack(url, data) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
}
function displayComments(comments, container) {
    const ul = document.createElement('ul')
    const form = document.createElement('form')
    const text = document.createElement('input')
    const send = document.createElement('input')
    // break into function elsewhere, start
    text.type = 'text'
    text.name = 'commentInput'
    text.placeholder = 'want to respond?'
    send.type = 'submit'
    send.value = 'Send'
    // end of stuff, but also do form
    form.className = 'commentForm'
    form.append(text, send)

    form.addEventListener('submit', event => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const commentContent = formData.get('commentInput')
        renderListItem(ul, commentContent)
        event.target.reset()
        // const commentObject = {
        //     content: commentContent,
        //     post_id: 
        // }
        // postToBack(commentsUrl, commentObject)
    })
    container.append(ul, form)
    comments.forEach(comment => renderListItem(ul, comment.content))
}
function renderListItem(ul, content) {
    const li = document.createElement('li')
    li.textContent = content
    ul.appendChild(li)
}
// theme control center
const themes = {
    manatee: {
        url: "url('https://api.time.com/wp-content/uploads/2017/03/manatee-endangered-species.jpeg')",
        backgroundSize: '450%',
        backgroundPosition: '35% 45%',
        headerColor: '#28AFB0',
        headFontColor: '#37392E',
        logoColor: '#37392E',
        superBackground: '#D1FAFF',
        bodyFont: '#062726',
        boxShadow: '0 3px 4px 3px silver',
        postsBackground: '#9BD1E5',
        widgetColor: 'rgb(36, 137, 170)',
        lineColor: '3px solid rgb(36, 137, 170)',
        poolColor: '#D1FAFF'
    },
    otter: {
        url: "url('https://upload.wikimedia.org/wikipedia/commons/0/02/Sea_Otter_%28Enhydra_lutris%29_%2825169790524%29_crop.jpg')",
        backgroundSize: '250%',
        backgroundPosition: '50% 60%',
        headerColor: '#BE8A60',
        headFontColor: '#56351E',
        logoColor: '#56351E',
        superBackground: '#DECBB7',
        bodyFont: '#56351E',
        boxShadow: '0 3px 4px 3px #A49966',
        postsBackground: 'rgb(240, 199, 133)',
        widgetColor: 'rgb(187, 141, 99)',
        lineColor: '3px solid rgb(187, 141, 99)',
        poolColor: '#DECBB7'
    },
    narwhal: {
        url: "url('https://www.abeautiful.world/wp-content/uploads/2016/03/xnarwhal-pictures.jpg')",
        backgroundSize: '325%',
        backgroundPosition: '75% 45%',
        headerColor: '#3B3355',
        headFontColor: '#FEFCFD',
        logoColor: '#FEFCFD',
        superBackground: '#FEFCFD',
        bodyFont: '#062726',
        boxShadow: '0 3px 4px 3px silver',
        postsBackground: '#BFCDE0',
        widgetColor: '#5D5D81',
        lineColor: '3px solid #5D5D81',
        poolColor: '#FEFCFD'
    }
}
themeSelect.addEventListener('change', event => {
    changeTheme(event.target.value)
})
function changeTheme(animal) {
    themeImage.style.backgroundImage = themes[animal]['url']
    themeImage.style.backgroundSize = themes[animal]['backgroundSize']
    themeImage.style.backgroundPosition = themes[animal]['backgroundPosition']
    header.style.background = themes[animal]['headerColor']
    header.style.color = themes[animal]['headFontColor']
    appNameDiv.style.color = themes[animal]['logoColor']
    body.style.background = themes[animal]['superBackground']
    body.style.color = themes[animal]['bodyFont']
    postDiv.style.background = themes[animal]['postsBackground']
    widgets.style.background = themes[animal]['widgetColor']
    widgets.style.boxShadow = themes[animal]['boxShadow']
    postDiv.style.boxShadow = themes[animal]['boxShadow']
    themeImage.style.boxShadow = themes[animal]['boxShadow']
    postForm.style.borderTop = themes[animal]['lineColor']
    postList.style.background = themes[animal]['poolColor']
}

loginButton.addEventListener('click', event => {
    findProfile(profileInput.value)
    profileInput.value = ''
})
function findProfile(user) {
    fetch(usersUrl)
        .then(response => response.json())
        .then(response => userIndex = response)
        .then(array => array.filter(profile => profile.name == user))
        .then(fetchProfileData)
}
function fetchProfileData(profile) {
    const id = profile[0].id
    const profileUrl = `http://localhost:3000/users/${id}`
    fetch(profileUrl)
        .then(resp => resp.json())
        .then(displayProfileData)
}
// profile is set
function displayProfileData(profile) {
    currentUser = profile
    const attributes = profile.data.attributes
    resetPage()
    setPageHeading(attributes.name)
    showProfilePicture(attributes.picture)
    showUserPosts(attributes.posts, attributes.comments)
    showUserTasks(attributes.tasks)
    changeTheme(attributes.theme)
    getFriends(profile.data.id)
}
function setPageHeading(name) {
    pageHeading.innerText = `${name.toUpperCase()}'s Page`
}
function showProfilePicture(url) {
    const urlString = `url('${url}')`
    profilePicDiv.style.backgroundImage = urlString
}
function showUserPosts(posts, comments) {
    posts.forEach(post => {
        const postComments = comments.filter(comment => comment.post_id === post.id)
        displayPost(post, postComments)
    })
}
function showUserTasks(tasks) {
    tasks.map(task => displayTask(task.content))
}
function getFriends(id) {
    const friendsUrl = `http://localhost:3000/users/${id}/friends`
    fetch(friendsUrl)
        .then(resp => resp.json())
        .then(friendArray => friendArray.map(
            friend => displayFriend(friend.name)
        ))
}

function displayFriend(name) {
    const div = document.createElement('div')
    const friend = document.createElement('p')
    const trash = document.createElement('button')
    trash.className = 'trash'
    trash.innerText = 'Trash'
    friend.innerText = name
    friend.appendChild(trash)
    div.appendChild(friend)
    friendList.appendChild(div)
}

appName.addEventListener('click', event => {
    if (currentUser == {}) {
        resetPage()
    } else {
        resetPageLite()
        loadAllComments()
    }
})
function loadAllPosts(comments) {
    fetch(postsUrl)
        .then(res => res.json())
        .then(array => array.forEach(post => {
            const postComments = comments.filter(comment => comment.post_id === post.id)
            displayPost(post, postComments)
        }))
}
function loadAllComments() {
    fetch(commentsUrl)
        .then(res => res.json())
        .then(loadAllPosts)
}

// splash/bash incrementer (optimistically rendered)
posts.addEventListener('click', event => {
    if (event.target.className == 'post-button') {
        event.target.innerText++
    }
})

userLink.addEventListener('click', event => {
    const array = [currentUser.data]
    fetchProfileData(array)
})

function styleContent(content, post) {
    if (post.anon == true) {
        content.innerText = `Anony-Moose: ${post.content}`
    } else {
        userIndex.forEach(user => {
            if (user.id == post.user_id) {
                content.innerText = `${user.name}: ${post.content}`
            }
        })
    }
}

// post styling
function styleSplashes(splashes) {
    splashes.innerText = 'Splash'
}
function styleBashes(bashes) {
    bashes.innerText = 'Bash'
}
function styleSplashButton(splashButton, post) {
    splashButton.innerText = post.splash
    splashButton.className = 'post-button'
}
function styleBashButton(bashButton, post) {
    bashButton.innerText = post.crash
    bashButton.className = 'post-button'
}