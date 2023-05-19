let canvas = document.getElementById("game")
let ctx = canvas.getContext("2d")

let size = 20

let gameBoard = {
    width: 11,
    height: 11
}

let player = {
    x: Math.floor(gameBoard.width / 2),
    y: Math.floor(gameBoard.height / 2)
}

let tiles = []
let emptyTiles = []
let tiles2
let doneMakingTiles = false

let pieces = {
    I : [[true], [true], [true], [true]],
    O : [[true, true], [true, true]],
    L : [[true, ], [true, ], [true, true]],
    J : [[ , true], [ , true], [true, true]],
    S : [[ , true, true], [true, true, ]],
    Z : [[true, true, ], [ , true, true]],
    T : [[true, true, true], [ , true, ]]
} // went unused


let going = false
let maxNumberOfObstacles = 3
let numberOfObstacles = 0
let obstacle = {
    side: false, // false = left, true = right
    direction: 0, // 0 = left, 1 = up, 2 = right, 3 = down
    length: 0 // this one should be obvious
}

canvas.height = size * gameBoard.height
canvas.width = size * gameBoard.width


let haveStartedGame = false

let goingToMake = [false, false, false, false]

let roundsSurvived = 0
let deaths = 0
let highScore = 0

let wrapMode = false

function resetBoard() {
    for (let i=0; i<tiles.length; i++) {
        for (let j=0; j<tiles[i].length; j++) {
            tiles[i][j] = []
        }
    }
    player.x = Math.floor(gameBoard.width / 2)
    player.y = Math.floor(gameBoard.height / 2)

    haveStartedGame = false
    roundsSurvived = 0
    deaths += 1
}


