function initialize() {
    const submitDataBtn = document.getElementById("submit-data")
    const TODOForm = document.getElementById("todoForm")
    

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

}

function addUserWall(name, email) {
    const usersList = document.getElementById("userList")
    const listItem = document.createElement("li")
    listItem.append(`${name} - ${email}`)
    usersList.appendChild(listItem)
}

initialize()