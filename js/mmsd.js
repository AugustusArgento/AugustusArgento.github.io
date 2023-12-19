let selectionMenu = document.getElementById("table1")
let days = document.getElementById("table2")

let serow
let sebuttons = []

let darrows = []
let dacells = []

let month = new Date().getMonth() + 1
let day = new Date().getDate()

let everything
let table2Rows = 0

let DIM = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
let MDIM = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
let SDIM = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5]

let input = DIM[month - 1] + day

let currentMonth
let currentDay



async function populate() {
    let theJson = $.getJSON("./json/mmsd.json", await function(json) {
        everything = json
        // console.log(json)
        // console.log(everything)
        month = new Date().getMonth() + 1
        day = new Date().getDate()
        updateDisplay(month, day)
        console.log("month: " + String(month))
        console.log("data has been loaded (go me)")
    })
    // everything = theJson
    sebuttons[month - 1].style.backgroundColor = "#9e2b0e"
    dacells[Math.floor(day / 7)][day % 7 - 1 + SDIM[month-1]].style.backgroundColor = "#9e2b0e"
    // console.log(everything)
}



function updateDisplay(month, day) {
    correctDayVisibility()
    // console.log("month: " + month.toString())
    // console.log("day: " + day.toString())
    input = DIM[month - 1] + day
    // console.log(everything)
    // console.log("input: " + input.toString())

    if (everything[input]["title"] == "") {
        document.getElementById("header").innerHTML = "no data for this, please wait 3-5 business days"
    }
    else {
        document.getElementById("header").innerHTML = everything[input]["title"]
    }

    if (everything[input]["date"] == "") {
        document.getElementById("date").innerHTML = "no data for this, please wait 3-5 business days"
    }
    else {
        document.getElementById("date").innerHTML = everything[input]["date"]
    }

    if (everything[input]["descriptor"] == "") {
        document.getElementById("optional").innerHTML = ""
    }
    else {
        document.getElementById("optional").innerHTML = ", " + everything[input]["descriptor"]
    }

    if (everything[input]["content"] == "") {
        document.getElementById("content").innerHTML = "no data for this, please wait 3-5 business days"
    }
    else {
        document.getElementById("content").innerHTML = everything[input]["content"]
    }



    for (let i=0; i<sebuttons.length; i++) {
        if (i+1 == month) {
            sebuttons[i].style.backgroundColor = "#9e2b0e"
        }
        else {
            sebuttons[i].style.backgroundColor = "#bd442f"
        }
    }

    for (let i=0; i<dacells.length; i++) {
        for (let j=0; j<dacells[i].length; j++) {
            dacells[i][j].style.backgroundColor = "#bd442f"
        }
    }

    cell = SDIM[month - 1] + day
    if (month == currentMonth) {
        dacells[Math.floor((cell - 1)/7)][(cell - 1) % 7].style.backgroundColor = "#9e2b0e"
    }
    
}


function correctDayVisibility() {
    if (month == 4 || month == 7 || month == 12) {
        table2Rows = 6
    }
    else {
        table2Rows = 5
    }

    for (let i=0; i<dacells.length; i++) {
        for (let j=0; j<dacells[i].length; j++) {

            if (7*i + j+1 > MDIM[month - 1] + SDIM[month - 1]) {
                dacells[i][j].style.display = ""
                dacells[i][j].style.opacity = 0.25
                dacells[i][j].style.border = "2px solid black"
                dacells[i][j].innerHTML = 7*i + j+1 - (MDIM[month - 1] + SDIM[month - 1])
            }

            else if (7*i + j+1 <= SDIM[month - 1]) {
                dacells[i][j].innerHTML = MDIM[month - 2] + j+1 - SDIM[month - 1]
                dacells[i][j].style.display = ""
                dacells[i][j].style.opacity = 0.25
                dacells[i][j].style.border = "2px solid black"
            }

            else {
                dacells[i][j].style.display = ""
                dacells[i][j].style.opacity = 1
                dacells[i][j].style.display = ""
                dacells[i][j].style.border = "2px solid black"
                dacells[i][j].innerHTML = 7*i + j+1 - SDIM[month - 1]
            }

            if (i >= table2Rows) {
                dacells[i][j].style.display = "none"
                dacells[i][j].style.opacity = 0
                dacells[i][j].style.border = "2px solid #0000"
            }
        }
    }
}


// set up table1 (the one for the months)
serow = selectionMenu.insertRow()
for (let i=0; i<12; i++) {
    sebuttons.push(serow.insertCell())
}

for (let i=0; i<sebuttons.length; i++) {
    sebuttons[i].innerHTML = (i + 1).toString()

    sebuttons[i].onclick = () => {
        month = i + 1
        updateDisplay(month, day)
        // month = i + 1

        // for (let j=0; j<sebuttons.length; j++) {
        //     if (i != j) {
        //         sebuttons[j].style.backgroundColor = "#bd442f"
        //     }
        //     else {
        //         sebuttons[j].style.backgroundColor = "#9e2b0e"
        //     }
        // }
        // correctDayVisibility()
    }

}


// set up table2 (the one for the days)
for (let i=0; i<6; i++) {
    darrows.push(days.insertRow())
    dacells.push([])
    for (let j=0; j<7; j++) {
        dacells[i].push(darrows[i].insertCell())
    }
}

for (let i=0; i<dacells.length; i++) {
    for (let j=0; j<dacells[i].length; j++) {
        dacells[i][j].innerHTML = (7*i + j + 1).toString()

        dacells[i][j].onclick = () => {
            day = 7*i + j + 1 - SDIM[month-1];
            currentMonth = month
            currentDay = day + DIM[currentMonth - 1]
            console.log([currentMonth, currentDay])

            // for (let x=0; x<dacells.length; x++) {
            //     for (let y=0; y<dacells[x].length; y++) {
            //         if (i != x || j != y) {
            //             dacells[x][y].style.backgroundColor = "#bd442f"
            //         }
            //         else {
            //             dacells[x][y].style.backgroundColor = "#9e2b0e"
            //         }
            //     }
            // }
            console.log("month: " + String(day))
            updateDisplay(month, day)
        }

    }
}



populate()