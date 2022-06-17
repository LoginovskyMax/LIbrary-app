let mainItem = document.querySelectorAll(".main_item"),
boooksItems = document.querySelectorAll(".main_item_list"),
mainDiv = document.querySelector(".main"),
booksArr = [{id:1,name:"1984",author:"J.Oruel",pages:256,items:3,popularity:0},
            {id:2,name:"Азбука",author:"AРосмен",pages:33,items:5,popularity:1},
            {id:3,name:"MАнна Каренина",author:"Л.Толстой",pages:336,items:2,popularity:2}
],
UsersArr = [{id:1,name:"Иван Иванов",phone:"8 700 2255387",popularity:0},
            {id:2,name:"Макс Максыч",phone:"8 700 3434222",popularity:0},
            {id:3,name:"Жан Жаныч",phone:"8 700 2545454",popularity:0}
],
cardsArr = [{id:1,user:"0",userName:"Lebron",book:"0",bookName:"Lion King",borrowDate:"15 - 12 - 2023",ReturnDate:""}],
bookUl = document.createElement("ul"),
userUl = document.createElement("ul"),
cardUl = document.createElement("ul"),
numberRegEx = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/

if(JSON.parse(localStorage.getItem("books"))!=undefined ){
    booksArr=JSON.parse(localStorage.getItem("books"))
}
if(JSON.parse(localStorage.getItem("users"))!=undefined ){
    UsersArr=JSON.parse(localStorage.getItem("users"))
}
if(JSON.parse(localStorage.getItem("cards"))!=undefined ){
    cardsArr=JSON.parse(localStorage.getItem("cards"))
}
//Блок функций отрисовки страниц
function PrintPageBook(book){
    let bookLi = document.createElement("li"),
    bookEdit =  document.createElement("button"),
    bookID =  document.createElement("div")
    bookID.textContent = book.id
    bookID.classList.add("id")
    bookLi.append(bookID)
    bookName =  document.createElement("div")
    bookName.textContent = book.name +"  " + book.author + "  " + book.pages+"cтр"
    bookName.classList.add("id")
    bookLi.append(bookName)
    bookItems =  document.createElement("div")
    bookItems.textContent = book.items
    bookItems.classList.add("id")
    bookLi.append(bookItems)
    bookEdit.innerHTML = "&#128221;"
    bookEdit.style.fontSize = "30px"
    bookEdit.style.padding = "0px 70px"
    bookLi.classList.add("main_item_li")
    bookLi.append(bookEdit)
    bookUl.append(bookLi)
    mainItem[0].append(bookUl)
    bookEdit.addEventListener('click',function(){
        let editDiv = document.createElement("div"),
        inputName = document.createElement("input"),
        inputAuthor = document.createElement("input"),
        inputPage = document.createElement("input"),
        inputItems = document.createElement("input"),
        saveBtn = document.createElement("button"),
        deleteBtn = document.createElement("button"),
        closeBtn = document.createElement("button")
        closeBtn.classList.add("close_btn")
        closeBtn.textContent = "X"
        closeBtn.addEventListener("click",()=>{
            editDiv.remove()
        })
        editDiv.append(closeBtn)
        saveBtn.textContent = "Сохранить"
        deleteBtn.textContent = "Удалить"
        inputName.value = book.name
        inputAuthor.value = book.author
        inputPage.value = book.pages
        inputItems.value = book.items
        editDiv.classList.add("modal_window")
        mainDiv.append(editDiv)
        editDiv.append(inputName)
        editDiv.append(inputAuthor)
        editDiv.append(inputPage)
        editDiv.append(inputItems)
        editDiv.append(saveBtn)
        editDiv.append(deleteBtn)
        editDiv.append(closeBtn)
        saveBtn.addEventListener("click",function(){
            if( inputName.value!=""&&inputAuthor.value!=""&& inputPage.value!=""&&inputItems.value!=""){
                book.name =  inputName.value
                book.author =   inputAuthor.value
                book.pages = inputPage.value
                book.items =  inputItems.value
                localStorage.setItem("books",JSON.stringify(booksArr))
                editDiv.remove()
                bookUl.innerHTML = "";
                booksArr.forEach(book=>{ PrintPageBook(book)})
            }else{
                let mistake = document.createElement("div")
                mistake.textContent = "Заполните все поля"
                editDiv.append(mistake)
                setTimeout(function(){mistake.remove()},500)
            }
        })
        deleteBtn.addEventListener("click",function(){
         booksArr.splice(booksArr.indexOf(book),1)
         localStorage.setItem("books",JSON.stringify(booksArr))
         editDiv.remove()
         bookUl.innerHTML = "";
        booksArr.forEach(book=>{ PrintPageBook(book)})
        })
    })
}

