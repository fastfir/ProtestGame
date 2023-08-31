let loginform = document.getElementById("loginform");
let accountform = document.getElementById("accountform");
loginform.addEventListener("submit",login)
async function login(event) {
    event.preventDefault()
    let form = new FormData(loginform)
    let response = await fetch("/login", {
        method: "POST",
        body: form,
        redirect: "follow",
    })
    if (response.redirected) {
        window.location.assign("/game")
    }
    else {
        document.getElementById("loginresponse").innerHTML = await response.text();
    }
}