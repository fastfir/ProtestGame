let loginform = document.getElementById("loginform");
let accountform = document.getElementById("accountform");
loginform.addEventListener("submit",login)
accountform.addEventListener("submit",createaccount)
async function login(event) {
    event.preventDefault();
    let form = new FormData(loginform);
    let response = await fetch("/login", {
        method: "POST",
        body: form,
        redirect: "follow",
    });
    if (response.redirected) {
        window.location.assign("/game");
    }
    else {
        document.getElementById("loginresponse").innerHTML = await response.text();
    }
}   
async function createaccount(event) {
    event.preventDefault();
    let form = new FormData(accountform);
    let response = await fetch("/createacct", {
        method: "POST",
        body: form,
        redirect: "follow",
    });
    document.getElementById("accountresponse").innerHTML = await response.text();
}