let number = 100000
let baseNumber = number
let upgradesBought = 0
let upgradePrice = -20
let baseUpgradePrice = upgradePrice
let clickPower = 1
let upgradeAvailability = false
let unbalanceAvailability = false
let up = 0
let timeAtLastClick = 0
let timeSinceLastClick = 0

let timeAtStart = Date.now()


let upgradeButton = document.getElementById("upgrade")
let unbalanceButton = document.getElementById("unbalance")

let updateVariables = setInterval(
    function () {
        timeSinceLastClick = (Date.now() - timeAtLastClick)/1000

        if (number > 0) {
            number -= clickPower/100
        }
    }, 10
)

document.getElementById("butt").onclick = function() {
    if (timeSinceLastClick >= 1/(up+1)) {
        number -= clickPower
        timeAtLastClick = Date.now()
    }
}
// document.getElementById("number").onclick = function() {number = 0}

upgradeButton.onclick = function () {
    if (number <= baseNumber + upgradePrice && upgradeAvailability) {
        number -= upgradePrice
        clickPower += 1
        upgradePrice -= clickPower
    }
}

unbalanceButton.onclick = function () {
    if (number <= 0) {
        up += Math.trunc(-1/10 * number) + 1
        number = baseNumber
        unbalanceButton.innerHTML = "unbalance"
        upgradeAvailability = true
        clickPower = 1
        upgradePrice = baseUpgradePrice
        document.getElementById("up").innerHTML = "up: " + up.toString()
        document.getElementById("butt").style.display = "initial"
        upgradeButton.style.display = "initial"
    }
}

let setBackgroundGradient = setInterval(function () {
    document.getElementById("butt").style.backgroundImage = "linear-gradient(90deg, rgba(64,107,217,1) " + (100*timeSinceLastClick*(up+1)).toString() + "%, rgba(58,42,201,1) " + (100*timeSinceLastClick*(up+1)).toString() + "%)"
}, 10)

let updateNumberContents = setInterval(function () {document.getElementById("number").innerHTML = "number: " + Math.ceil(number).toString() + " / " + baseNumber.toString()}, 10)
let updateNpsContents = setInterval(function () {document.getElementById("nps").innerHTML = "nps: " + (-1 * clickPower).toString()}, 10)
let upgradeTimerContents = setInterval(function () {
    document.getElementById("timer").innerHTML = "time: " + (Math.trunc((Date.now() - timeAtStart)/1000)).toString()
}, 10)

let updateUpgradeButton = setInterval(function () {
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

let whenBalancedReset = setInterval(function () {
    if (number <= 0) {
        upgradeButton.style.display = "none"
        upgradeButton.style.boxShadow = " 0px 0px 0px 0px #803211"
        upgradeButton.style.backgroundColor = "#9e2b0e"

        document.getElementById("timer").style.display = "initial"

        document.getElementById("butt").style.display = "none"

        upgradePrice = -9999999999999
        upgradeAvailability = false
    }
}, 1)

let updateButtonContents = setInterval(function () {
    document.getElementById("butt").innerHTML = "reduce number by " + clickPower.toString()
}, 1)

let updateUnbalanceContents = setInterval(function () {
    if (unbalanceAvailability && number > 0) {
        unbalanceButton.style.backgroundColor = "#9e2b0e"
    }
    if (number <= 0) {
        unbalanceButton.style.display = "initial"
        unbalanceButton.innerHTML = "unbalance for " + Math.trunc(-1/10 * number + 1).toString() + " UP"
        unbalanceAvailability = true
    }
}, 1)