async function login(){
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
        console.log(text);
        if(text == "user logged in"){
            window.location.href = "/dashboard/user";
        } else {
            window.location.href = "/admin/dashboard/user";
        }
    })
}


