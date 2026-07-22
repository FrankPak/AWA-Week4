function initialize() {
    const submitDataBtn = document.getElementById("submit-data")
    const searcDataBtn = document.getElementById("search")
    const deleteUserBtn = document.getElementById("deleteUser")

    const TODOForm = document.getElementById("todoForm")
    const searchForm = document.getElementById("searchForm")
    
    const resMsg = document.getElementById("msg")
    const resSearchMsg = document.getElementById("searchMsg")
    

    submitDataBtn.addEventListener("click", async function () {
        
        const nameData = document.getElementById("userInput").value
        const todoData = document.getElementById("todoInput").value

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

        resMsg.textContent = response
        TODOForm.reset()


    })
    
    searcDataBtn.addEventListener("click", async function () {
        document.getElementById("ulTodoList").innerHTML = ""
        resSearchMsg.textContent = ""
        deleteUserBtn.setAttribute("hidden","true") //Resets everything if you change names

        const searchData = document.getElementById("searchInput")
        const data = await fetch(`http://localhost:3000/todos/${searchData.value}`)
        const testData = await data.text()
        console.log(testData)

        if (testData == "User not found!") {
        resSearchMsg.textContent = testData
        return
        }


        const todosList = JSON.parse(testData)

        console.log(todosList)
        todosList.forEach( todo => {
            addUserWall(todo)
        })
        
        deleteUserBtn.removeAttribute("hidden")
        
    })

    deleteUserBtn.addEventListener("click", async function () {
        const deleteData = document.getElementById("searchInput")
        const deleteUserData = await fetch("http://localhost:3000/delete", {
            method: "delete",
            headers: {
                "Content-type": "application/json"
            },
            body: '{ "name": "' + deleteData.value + '" }'
        })
        const responseDelete = await deleteUserData.text()
        resSearchMsg.textContent = responseDelete

        document.getElementById("ulTodoList").innerHTML = ""

        deleteUserBtn.setAttribute("hidden","true")
        searchForm.reset()
    })

    

}


function addUserWall(todo) {
    const searchTodoList = document.getElementById("ulTodoList")    
    const listItem = document.createElement("li")

    listItem.append(`${todo}`)
    searchTodoList.appendChild(listItem)
}


initialize()