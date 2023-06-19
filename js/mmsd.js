let selectionMenu = document.getElementById("table1")
let days = document.getElementById("table2")

let serow
let sebuttons = []

let darrows = []
let dacells = []

let month = new Date().getMonth()
let day = new Date().getDate()

let everything

let DIM = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]


// gonna be honest i do not know how it works however mdn would never lie to me
// you can tell i didnt write this because it has semicolons

async function populate() {
    const requestURL = "https://augustusargento.github.io/json/mmsd.json";
    const request = new Request(requestURL);
  
    const response = await fetch(request);
    everything = await response.json();
    updateDisplay(new Date().getMonth() + 1, new Date().getDate())
    sebuttons[month].style.backgroundColor = "#9e2b0e"
    dacells[Math.floor(day / 7)][day % 7 - 1].style.backgroundColor = "#9e2b0e"
}



function updateDisplay(month, day) {
    let input = DIM[month - 1] + day
    console.log("input: " + input.toString())
    document.getElementById("header").innerHTML = everything[input]["title"]
    document.getElementById("date").innerHTML = everything[input]["date"]
    document.getElementById("optional").innerHTML = everything[input]["descriptor"]
    document.getElementById("content").innerHTML = everything[input]["content"]
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
    }

}

// set up table2

for (let i=0; i<5; i++) {
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
            day = 7*i + j + 1;

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

            updateDisplay(month, day)
        }

    }
}


populate()