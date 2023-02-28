let number = 100000
let baseNumber = number
let upgradesBought = 0
let upgradePrice = -20
let clickPower = 1
let upgradeAvailability = false
let unbalanceAvailability = false

let upgradeButton = document.getElementById("upgrade")
let unbalanceButton = document.getElementById("unbalance")

document.getElementById("butt").onclick = function() {number -= clickPower}
document.getElementById("number").onclick = function() {number = 0}

document.getElementById("upgrade").onclick = function () {
    if (number <= baseNumber + upgradePrice && upgradeAvailability) {
        number -= upgradePrice
        clickPower += 1
        upgradePrice -= clickPower
    }
}

setInterval(function () {
    document.getElementById("number").innerHTML = "number: " + Math.ceil(number).toString() + " / " + baseNumber.toString()}, 1)
setInterval(function () {document.getElementById("nps").innerHTML = "nps: " + (-1 * clickPower).toString()})
setInterval(function () {
    if (number > 0) {
        number -= clickPower
    }
}, 1000)

setInterval(function () {
    if (number > baseNumber + upgradePrice && !upgradeAvailability) { // if i cant afford it and cant see it
        upgradeButton.innerHTML = "wait for a lower number to do something with this"
    }
    if ((number > 0 && number <= baseNumber + upgradePrice) || upgradeAvailability) { // if i can afford it / have unlocked it
        upgradeAvailability = true
        upgradeButton.innerHTML = "price: " + upgradePrice.toString() + " (" + Math.trunc(number - baseNumber).toString() + " / "+ upgradePrice.toString() + ") " + "(" + (Math.round(100*(number - baseNumber)/upgradePrice)).toString() + "%)"
        
    }
    if (number > 0 && number <= baseNumber + upgradePrice) { // if i can afford it
        upgradeButton.style.backgroundColor = "#0e6821"
        upgradeButton.style.boxShadow = "0px 0px 3px 2px #803211"
    }
    if (number > baseNumber + upgradePrice) {
        upgradeButton.style.backgroundColor = "#9e2b0e"
        upgradeButton.style.boxShadow = "0px 0px 0px 0px #803211"
    }
}, 1)

setInterval(function () {
    if (number <= 0) {
        upgradeButton.innerHTML = "no more upgrades for you"
        upgradeButton.style.boxShadow = "0px 0px 0px 0px #803211"
        upgradeButton.style.backgroundColor = "#9e2b0e"

        document.getElementById("butt").style.display = "none"

        upgradePrice = -100000
        upgradeAvailability = false
    }
}, 1)

setInterval(function () {
    document.getElementById("butt").innerHTML = "make number go down by " + clickPower.toString()
}, 1)

setInterval(function () {
    if (number <= 0) {
        unbalanceButton.style.display = "initial"
        unbalanceButton.innerHTML = "unbalance (not implemented)"
        unbalanceAvailability = true
    }
}, 1)