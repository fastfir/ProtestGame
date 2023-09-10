(async () => {
    const logs = await fetch("/gameLog");
    console.log(logs)
}) ();
