(async () => {
    let logs = await fetch("/gameLog")
    module.exports = logs
})
