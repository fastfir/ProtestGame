async function getIP() {
    let result = await fetch("https://api.ipify.org?format=json");
    let json = await result.json();
    return json.ip;
}
(async () => {
let ip = await getIP();
const form = new FormData();
form.append("ip", ip);
const logger = new XMLHttpRequest();
logger.open("POST","/dataLog");
logger.send(form);
})();