function PrintPageUser(user){
    let userLi = document.createElement("li"),
    userEdit =  document.createElement("button"),
    userID =  document.createElement("div")
    userID.textContent = user.id
    userID.classList.add("id")
    userLi.append(userID)
    let userName =  document.createElement("div")
    userName.textContent = user.name
    userName.classList.add("id")
    userLi.append(userName)
    userItems =  document.createElement("div")
    userItems.textContent = user.phone
    userItems.classList.add("id")
    userLi.append(userItems)
    userEdit.innerHTML = "&#128221;"
    userEdit.style.fontSize = "30px"
    userEdit.style.padding = "0px 70px"
    userLi.classList.add("main_item_li")
    userLi.append(userEdit)
    userUl.append(userLi)
    mainItem[1].append(userUl)
    userEdit.addEventListener('click',function(){
        let editDiv = document.createElement("div"),
        inputName = document.createElement("input"),
        inputAuthor = document.createElement("input"),
        saveBtn = document.createElement("button"),
        deleteBtn = document.createElement("button")
        saveBtn.textContent = "Сохранить"
        deleteBtn.textContent = "Удалить"
        closeBtn = document.createElement("button")
        closeBtn.classList.add("close_btn")
        closeBtn.textContent = "X"
        closeBtn.addEventListener("click",()=>{
            editDiv.remove()
        })
        editDiv.append(closeBtn)
        inputName.value = user.name
        inputAuthor.value = user.phone
        editDiv.classList.add("modal_window")
        mainDiv.append(editDiv)
        editDiv.append(inputName)
        editDiv.append(inputAuthor)
        editDiv.append(saveBtn)
        editDiv.append(deleteBtn)
        saveBtn.addEventListener("click",function(){
            if(inputName.value!=""&&inputAuthor.value!=""){
                user.name =  inputName.value
                user.phone =   inputAuthor.value
                localStorage.setItem("users",JSON.stringify(UsersArr))
                editDiv.remove()
                userUl.innerHTML = "";
                UsersArr.forEach(user=>{ PrintPageUser(user)})
            }else{
                let mistake = document.createElement("div")
                mistake.textContent = "Заполните все поля"
                editDiv.append(mistake)
                setTimeout(function(){mistake.remove()},500)
            }
        })
        deleteBtn.addEventListener("click",function(){
         UsersArr.splice(UsersArr.indexOf(user),1)
         localStorage.setItem("users",JSON.stringify(UsersArr))
         editDiv.remove()
         userUl.innerHTML = "";
         UsersArr.forEach(user=>{ PrintPageUser(user)})
        })
    })
}
function PrintPageCards(card){
    let cardLi = document.createElement("li"),
    cardEdit =  document.createElement("button"),
    cardID =  document.createElement("div")
    cardID.textContent = card.id
    cardID.classList.add("id")
    cardLi.append(cardID)
    cardName =  document.createElement("div")
    cardName.textContent = card.userName +"  " + card.bookName
    cardName.classList.add("id")
    cardLi.append(cardName)
    cardItems =  document.createElement("div")
    cardItems.textContent = card.borrowDate
    cardItems.classList.add("id")
    cardLi.append(cardItems)
    if(card.ReturnDate!=""){
        let ReturnDate = document.createElement("div")
        ReturnDate.textContent =  card.ReturnDate
        cardLi.append(ReturnDate)
    }else{
        cardEdit.innerHTML = "Вернули"
        cardEdit.style.padding = "0px 70px"
        cardLi.append(cardEdit)
    }
    cardLi.classList.add("main_item_li")
    cardUl.append(cardLi)
    mainItem[2].append(cardUl)
    cardEdit.addEventListener('click',function(){
        let ReturnDate = document.createElement("div"),
        date = new Date
        booksArr.forEach(book=>{
            if(card.book == book.id){
              book.items++
              localStorage.setItem("books",JSON.stringify(booksArr))
            }
        })
        card.ReturnDate = date.getDate()+" - " +(date.getMonth()+1) + " - " + date.getFullYear()
        ReturnDate.textContent =  card.ReturnDate
        cardLi.append(ReturnDate)
        localStorage.setItem("cards",JSON.stringify(cardsArr))
        cardEdit.remove()
    })
}
booksArr.forEach(book=>{PrintPageBook(book)})
UsersArr.forEach(user=>{PrintPageUser(user)})
cardsArr.forEach(card=>PrintPageCards(card))
//Блок поисковых инпутов
let searchInp = document.querySelector("#search"),
hintDiv = document.querySelector(".hint")
searchInp.addEventListener("input", function () {
    hintDiv.innerHTML = "";
    bookUl.innerHTML = "";
    for (let book of booksArr) {
        let bookLC = book.name.toLowerCase();
        let value = searchInp.value.toLowerCase();
        if (bookLC.startsWith(value)) {
            hintDiv.insertAdjacentHTML("beforeend",
               `<div class="books hinter">${book.name}</div>`
            )
            PrintPageBook(book)
        }
    }
    let divs = document.querySelectorAll(".books");
    for (let div of divs) {
        div.addEventListener("click", function () {
            searchInp.value = div.textContent;
            hintDiv.innerHTML = "";
            bookUl.innerHTML = "";
            booksArr.forEach(book=>{
                if(book.name== div.textContent){
                    PrintPageBook(book)
                }
            })
        })
    }
})

