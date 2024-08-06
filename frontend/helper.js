async function helper () {
    const val= document.getElementById("yt-link").value;
    console.log(val);

    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            const res = req.response;
            console.log(res);
        }
    }

    req.open('GET', `http://localhost:3000/download?url=${val}`, true);
    req.responseType = 'json';
    req.send();

    return;
}