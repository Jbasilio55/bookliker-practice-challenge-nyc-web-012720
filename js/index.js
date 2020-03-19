const BaseUrl = "http://localhost:3000"
const usersUrl = `${BaseUrl}/users`
const booksUrl = `${BaseUrl}/books`

const listPanel = document.getElementById("list")
const getPanel = document.getElementById('show-panel')

const body = document.getElementsByTagName('body')[0]
const button = document.createElement("button")
button.setAttribute('id', 'create')


document.addEventListener("DOMContentLoaded", () => {
    addBookButton()
    getBooks()
});

    listPanel.addEventListener('click', event => {
    if(event.target.tagName === "LI"){
        Booksolo(event)
        }
    })

    getPanel.addEventListener('click', event => {
        if(event.target.innerText === "x"){
            event.target.parentNode.remove()
            deleteBook(event.target.dataset.id)
        }else {
            increaseLikes(event)
        }
    })

    const increaseLikes = click => {
        let likeDiv = document.getElementById('like')
        let likes = parseInt(likeDiv.innerText)
        likes++


        likeDiv.innerText = likes

        let id = button.parentNode.dataset.id

        updateLikes(id, likes)
    }

    const deleteBook = userId => {
        fetch(`${usersUrl}/${userId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(console.log)
    }
    
    body.addEventListener('click', event =>{
        if(event.target.innerText === "Add Book"){
            displayForm(event)
        }
    })

    body.addEventListener('submit', event => {
        if(event.target === "submit"){
            event.target.preventDefault()
            let title = event.target.title.value
            let imageUrl = event.target.imageUrl.value
            let year = event.target.description.value
            let like = 0

            let book = {title, imageUrl, description, like}

            addBook(book)

            document.listPanel.replaceChild(button, event.target)
        }
    })

    const addBook = book => {
        fetch(BaseUrl, {
            method: 'POST', 
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(book)
        })
        .then(response => response.json())
        .then(book => {
            renderBooks(book)
        })
    }

    const displayForm = click => {
        let form = document.createElement('form')
        let button = document.getElementById('create')
        form.innerHTML = `
        <label>Title:</label>
        <input type="text" name="title"><br>
        <label>Img Url:</label>
        <input type="text" name="img url"><br>
        <label>Description:</label>
        <input type="text" name="description"><br>
        <input type="submit" value="Submit">
        `
        listPanel.replaceChild(form, button)
    }
    
    const addBookButton = () => {
        listPanel.prepend(button)
        let createButton = document.getElementById('create')

        createButton.innerText = `Add Book`
    }

    const getBooks = () => {
        fetch(booksUrl)
        .then(response => response.json())
        .then(books => {
            renderBooks(books)
        })
    }
    
    const renderBooks = books => {
        books.forEach(renderBook)
    }
    
    const renderBook = book => {
        listPanel.innerHTML += `
        <li id=${book.id}>${book.title}</li>
        `
    }

    const Booksolo = click => {
        fetch(`${booksUrl}/${event.target.id}`)
        .then(response => response.json())
        .then(book => {
            showPanel(book)
        })
    }

    const showPanel = book => {
        let showPanel = document.getElementById('show-panel')

        showPanel.innerHTML = `
        <h1>${book.title}</h1>
        <img src=${book.img_url} alt="${book.title}">
        <p>${book.description}</p>
        <div id="user"></div>
        <div id ="like">0 <button type="button">Likes</button></button>
        `
        book.users.forEach(user => {
            renderUsers(user)
        })
    }

    const renderUsers = user => {
        let userTag = document.getElementById('user')

        userTag.innerHTML += `
        <h3>${user.username} <button type="button" data-id=${user.id}>x</button></h3>
        `
    }

    