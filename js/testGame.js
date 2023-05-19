let number = 100000
let baseNumber = number
let upgradesBought = 0
let upgradePrice = 20
let baseUpgradePrice = upgradePrice
let clickPower = 1
let UPClickPower = 0
let upgradeAvailability = false
let unbalanceAvailability = false
let UP = 0
let availableNumber
let affordableUpgrades
let timeAtLastClick = 0
let timeSinceLastClick = 0

let canClickButtonButton = true

let amountOfUnbalances = 0

let tempUpgradePrice
let tempNumber
let tempClickPower
let counter

let totalPower
let timeLeft

let timeAtStart = Date.now()


let upgradeButton = document.getElementById("upgrade")
let unbalanceButton = document.getElementById("unbalance")

let updateVariables = setInterval(
    function () {
        timeSinceLastClick = (Date.now() - timeAtLastClick)/1000
        availableNumber = baseNumber - number
        totalPower = clickPower + UPClickPower

        if (number > 0) {
            number -= totalPower/100
        }

        tempNumber = availableNumber
        tempUpgradePrice = upgradePrice
        counter = 0
        tempClickPower = clickPower
        while (tempNumber >= tempUpgradePrice && tempNumber >= 0 && tempNumber <= baseNumber) {
            tempNumber -= tempUpgradePrice
            tempClickPower += 1
            tempUpgradePrice += clickPower
            counter += 1
        }
        affordableUpgrades = counter
    
        if (upgradesBought == 0) {
            timeLeft = Math.trunc((upgradePrice - availableNumber)/(totalPower))
        }

        else {
            timeLeft = Math.trunc(number/(totalPower))
        }

        if (timeLeft <= 0) {
            timeLeft = 0
        }
    }, 10
)

document.getElementById("butt").onclick = function() {

    if (UP < 20) {
        if (timeSinceLastClick >= 1/(UP+1) && canClickButtonButton) {
            number -= totalPower
            timeAtLastClick = Date.now()
        }   
    }

    else {
        number -= totalPower
        timeAtLastClick = Date.now()
    }
    
}
document.getElementById("number").onclick = function() {
    number = 1
    upgradesBought = 9999
    clickPower = upgradesBought
}

upgradeButton.onclick = function () {
    if (availableNumber >= upgradePrice && upgradeAvailability) {
        number += upgradePrice
        clickPower += 1
        upgradePrice += clickPower

        upgradesBought += 1
    }
}

unbalanceButton.onclick = function () {
    if (number <= 0) {
        UP += -1/10 * number + 1
        upgradesBought = 0
        canClickButtonButton = true
        amountOfUnbalances += 1

        number = baseNumber
        unbalanceButton.innerHTML = "unbalance"
        upgradeAvailability = true
        UPClickPower = (UP + 1) ** (1.5)
        clickPower = 1

        upgradePrice = baseUpgradePrice

        document.getElementById("butt").style.display = "block"
        upgradeButton.style.display = "initial"
    }
}


let updateProgressBar = setInterval(function () {
    if (upgradesBought == 0) {
        document.getElementById("progressbar").style.backgroundImage = "linear-gradient(90deg, #000000 " + (100-100*availableNumber/upgradePrice).toString() + "%, #ffffff " + (100-100*availableNumber/upgradePrice).toString() + "%)"
        
        if (timeLeft >= 60) {
            document.getElementById("progressbar").innerHTML = "time left: " + Math.floor(timeLeft/3600).toString() + "h" + Math.floor((timeLeft/60) % 60).toString() + "m" + (timeLeft % 60).toString() + "s"
        }
        else {
            document.getElementById("progressbar").innerHTML = "time left: " + timeLeft.toString() + "s"
        }
    }

    else {
        document.getElementById("progressbar").style.backgroundImage = "linear-gradient(90deg, #ffffff " + (100-100*availableNumber/baseNumber).toString() + "%, #000000 " + (100-100*availableNumber/baseNumber).toString() + "%)"
        
        if (timeLeft >= 60) {
            document.getElementById("progressbar").innerHTML = "time left: " + Math.floor(timeLeft/3600).toString() + "h" + Math.floor((timeLeft/60) % 60).toString() + "m" + (timeLeft % 60).toString() + "s"
        }
        else {
            document.getElementById("progressbar").innerHTML = "time left: " + timeLeft.toString() + "s"
        }
    }
}, 10)

let updateNumberContents = setInterval(function () {document.getElementById("number").innerHTML = "number: " + Math.ceil(number).toString() + " / " + baseNumber.toString()}, 10)