let searchInpUsers = document.querySelector("#search_users"),
hintDivUsers = document.querySelector(".hint_users")
searchInpUsers.addEventListener("input", function () {
    hintDivUsers.innerHTML = "";
    userUl.innerHTML = "";
    for (let user of UsersArr) {
        let userLC = user.name.toLowerCase();
        let valueLC = searchInpUsers.value.toLowerCase();
        if (userLC.startsWith(valueLC)) {
            hintDivUsers.insertAdjacentHTML("beforeend",
               `<div class="users_div hinter">${user.name}</div>` 
            )
            PrintPageUser(user)
        }
    }
    let divs = document.querySelectorAll(".users_div");
    for (let div of divs){
        div.addEventListener("click", function () {
            searchInpUsers.value = div.textContent;
            hintDivUsers.innerHTML = "";
            userUl.innerHTML = "";
            UsersArr.forEach(user=>{
                if(user.name == div.textContent){
                    PrintPageUser(user)
                }
            })
        })
    }
})

let searchInpCards = document.querySelector("#search_cards"),
hintDivCards = document.querySelector(".hint_cards")
searchInpCards.addEventListener("input", function () {
    hintDivCards.innerHTML = "";
    cardUl.innerHTML = "";
    for (let card of cardsArr) {
        let userLC = card.userName.toLowerCase();
        let valueLC = searchInpCards.value.toLowerCase();
        if (userLC.startsWith(valueLC)){
            hintDivCards.insertAdjacentHTML("beforeend",
               `<div class="cards_div hinter">${card.userName}</div>` 
            )
            PrintPageCards(card)
        }
    }
    let divs = document.querySelectorAll(".cards_div");
    for (let div of divs){
        div.addEventListener("click", function () {
            searchInpCards.value = div.textContent;
            hintDivCards.innerHTML = "";
            cardUl.innerHTML = "";
            cardsArr.forEach(card=>{
                if(card.userName == div.textContent){
                    PrintPageCards(card)
                }
            })
        })
    }
})
searchInp.addEventListener("blur",()=>{
    setTimeout( hintDiv.innerHTML = "",1000)
})
searchInpUsers.addEventListener("blur",()=>{
    setTimeout(  hintDivUsers.innerHTML = "",1000)
})
searchInpCards.addEventListener("blur",()=>{
    setTimeout( hintDivCards.innerHTML = "",1000) 
})
//Блок создания нового
let createBookBtn = document.querySelector("#create_book")
createBookBtn.addEventListener("click",function(){
    let editDiv = document.createElement("div"),
    inputName = document.createElement("input"),
    inputAuthor = document.createElement("input"),
    inputPage = document.createElement("input"),
    inputItems = document.createElement("input"),
    saveBtn = document.createElement("button"),
    deleteBtn = document.createElement("button")
    closeBtn = document.createElement("button")
    closeBtn.classList.add("close_btn")
    closeBtn.textContent = "X"
    closeBtn.addEventListener("click",()=>{
        editDiv.remove()
    })
    editDiv.append(closeBtn)
    inputPage.type = "number"
    inputItems.type = "number"
    saveBtn.textContent = "Сохранить"
    deleteBtn.textContent = "Удалить"
    editDiv.classList.add("modal_window")
    inputName.placeholder = "Название книги"
    inputAuthor.placeholder = "Имя автора"
    inputPage.placeholder = "Количество страниц"
    inputItems.placeholder = "Количество экземпляров"
    mainDiv.append(editDiv)
    editDiv.append(inputName)
    editDiv.append(inputAuthor)
    editDiv.append(inputPage)
    editDiv.append(inputItems)
    editDiv.append(saveBtn)
    editDiv.append(deleteBtn)
    inputPage.addEventListener("input",()=>{
        if(inputPage.value<=0){
            let mistake = document.createElement("div")
            mistake.textContent = "Введите положительное число"
            inputPage.value = ""
            editDiv.append(mistake)
            setTimeout(function(){mistake.remove()},1000)
        }
    })
    inputItems.addEventListener("input",()=>{
        if(inputItems.value<=0){
            let mistake = document.createElement("div")
            mistake.textContent = "Введите положительное число"
            inputItems.value = ""
            editDiv.append(mistake)
            setTimeout(function(){mistake.remove()},1000)
        }
    })
    saveBtn.addEventListener("click",function(){
        if( inputName.value!=""&&inputAuthor.value!=""&& inputPage.value!=""&&inputItems.value!=""){
            let bookObj = {}
            bookObj.id = booksArr.length+1
            bookObj.name =  inputName.value
            bookObj.author =   inputAuthor.value
            bookObj.pages = inputPage.value
            bookObj.items =  inputItems.value
            booksArr.push(bookObj)
            localStorage.setItem("books",JSON.stringify(booksArr))
            editDiv.remove()
            bookUl.innerHTML = "";
            booksArr.forEach(book=>{ PrintPageBook(book)})
            console.log(booksArr)
        }else{
            let mistake = document.createElement("div")
            mistake.textContent = "Заполните все поля"
            editDiv.append(mistake)
            setTimeout(function(){mistake.remove()},500)
        }
    
    })
})
let createUserBtn = document.querySelector("#create_user")
createUserBtn.addEventListener("click",function(){
    let editDiv = document.createElement("div"),
    inputName = document.createElement("input"),
    inputAuthor = document.createElement("input"),
    saveBtn = document.createElement("button"),
    deleteBtn = document.createElement("button")
    saveBtn.textContent = "Сохранить"
    deleteBtn.textContent = "Удалить"
    editDiv.classList.add("modal_window")
    inputName.placeholder = "Имя и Фамилия через пробел"
    inputAuthor.placeholder = "Номер телефона"
    inputAuthor.type = "number"
    mainDiv.append(editDiv)
    editDiv.append(inputName)
    editDiv.append(inputAuthor)
    editDiv.append(saveBtn)
    editDiv.append(deleteBtn)
    closeBtn = document.createElement("button")
    closeBtn.classList.add("close_btn")
    closeBtn.textContent = "X"
    closeBtn.addEventListener("click",()=>{
        editDiv.remove()
    })
    editDiv.append(closeBtn)
    saveBtn.addEventListener("click",function(){
        if( inputName.value!=""&&inputAuthor.value!=""){
            if(numberRegEx.test(inputAuthor.value)){
                let bookObj = {}
                bookObj.id = UsersArr.length+1
                bookObj.name =  inputName.value
                bookObj.phone =   inputAuthor.value
                bookObj.popularity = 0
                UsersArr.push(bookObj)
                localStorage.setItem("users",JSON.stringify(UsersArr))
                editDiv.remove()
                userUl.innerHTML = "";
                UsersArr.forEach(user=>{ PrintPageUser(user)})
            }else{
                let mistake = document.createElement("div")
                mistake.textContent = "Введите верный номер телефона"
                editDiv.append(mistake)
                setTimeout(function(){mistake.remove()},500)
            }
        }else{
            let mistake = document.createElement("div")
            mistake.textContent = "Заполните все поля"
            editDiv.append(mistake)
            setTimeout(function(){mistake.remove()},500)
        }
    
    })
})
let createCardBtn = document.querySelector("#create_card")
createCardBtn.addEventListener("click",function(){
    let editDiv = document.createElement("div"),
    usersList = document.createElement("div"),
    booksList = document.createElement("div"),
    saveBtn = document.createElement("button"),
    deleteBtn = document.createElement("button"),
    date = new Date
    cardObj = {}
    cardObj.id = cardsArr.length+1
    if(date.getMonth()<9){
        cardObj.borrowDate = date.getDate()+" - 0" +(date.getMonth()+1) + " - " + date.getFullYear()
    }else{
        cardObj.borrowDate = date.getDate()+" - " +(date.getMonth()+1) + " - " + date.getFullYear()
    }
    cardObj.ReturnDate = ""
    saveBtn.textContent = "Сохранить"
    deleteBtn.textContent = "Удалить"
    closeBtn = document.createElement("button")
    closeBtn.classList.add("close_btn")
    closeBtn.textContent = "X"
    closeBtn.addEventListener("click",()=>{
        editDiv.remove()
    })
    editDiv.append(closeBtn)
    editDiv.classList.add("modal_window")
    usersList.textContent = "Список пользователей"
    booksList.textContent = "Список Книг"
    let button = document.createElement("button"),
    button2 = document.createElement("button"),
    usersList1 = document.createElement("div"),
    booksList1 = document.createElement("div"),
    check2 = false
    check = false
    button.innerHTML = "&#129155;"
    button2.innerHTML = "&#129155;"
    usersList.append(button)
    booksArr.forEach(book=>{
        let bookDiv = document.createElement("div")
        bookDiv.classList.add("booklist_style")
        bookDiv.textContent = book.name + " " + book.author
        booksList1.append(bookDiv)
        bookDiv.addEventListener("click",()=>{
            if(book.items==0){
                let mistake = document.createElement("div")
                mistake.textContent = "Извините книги нет в наличии"
                editDiv.append(mistake)
                setTimeout(function(){mistake.remove()},500)
            }else{
                cardObj.book = book.id
                cardObj.bookName = book.name
                book.items--
                book.popularity++
                booksList1.style.height = "0px"
                button2.innerHTML = "&#129155;"
                check2 = false
                localStorage.setItem("cards",JSON.stringify(cardsArr))
                localStorage.setItem("books",JSON.stringify(booksArr))
            }
        })
    })
    UsersArr.forEach(user=>{
        let userDiv = document.createElement("div")
        userDiv.classList.add("booklist_style")
        userDiv.textContent = user.name
        usersList1.append(userDiv)
        userDiv.addEventListener("click",()=>{
            cardObj.user = user.id
            cardObj.userName = user.name
            user.popularity++
            usersList1.style.height = "0px"
            button.innerHTML = "&#129155;"
            check = false
            localStorage.setItem("cards",JSON.stringify(cardsArr))
            localStorage.setItem("users",JSON.stringify(UsersArr))
        })
    })
    mainDiv.append(editDiv)
    editDiv.append(usersList)
    editDiv.append(usersList1)
    editDiv.append(booksList)
    editDiv.append(booksList1)
    editDiv.append(saveBtn)
    booksList.append(button2)
    usersList1.classList.add("userlist_text")
    booksList1.classList.add("userlist_text")
    button.addEventListener("click",()=>{
        check=!check
        if(check){
            usersList1.style.height = "auto"
            button.innerHTML = "&#129153;"
        }else{
            usersList1.style.height = "0px"
            button.innerHTML = "&#129155;"
        }})
     button2.addEventListener("click",()=>{
            check2=!check2
            if(check2){
                booksList1.style.height = "auto"
                button2.innerHTML = "&#129153;"
            }else{
                booksList1.style.height = "0px"
                button2.innerHTML = "&#129155;"
            }})
    saveBtn.addEventListener("click",function(){
            cardsArr.push(cardObj)
            localStorage.setItem("cards",JSON.stringify(cardsArr))
            editDiv.remove()
            cardUl.innerHTML = "";
            cardsArr.forEach(card=>{ PrintPageCards(card)})
    })
})
//блок кнопок показать всех
let showCards = document.querySelector("#show_cards")
showCards.addEventListener("click",()=>{
    cardUl.innerHTML = "";
    cardsArr.forEach(card=>{PrintPageCards(card)})
})
let showBooks = document.querySelector("#show_books")
showBooks.addEventListener("click",()=>{
    bookUl.innerHTML = "";
    booksArr.forEach(book=>{PrintPageBook(book)})
})
let showUsers = document.querySelector("#show_users")
showUsers.addEventListener("click",()=>{
    userUl.innerHTML = "";
    UsersArr.forEach(user=>{PrintPageUser(user)})
})
//блок отрисовки и сортировки 4й страницы
let popBooks = document.querySelector(".popular_books"),
popUsers = document.querySelector(".popular_users")
function printPopular(array,htmlElement){
    let copyBooksArr = [...array],
    countOfDiv = 0
    for(let book of  copyBooksArr.sort(function(a,b){return b.popularity - a.popularity})){
        countOfDiv++
        let newPop = document.createElement("div")
        if(book.author!=undefined){ newPop.textContent = book.name + ' ' + book.author}
        else{newPop.textContent = book.name + ' ' + book.phone}
        htmlElement.append(newPop)
        if(countOfDiv==5){
            break
        }
    }
}
printPopular(booksArr,popBooks)
printPopular(UsersArr,popUsers)
//блок сортировки
let sortBook = document.querySelector("#sort")
sortBook.addEventListener("change",()=>{
if(sortBook.value==2){
    bookUl.innerHTML = "";
    let copyBooksArr = [...booksArr]
    copyBooksArr.sort(function(a,b){return a.pages - b.pages}).forEach(book=>{PrintPageBook(book)})
}
if(sortBook.value==3){
    bookUl.innerHTML = "";
    let copyBooksArr = [...booksArr]
    copyBooksArr.sort(function(a,b){
       let x = a.author.toLowerCase()
       let y = b.author.toLowerCase()
       if(x > y){return 1}
       if(x < y){return -1}
        return 0 
    }).forEach(book=>{PrintPageBook(book)})
}
if(sortBook.value==4){
    bookUl.innerHTML = "";
    let copyBooksArr = [...booksArr]
    copyBooksArr.sort(function(a,b){
       let x = a.name.toLowerCase()
       let y = b.name.toLowerCase()
       if(x < y){return 1}
       if(x > y){return -1}
        return 0 
    }).forEach(book=>{PrintPageBook(book)})
}
})

