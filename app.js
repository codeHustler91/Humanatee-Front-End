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
widgets.addEventListener('click', event => {
    if (event.target.className == 'trash') {
        event.target.parentNode.remove();
    }
})

postForm.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const postItem = formData.get('postInput')
    const li = document.createElement('li')
    li.innerText = postItem
    postList.appendChild(li)
    const trash = document.createElement('button')
    trash.className = 'trash'
    trash.innerText = 'Trash'
    li.appendChild(trash)
    const splash = document.createElement('button')
    splash.className = 'splash'
    splash.innerText = 'Splash'
    li.appendChild(splash)
    const crash = document.createElement('button')
    crash.className = 'crash'
    crash.innerText = 'Crash'
    li.appendChild(crash)
    event.target.reset()
})
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
        widgetColor: 'rgb(36, 137, 170)'
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
        widgetColor: 'rgb(187, 141, 99)'
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
        widgetColor: '#5D5D81'
    }
}

themeSelect.addEventListener('change', event => {
    themeImage.style.backgroundImage = themes[event.target.value]['url']
    themeImage.style.backgroundSize = themes[event.target.value]['backgroundSize']
    themeImage.style.backgroundPosition = themes[event.target.value]['backgroundPosition']
    header.style.background = themes[event.target.value]['headerColor']
    header.style.color = themes[event.target.value]['headFontColor']
    appNameDiv.style.color = themes[event.target.value]['logoColor']
    body.style.background = themes[event.target.value]['superBackground']
    body.style.color = themes[event.target.value]['bodyFont']
    postDiv.style.background = themes[event.target.value]['postsBackground']
    widgets.style.background = themes[event.target.value]['widgetColor']
    widgets.style.boxShadow = themes[event.target.value]['boxShadow']
    postDiv.style.boxShadow = themes[event.target.value]['boxShadow']
    themeImage.style.boxShadow = themes[event.target.value]['boxShadow']
})