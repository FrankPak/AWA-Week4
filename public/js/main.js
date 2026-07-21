function initialize() {
    const submitFormBtn = document.getElementById("btnSubmit")
    const submitForm = document.getElementById("userForm")
    const getUsersBtn = document.getElementById("getUsers")

    submitFormBtn.addEventListener("click", async function () {
        
        const nameInput = document.getElementById("name")
        const emailInput = document.getElementById("email")
        //console.log(nameInput.value)
       // console.log(emailInput.value)
        
        const userData = await fetch("http://localhost:3000/users", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: '{ "name": "' + nameInput.value + '", "email": "' + emailInput.value + '"  }'
        })
        
        submitForm.reset()
        //const userJson = await userData.json()
        //console.log(userJson)

    })

    getUsersBtn.addEventListener("click", async function () {
        const getUserResult = await fetch("http://localhost:3000/users")
        const getUserJson = await getUserResult.json()
        console.log(getUserJson)

        getUserJson.users.forEach(user => {
            addUserWall(user.name, user.email)
        })
    })
}

function addUserWall(name, email) {
    const usersList = document.getElementById("userList")
    const listItem = document.createElement("li")
    listItem.append(`${name} - ${email}`)
    usersList.appendChild(listItem)
}

initialize()