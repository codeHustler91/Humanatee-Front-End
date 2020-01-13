//work it
const widgets = document.querySelector('#widgets')
const taskForm = document.querySelector('#taskForm')
const taskList = document.querySelector('#taskList')
const postForm = document.querySelector('#postForm')
const friendForm = document.querySelector('#friendForm')
const postList = document.querySelector('#postList')
const postDiv = document.querySelector('#posts')
const profilePicDiv = document.querySelector('#profilePicDiv')
const profileImageForm = document.querySelector('#profileImageForm')
const profileImage = document.querySelector('#profileImage')
const themeImage = document.querySelector('#themeImage')
const themeSelect = document.querySelector('#themeSelect')
const header = document.querySelector('header')
const body = document.querySelector('body')
const appNameDiv = document.querySelector('#appName')
const loginButton = document.querySelector('#loginButton')
const logCorner = document.querySelector('#logCorner')
const profileInput = document.querySelector('#profileInput')
const pageHeading = document.querySelector('#pageHeading')
const appName = document.querySelector('#appName')
const userLink = document.querySelector('#userLink')
const friendList = document.querySelector('#friendList')

const communiteePage = 'http://localhost:3000/'
const usersUrl = 'http://localhost:3000/users'
const postsUrl = 'http://localhost:3000/posts'
const tasksUrl = 'http://localhost:3000/tasks'

let userIndex = {}
let currentUser = {}

function logout() {
    currentUser = {}
    resetPage()
}

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

// adding new tasks with trash option
taskForm.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const task = formData.get('task')
    displayTask(task)
    postTask(task)
    event.target.reset()
})

friendForm.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const friend = formData.get('friend')
    displayFriend(friend)
        // postFriend(friend)
    event.target.reset()
})

// function postFriend(friend) {

// }

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
    console.log(taskObject)
    fetch(tasksUrl, {
        method: 'POST',
        body: JSON.stringify(taskObject),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// adds event delegation for trash class WIDGET
widgets.addEventListener('click', event => {
        if (event.target.className == 'trash') {
            event.target.parentNode.remove();
        }
    })
    // add new post front and back end
postForm.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const postContent = formData.get('postInput')
    let postAnon = formData.get('anon')
    if (postAnon == null) {
        postAnon = false
    } else {
        postAnon = true
    }
    const postObject = {
        user_id: currentUser.data.id,
        anon: postAnon,
        crash: 0,
        splash: 0,
        content: postContent
    }
    console.log(postObject)
    event.target.reset()
    displayPost(postObject)
    postThePost(postObject)
})

function postThePost(post) {
    fetch(postsUrl, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

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
    console.log(profile)
    const id = profile[0].id
    const profileUrl = `http://localhost:3000/users/${id}`
    fetch(profileUrl)
        .then(resp => resp.json())
        .then(displayProfileData)
}
// profile is set
function displayProfileData(profile) {
    console.log(profile)
    currentUser = profile
    const attributes = profile.data.attributes
    resetPage()
    setPageHeading(attributes.name)
    showProfilePicture(attributes.picture)
    showUserPosts(attributes.posts)
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

function showUserTasks(tasks) {
    tasks.map(task => displayTask(task.content))
}

function showUserPosts(posts) {
    posts.map(post => displayPost(post))
}

function getFriends(id) {
    const friendsUrl = `http://localhost:3000/users/${id}/friends`
    fetch(friendsUrl)
        .then(resp => resp.json())
        .then(friendArray => friendArray.map(
            friend => displayFriend(friend.name)))
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

appName.addEventListener('click', event => {
    if (currentUser == {}) {
        resetPage()
    } else {
        resetPageLite()
        loadAllPosts()
    }
})

// splash/bash incrementer
posts.addEventListener('click', event => {
    console.log(event.target)
    if (event.target.className == 'post-button') {
        event.target.innerText++
    }
})

userLink.addEventListener('click', event => {
    const array = [currentUser.data]
    fetchProfileData(array)
})

function loadAllPosts() {
    fetch(postsUrl)
        .then(res => res.json())
        .then(array => array.map(
            post => displayPost(post)))
}

// only display post front end
function displayPost(post) {
    const postCard = document.createElement('div')
    postCard.className = 'card'

    const postButtonDiv = document.createElement('div')
    postButtonDiv.className = 'post-button-div'

    // const splashForm = document.createElement('form')
    // splashForm.innerHTML = `
    // <span name='count'>0</span>
    // <input type='checkbox' name='splash' for='count'>
    // <label for='splash'>Splash</label>`
    // postButtonDiv.appendChild(splashForm)
    const content = document.createElement('p')
    styleContent(content, post)

    const splashes = document.createElement('span')
    styleSplashes(splashes)

    const bashes = document.createElement('span')
    styleBashes(bashes)

    // const comment = document.createElement('p')
    // styleComment(comment, post)

    // const input = document.createElement('input')
    // styleCommentInput(input)

    // const commentButton = document.createElement('button')
    // styleCommentButton(commentButton)

    const splashButton = document.createElement('button')
    styleSplashButton(splashButton, post)

    const bashButton = document.createElement('button')
    styleBashButton(bashButton, post)

    splashes.appendChild(splashButton)
    bashes.appendChild(bashButton)
    postButtonDiv.append(splashes, bashes)
    postCard.append(content, postButtonDiv)
    postList.appendChild(postCard)
}

function styleContent(content, post) {
    // console.log(post)
    if (post.anon == true) {
        console.log('post.anon is true!')
        content.innerText = `Anonymous Hippo: ${post.content}`
    } else {
        userIndex.forEach(user => {
            if (user.id == post.user_id) {
                content.innerText = `${user.name}: ${post.content}`
            }
        })
    }
    content.className = 'post-content'
}

function styleSplashes(splashes) {
    splashes.innerText = 'Splash'
}

function styleBashes(bashes) {
    bashes.innerText = 'Bash'
}

// function styleComment(comment, post) {
//     // comment.innerText = 'comments go here'
//     comment.className = 'comment-content'
// }

// function styleCommentInput(input) {
//     input.placeholder = 'what is your immediate unfiltered reaction?'
//     input.className = 'comment-input'
// }

// function styleCommentButton(commentButton) {
//     commentButton.innerText = 'Comment'
//     commentButton.className = 'comment-button'
// }

function styleSplashButton(splashButton, post) {
    splashButton.innerText = post.splash
    splashButton.className = 'post-button'
}

function styleBashButton(bashButton, post) {
    bashButton.innerText = post.crash
    bashButton.className = 'post-button'
}

// save damnit!