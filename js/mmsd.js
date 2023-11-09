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


// gonna be honest i do not know how it works however mdn would never lie to me
// you can tell i didnt write this because it has semicolons

async function populate() {
    // const requestURL = "https://augustusargento.github.io/json/mmsd.json";
    // const requestURL = "./json/mmsd.json"
    // const request = new Request(requestURL);
  
    // const response = await fetch(request);
    // everything = await response.json();

    let theJson = $.getJSON("./json/mmsd.json", await function(json) {
        everything = json
        // console.log(json)
        console.log(everything)
        updateDisplay(new Date().getMonth() + 1, new Date().getDate())
        correctDayVisibility()
        console.log("done loading")
    })
    // everything = theJson
    sebuttons[month - 1].style.backgroundColor = "#9e2b0e"
    dacells[Math.floor(day / 7)][day % 7 - 1 + SDIM[month-1]].style.backgroundColor = "#9e2b0e"
    // console.log(everything)
}



function updateDisplay(month, day) {
    // console.log("month: " + month.toString())
    // console.log("day: " + day.toString())
    input = DIM[month - 1] + day
    // console.log(everything)
    // console.log("input: " + input.toString())

    if (everything[input]["title"] == "") {
        console.log("is this working")
        document.getElementById("header").innerHTML = "no data for this, please wait 3-5 business days"
    }
    if (everything[input]["date"] == "") {
        console.log("is this working")
        document.getElementById("date").innerHTML = "no data for this, please wait 3-5 business days"
    }
    if (everything[input]["descriptor"] == "") {
        console.log("is this working")
        document.getElementById("optional").innerHTML = "no data for this, please wait 3-5 business days"
    }
    if (everything[input]["content"] == "") {
        console.log("is this working")
        document.getElementById("content").innerHTML = "no data for this, please wait 3-5 business days"
    }
    

    document.getElementById("header").innerHTML = everything[input]["title"]
    document.getElementById("date").innerHTML = everything[input]["date"]
    document.getElementById("optional").innerHTML = everything[input]["descriptor"]
    document.getElementById("content").innerHTML = everything[input]["content"]
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

// set up table1

serow = selectionMenu.insertRow()
for (let i=0; i<12; i++) {
    sebuttons.push(serow.insertCell())
}

for (let i=0; i<sebuttons.length; i++) {
    sebuttons[i].innerHTML = (i + 1).toString()


    sebuttons[i].onclick = () => {
        month = i + 1

        for (let j=0; j<sebuttons.length; j++) {
            if (i != j) {
                sebuttons[j].style.backgroundColor = "#bd442f"
            }
            else {
                sebuttons[j].style.backgroundColor = "#9e2b0e"
            }
        }
        correctDayVisibility()
    }

}

// set up table2

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

            for (let x=0; x<dacells.length; x++) {
                for (let y=0; y<dacells[x].length; y++) {
                    if (i != x || j != y) {
                        dacells[x][y].style.backgroundColor = "#bd442f"
                    }
                    else {
                        dacells[x][y].style.backgroundColor = "#9e2b0e"
                    }
                }
            }

            updateDisplay(month, day) // i dont know why it has to be month + 1 but i do know that it makes it work
        }

    }
}



populate()