let sortUser = document.querySelector("#sort_user")
sortUser.addEventListener("change",()=>{
if(sortUser.value==1){
    userUl.innerHTML = "";
    let copyBooksArr = [...UsersArr]
    copyBooksArr.reverse().forEach(book=>{PrintPageUser(book)})
}
if(sortUser.value==2){
    userUl.innerHTML = "";
    let copyBooksArr = [...UsersArr]
    copyBooksArr.sort(function(a,b){
       let x = a.name.toLowerCase()
       let y = b.name.toLowerCase()
       if(x < y){return 1}
       if(x > y){return -1}
        return 0 
    }).forEach(book=>{PrintPageUser(book)})
}
})

let sortCard = document.querySelector("#sort_card")
sortCard.addEventListener("change",()=>{
if(sortCard.value==2){
    cardUl.innerHTML = "";
    let copyBooksArr = [...cardsArr]
    copyBooksArr.sort(function(a,b){
       let x = a.userName.toLowerCase()
       let y = b.userName.toLowerCase()
       if(x > y){return 1}
       if(x < y){return -1}
        return 0 
    }).forEach(book=>{PrintPageCards(book)})
}
if(sortCard.value==4){
    cardUl.innerHTML = "";
    let copyBooksArr = [...cardsArr]
    copyBooksArr.sort(function(a,b){
        let x = a.borrowDate.toLowerCase()
        let y = b.borrowDate.toLowerCase()
        if(x < y){return 1}
        if(x > y){return -1}
        return 0 
     }).forEach(book=>{PrintPageCards(book)})
 }
if(sortCard.value==3){
    cardUl.innerHTML = "";
    let copyBooksArr = [...cardsArr]
    copyBooksArr.sort(function(a,b){
       let x = a.bookName.toLowerCase()
       let y = b.bookName.toLowerCase()
       if(x < y){return 1}
       if(x > y){return -1}
        return 0 
    }).forEach(book=>{PrintPageCards(book)})
}
})
//функция открывающихся тапов
function Tape(tape){
    let tapeDiv = document.querySelectorAll(tape)
    mainItem[0].style.display = "block"
    tapeDiv.forEach(item=>{
        item.addEventListener("click",()=>{
            mainItem.forEach(item1=>{
                item1.style.display = "none"
                if(item.getAttribute("data-id")==item1.getAttribute("data-id")){
                    item1.style.display = "block"
                }
            }) 
        })
    })
}
Tape(".header_item")





    
    