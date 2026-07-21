function initialize() {
    const submitDataBtn = document.getElementById("submit-data")
    const TODOForm = document.getElementById("todoForm")
    const searchForm = document.getElementById("searchForm")
    const searcDataBtn = document.getElementById("search")
    const resSearchMsg = document.getElementById("searchMsg")

    submitDataBtn.addEventListener("click", async function () {
        
        const nameData = document.getElementById("userInput").value
        const todoData = document.getElementById("todoInput").value
        const resMsg = document.getElementById("msg")

        console.log(nameData + " front")
        console.log(todoData + " front")
        
        const userData = await fetch("http://localhost:3000/add", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: '{ "name": "' + nameData + '", "todo": "' + todoData + '"  }'
        })
        const response = await userData.text()
        console.log(response)
        TODOForm.reset()
        resMsg.textContent = response


    })

    searcDataBtn.addEventListener("click", async function () {
        const searchData = document.getElementById("searchInput")
        const data = await fetch(`http://localhost:3000/todos/${searchData.value}`)
        searchForm.reset()

        if (data.status == 404) {
        resSearchMsg.textContent = await data.text()
        return
        }
        resSearchMsg.textContent = ""
        let todosList = await data.json()
        console.log(todosList)
        todosList.forEach( todo => {
            addUserWall(todo)
        })
       
    })

    

}


function addUserWall(todo) {
    const searchTodoList = document.getElementById("ulTodoList")    
    const listItem = document.createElement("li")

    listItem.append(`${todo}`)
    searchTodoList.appendChild(listItem)
}


initialize()