let embedText
let goToPageText = "Click me to copy a link that takes the user directly to this embed."
let currentLink

function processEmbed() {
    embedText = document.getElementById("inputField").value
    console.log(embedText)
    console.log(typeof(embedText))
    document.getElementById("embedArea").innerHTML = embedText

    if (embedText != null) {
        document.getElementById("copyTextArea").style.display = "block"
        document.getElementById("copyTextArea").inner
        document.getElementById("copyTextArea").onclick = function() {navigator.clipboard.writeText(window.location.href)}
    }
}

function checkQueryString() {
    embedText = new URLSearchParams(window.location.search).get("embedScript")
    console.log(embedText)
    console.log(typeof(embedText))
    document.getElementById("embedArea").innerHTML = embedText

    if (embedText != null) {
        document.getElementById("copyTextArea").style.display = "block"
        document.getElementById("copyTextArea").inner
        document.getElementById("copyTextArea").onclick = function() {navigator.clipboard.writeText(window.location.href)}
    }
}