// rendering:
let render = setInterval(() => {
    // the game board:
    ctx.lineWidth = 1
    ctx.strokeStyle = "#888"

    for (let i=0; i < gameBoard.width; i++) {
        ctx.beginPath()
        ctx.moveTo(i * size, 0)
        ctx.lineTo(i * size, canvas.height)
        ctx.stroke()
    }

    for (let i=0; i< gameBoard.height; i++) {
        ctx.beginPath()
        ctx.moveTo(0, i * size)
        ctx.lineTo(canvas.width, i * size)
        ctx.stroke()
    }

    ctx.fillStyle = "#444"
    for (let i=0; i < gameBoard.width; i++) {
        if (!doneMakingTiles) {
            tiles.push([])
            emptyTiles.push([])
        }
            for (let j=0; j < gameBoard.height; j++) {
            if (!doneMakingTiles) {
                tiles[i].push([])
                emptyTiles[i].push([])
            }

            ctx.beginPath()
            ctx.rect(i * size + 1, j * size + 1, size - 2, size - 2)
            ctx.fill()
            ctx.stroke()
        }
    }
    doneMakingTiles = true

    // obstacles:
    ctx.fillStyle = "#9e2b0e"
    for (let i=0; i<tiles.length; i++) {
        for (let j=0; j<tiles[i].length; j++) {
            if (tiles[i][j].includes("right ") || tiles[i][j].includes("down ") || tiles[i][j].includes("left ") || tiles[i][j].includes("up ")) {
                ctx.beginPath()
                ctx.fillRect(i * size + 1, j * size + 1, size - 2, size - 2)
                ctx.stroke()
            }
        }
    }

    // player:
    ctx.lineWidth = 5
    ctx.fillStyle = "#fff"
    ctx.beginPath()
    ctx.fillRect(player.x * size + 1, player.y * size + 1, size - 2, size - 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.strokeStyle = "#bbb"
    ctx.rect(player.x * size + 1, player.y * size + 1, size - 2, size - 2)
    ctx.stroke()
}, 33)

// the game:

function checkAndMakeObstacle()  {

    // if we dont have enough obstacles, do the whole process:
    // if (numberOfObstacles < maxNumberOfObstacles) {
    //     // make obstacle: 
        obstacle.length = Math.max(5, Math.trunc(3 * Math.max(gameBoard.height, gameBoard.width) * Math.random() / 4))
        obstacle.side = Boolean(Math.round(Math.random()))
        obstacle.direction = Math.round(3 * Math.random())
        // console.log(obstacle)

        // actually make obstacle:
        switch (obstacle.direction) { // it's incredibly obvious theres a way better way to do this but i dont want to and this works
            case 0 :
                if (obstacle.side) {
                    for (let i=0; i<obstacle.length; i++) {
                        tiles[0][gameBoard.height - i - 1] += "right "
                    }
                }
                else {
                    for (let i=0; i<obstacle.length; i++) {
                        tiles[0][i] += "right "
                    }
                }
                break
            
            case 1 :
                if (obstacle.side) {
                    for (let i=0; i<obstacle.length; i++) {
                        tiles[gameBoard.width - i - 1][0] += "down "
                    }
                }
                else {
                    for (let i=0; i<obstacle.length; i++) {
                        tiles[gameBoard.width - i - 1][0] += "down "
                    }
                }
                break
            
            case 2 :
                if (obstacle.side) {
                    for (let i=0; i<obstacle.length; i++) {
                        tiles[gameBoard.width - 1][gameBoard.height - i - 1] += "left "
                    }
                }
                else {
                    for (let i=0; i<obstacle.length; i++) {
                        tiles[gameBoard.width - 1][i] += "left "
                    }
                }
                break
            
            case 3 :
                if (obstacle.side) {
                    for (let i=0; i<obstacle.length; i++) {
                        tiles[gameBoard.width - i - 1][gameBoard.height - 1] += "up "
                    }
                }
                else {
                    for (let i=0; i<obstacle.length; i++) {
                        tiles[i][gameBoard.height - 1] += "up "
                    }
                }
                break
        // }
    }
}

document.addEventListener("keydown", (event) => {
    var key = event.which

    switch (key) {
        case 37 : //left
            if (player.x >= 1) {
                player.x -= 1
            }
            else if (wrapMode) {
                player.x = gameBoard.width - 1
            }
            break
        
        case 38 : // up
            if (player.y >= 1) {
                player.y -= 1
            }
            else if (wrapMode) {
                player.y = gameBoard.height - 1
            }
            break

        case 39 : // right
            if (player.x <= gameBoard.width - 2) {
                player.x += 1
            }
            else if (wrapMode) {
                player.x = 0
            }
            break
        
        case 40 : // down
            if (player.y <= gameBoard.height - 2) {
                player.y += 1
            }
            else if (wrapMode) {
                player.y = 0
            }
            break
    }

    if (tiles[player.x][player.y].includes("left ") || tiles[player.x][player.y].includes("up ") || tiles[player.x][player.y].includes("right ") || tiles[player.x][player.y].includes("down ")) {
        resetBoard()
    }
})

let updateTiles = setInterval(() => {
    tiles2 = []
    for (let i=0; i<tiles.length; i++) {
        tiles2.push([])
        for (let j=0; j<tiles[i].length; j++) {
            tiles2[i].push(tiles[i][j])
            tiles[i][j] = []
        }
    }

    goingToMake = [false, false, false, false]

    for (let i=0; i<tiles2.length; i++) {
        for (let j=0; j<tiles2[i].length; j++) {
            if (tiles2[i][j].includes("left ")) {
                if (i != 0) {
                    tiles[i - 1][j] += "left "

                    if (i - 1 == player.x && j == player.y) {
                        resetBoard()
                    }
                }
                else {
                    tiles[i][j] = []
                    goingToMake[0] = true
                }
            }
            if (tiles2[i][j].includes("up ")) {
                if (j != 0) {
                    tiles[i][j - 1] += "up "

                    if (i == player.x && j - 1 == player.y) {
                        resetBoard()
                    }
                }
                else {
                    tiles[i][j] = []
                    goingToMake[1] = true
                }
            }
            if (tiles2[i][j].includes("right ")) {
                if (i != tiles2.length - 1) {
                    tiles[i + 1][j] += "right "

                    if (i + 1 == player.x && j == player.y) {
                        resetBoard()
                    }
                }
                else {
                    tiles[i][j] = []
                    goingToMake[2] = true
                }
            }
            if (tiles2[i][j].includes("down ")) {
                if (j != tiles[i].length - 1) {
                    tiles[i][j + 1] += "down "

                    if (i == player.x && j + 1 == player.y) {
                        resetBoard()
                    }
                }
                else {
                    tiles[i][j] = []
                    goingToMake[3] = true
                }
            }
        }

        if (goingToMake[0]) {
            checkAndMakeObstacle()
        }
        if (goingToMake[1]) {
            checkAndMakeObstacle()
        }
        if (goingToMake[2]) {
            checkAndMakeObstacle()
        }
        if (goingToMake[3]) {
            checkAndMakeObstacle()
        }
    }

    if (!haveStartedGame) {
        for (let i=0; i<3; i++) {
            checkAndMakeObstacle()
        }
        haveStartedGame = true
    }

    roundsSurvived += 1

}, 1000)


let updateHtml = setInterval(() => {

    if (roundsSurvived != 1) {
        document.getElementById("roundsSurvived").innerHTML = "You have survived <b>" + roundsSurvived.toString() + "</b> rounds"
    }
    else {
        document.getElementById("roundsSurvived").innerHTML = "You have survived <b>1</b> round"
    }

    if (deaths != 1) {
        document.getElementById("deaths").innerHTML = "You have died <b>" + deaths.toString() + "</b> times"
    }
    else {
        document.getElementById("deaths").innerHTML = "You have died <b>1</b> time"
    }

    if (highScore <= roundsSurvived) {
        highScore = roundsSurvived
    }
    
    document.getElementById("highScore").innerHTML = "Your highscore is <b>" + highScore.toString() + "</b>"

}, 33)

document.getElementById("wrapMode").addEventListener("click", () => {
    wrapMode = wrapMode ? false : true
    console.log("wrap mode is " + wrapMode.toString())

    document.getElementById("wrapMode").innerHTML = wrapMode ? "wrap mode enabled" : "wrap mode disabled"
    document.getElementById("wrapMode").style.backgroundColor = wrapMode ? "rgb(14, 104, 33)" : "#9e2b0e"
})