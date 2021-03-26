async function old(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    var data = {
        username: username,
        password: password
    }

    console.log(data)
    var url = "/api/user/login"


    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(text => {
        console.log(text)
    })
}

function login(){
    alert("i am working now")
}