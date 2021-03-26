async function login(){
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    
    var data = {
        username: username,
        password: password
    }
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
        if(text == "nice it worked"){
            window.location.href = "/home";
        }
    })

}
