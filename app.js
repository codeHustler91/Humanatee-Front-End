//work it
const widgets = document.querySelector('#widgets')
const toDoForm = document.querySelector('#toDoForm')
const toDoList = document.querySelector('#toDoList')
const postForm = document.querySelector('#postForm')
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

let currentUser = {}

// adding new tasks with trash option
toDoForm.addEventListener('submit', event => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const listItem = formData.get('todo')
        const li = document.createElement('li')
        li.innerText = listItem
        toDoList.appendChild(li)
        const trash = document.createElement('button')
        trash.className = 'trash'
        trash.innerText = 'Trash'
        li.appendChild(trash)
        event.target.reset()
    })
    // adds event delegation for trash class WIDGET
widgets.addEventListener('click', event => {
        if (event.target.className == 'trash') {
            event.target.parentNode.remove();
        }
    })
    // add new post front end
postForm.addEventListener('submit', event => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const postItem = formData.get('postInput')
        const p = document.createElement('p')
        p.innerText = postItem
        postList.appendChild(p)
        const trash = document.createElement('button')
        trash.className = 'trash'
        trash.innerText = 'Trash'
        p.appendChild(trash)
        const splash = document.createElement('button')
        splash.className = 'splash'
        splash.innerText = 'Splash'
        p.appendChild(splash)
        const bash = document.createElement('button')
        bash.className = 'bash'
        bash.innerText = 'Bash'
        p.appendChild(bash)
        event.target.reset()
    })
    // add event delegation for trash buttons
postDiv.addEventListener('click', event => {
    if (event.target.className == 'trash') {
        event.target.parentNode.remove();
    }
})

const themes = {
    manatee: {
        url: "url('https://timedotcom.files.wordpress.com/2017/03/manatee-endangered-species.jpeg')",
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
        lineColor: '3px solid rgb(36, 137, 170)'
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
        lineColor: '3px solid rgb(187, 141, 99)'

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
        lineColor: '3px solid #5D5D81'
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

function displayProfileData(profile) {
    currentUser = profile
    console.log(currentUser)
    const attributes = profile.data.attributes
    setPageHeading(attributes.name)
    showProfilePicture(attributes.picture)
    showUserPosts(profile.posts)
    showUserTasks(profile.tasks)
    changeTheme(attributes.theme)
    showFriends(profile.data.id)
}

function setPageHeading(name) {
    pageHeading.innerText = `${name.toUpperCase()}'s Page`
}

function showProfilePicture(url) {
    const urlString = `url('${url}')`
    profilePicDiv.style.backgroundImage = urlString
}

function showUserTasks(tasks) {

}

function showUserPosts(posts) {

}

function showFriends(id) {
    const friendsUrl = `http://localhost:3000/users/${id}/friends`
    fetch(friendsUrl)
        .then(resp => resp.json())
        .then(friendArray => friendArray.map(
            friend => displayFriends(friend.name)))
}

function displayFriends(name) {
    const div = document.createElement('div')
    const friend = document.createElement('p')
    friend.innerText = name.toUpperCase
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
}

appName.addEventListener('click', event => {
    changeTheme('manatee')
    loadAllPosts()
})
userLink.addEventListener('click', event => {
    loadUserProfile(currentUser)
})

loadAllPosts()

function loadAllPosts() {
    fetch(postsUrl)
        .then(res => res.json())
        .then(array => array.map(
            post => displayPosts(post)))
}

function displayPosts(post) {
    const postCard = document.createElement('div')
    postCard.className = 'card'

    const postButtonDiv = document.createElement('div')
    postButtonDiv.className = 'post-button-div'

    const content = document.createElement('p')
    styleContent(content, post)

    const splashes = document.createElement('span')
    styleSplashes(splashes, post)

    const bashes = document.createElement('span')
    styleBashes(bashes, post)

    const comment = document.createElement('p')
    styleComment(comment, post)

    const input = document.createElement('input')
    styleCommentInput(input)

    const commentButton = document.createElement('button')
    styleCommentButton(commentButton)

    const splashButton = document.createElement('button')
    styleSplashButton(splashButton)

    const bashButton = document.createElement('button')
    styleBashButton(bashButton)

    splashes.appendChild(splashButton)
    bashes.appendChild(bashButton)
    postButtonDiv.append(splashes, bashes)
    postCard.append(content, comment, commentButton, postButtonDiv, input)
    postList.appendChild(postCard)
}

function styleContent(content, post) {
    content.innerText = post.content
    content.className = 'post-content'
}

function styleSplashes(splashes, post) {
    splashes.innerText = post.splash
    splashes.className = 'post-button'
}

function styleBashes(bashes, post) {
    bashes.innerText = post.crash
    bashes.className = 'post-button'
}

function styleComment(comment, post) {
    comment.innerText = 'comments go here'
    comment.className = 'comment-content'
}

function styleCommentInput(input) {
    input.placeholder = 'what is your immediate unfiltered reaction?'
    input.className = 'comment-input'
}

function styleCommentButton(commentButton) {
    commentButton.innerText = 'Comment'
    commentButton.className = 'comment-button'
}

function styleSplashButton(splashButton) {
    splashButton.innerText = 'Splash'
    splashButton.className = 'post-button'
}

function styleBashButton(bashButton) {
    bashButton.innerText = 'Bash'
    bashButton.className = 'post-button'
}

loadTasks()

function loadTasks() {
    fetch(tasksUrl)
        .then(res => res.json())
        .then(array => array.map(
            task => displayTasks(task)))
}

function displayTasks(task) {
    const div = document.createElement('div')
    const content = document.createElement('p')
    content.innerText = task.content
    div.appendChild(content)
    toDoList.appendChild(div)
}