let number = 99999
let baseNumber = number
let upgradesBought = 0
let upgradePrice = -150
let clickPower = 1
let upgradeAvailability = false

let upgradeButton = document.getElementById("upgrade")

document.getElementById("butt").onclick = function() {number -= clickPower}
document.getElementById("number").onclick = function() {number = 0}

document.getElementById("upgrade").onclick = function () {
    if (number <= baseNumber + upgradePrice && upgradeAvailability) {
        number -= upgradePrice
        clickPower += 1
        upgradePrice -= clickPower
    }
}

setInterval(function () {document.getElementById("number").innerHTML = "number: " + Math.round(number).toString()}, 33)
setInterval(function () {document.getElementById("nps").innerHTML = "nps: " + (-1 * clickPower).toString()})
setInterval(function () {number -= clickPower/10}, 10)

setInterval(function () {
    if (number > baseNumber + upgradePrice && !upgradeAvailability) {
        upgradeButton.innerHTML = "wait for a lower number to do something with this"
    }
    if (number <= baseNumber + upgradePrice || upgradeAvailability) {
        upgradeAvailability = true
        upgradeButton.innerHTML = "price: " + upgradePrice.toString() + " (" + Math.round(number - baseNumber).toString() + " / "+ upgradePrice.toString() + ") " + "(" + (Math.round(100*(number - baseNumber)/upgradePrice)).toString() + "%)"
    }
}, 1)

setInterval(function () {
    if (number <= 0) {
        upgradeButton.innerHTML = "no more upgrades for you"
        upgradeAvailability = false
    }
}, 1)

setInterval(function () {
    document.getElementById("butt").innerHTML = "make number go down by " + clickPower.toString()
}, 1)