// let updateAvailableNumberContents = setInterval(function () {document.getElementById("availableNumber").innerHTML = "available number: " + Math.floor(availableNumber).toString() + " / " + baseNumber.toString()}, 10)

let updateNpsContents = setInterval(function () {
    if (UPClickPower > 0) {
        document.getElementById("nps").innerHTML = "nps: -(" + clickPower.toString() + " + " + Math.trunc(UPClickPower).toString() + ")" 
    }
    else {
        document.getElementById("nps").innerHTML = "nps: " + Math.trunc(-1 * clickPower).toString()
    }
}, 10)

let updateUPContests = setInterval(function () {
    if (amountOfUnbalances >= 1) {
        document.getElementById("UP").display = "initial"
        document.getElementById("UP").innerHTML = "UP: " + Math.trunc(UP).toString()
    }

    else {
        document.getElementById("UP").display = "none"
    }
    
}, 10)


let updateTimerContents = setInterval(function () {
    document.getElementById("timer").innerHTML = "time: " + (Math.trunc((Date.now() - timeAtStart)/1000)).toString()
}, 10)


let updateUpgradeButton = setInterval(function () {
    if (availableNumber < upgradePrice && !upgradeAvailability) {
        upgradeButton.innerHTML = "wait for a lower number to do something with this"
        upgradeButton.style.backgroundColor = "#9e2b0e"
    }

    if (availableNumber >= upgradePrice && !upgradeAvailability) {
        upgradeAvailability = true    
    }

    if (upgradeAvailability) {
        upgradeButton.innerHTML = "price: (" + Math.trunc(-1 * availableNumber).toString() + " / " + Math.trunc(-1 * upgradePrice).toString() + ") (" + Math.trunc(affordableUpgrades).toString() + " available)"
        upgradeButton.style.backgroundImage = "linear-gradient(90deg, #0e6821 " + (100*availableNumber/upgradePrice).toString() + "%, #9e2b0e " + (100*availableNumber/upgradePrice).toString() + "%)"
    }
}, 1)

let whenBalancedReset = setInterval(function () {
    if (number <= 0 && !upgradeAvailability) {
        upgradeButton.style.display = "none"
        unbalanceButton.style.boxShadow = "0px 0px 0px 0px #803211"
        unbalanceButton.style.backgroundColor = "#9e2b0e"

        document.getElementById("timer").style.display = "initial"
        document.getElementById("butt").style.display = "none"

        upgradePrice = -9999999999999
        upgradeAvailability = false
    }

    if (number <= 0 && upgradeAvailability) {
        unbalanceButton.style.boxShadow = "0px 0px 0px 0px #803211"
        upgradePrice = -9999999999999
        unbalanceButton.style.backgroundColor = "#9e2b0e"
    }
}, 1)

let updateButtonContents = setInterval(function () {
    document.getElementById("butt").innerHTML = "reduce number by " + Math.trunc(totalPower).toString()
    
    if (number <= 0 ) {
        canClickButtonButton = false
        document.getElementById("butt").innerHTML = "unable to reduce"
        document.getElementById("butt").style.backgroundImage = "linear-gradient(90deg, #9e2b0e 100%, #9e2b0e 100%)"
    }
    else {
        document.getElementById("butt").style.backgroundImage = "linear-gradient(90deg, rgba(64,107,217,1) " + (100*timeSinceLastClick*(UP+1)).toString() + "%, rgba(58,42,201,1) " + (100*timeSinceLastClick*(UP+1)).toString() + "%)"
    }

    if (UP >= 20) {
        document.getElementById("butt").style.backgroundImage = ""
        document.getElementById("butt").style.backgroundColor = "rgba(64,107,217,1)"
    }
}, 1)

let updateUnbalanceContents = setInterval(function () {
    if (unbalanceAvailability && number > 0) {
        unbalanceButton.style.backgroundColor = "#9e2b0e"
        unbalanceButton.innerHTML = "unbalance requires 0 or less number"
    }
    if (number <= 0) {
        unbalanceButton.style.display = "initial"
        unbalanceButton.style.boxShadow = "0px 0px 3px 2px #803211"

        unbalanceButton.innerHTML = "unbalance for " + (Math.trunc(-1/10 * number) + 1).toString() + " UP"
        unbalanceAvailability = true
    }
    unbalanceButton.style.backgroundImage = "linear-gradient(90deg, #3a2ac9 " + (100*availableNumber/baseNumber).toString() + "%, #9e2b0e " + (100*availableNumber/baseNumber).toString() + "%)"
}, 1)