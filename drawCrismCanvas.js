let canvas = document.getElementById("crism")
let ctx
let width = document.getElementById("crismSection").clientWidth
let height = 500

let angles = []
let points = []
function DoTheThings() {
    width = document.getElementById("crismSection").clientWidth
    canvas.width = width
    canvas.height = height

    function generateAngles(numberOfPoints, shift) {
        angles = []
        if (numberOfPoints % 2 == 1) {
            for (let i = 0; i < numberOfPoints; i++) {
                angles.push(2*i * Math.PI / numberOfPoints + shift)
            }
        }
        if (numberOfPoints % 4 == 0) {
            for (let i = 0; i < numberOfPoints; i++) {
                angles.push(i * Math.PI / (numberOfPoints / 2) + shift / 2)
            }
        }
        if (numberOfPoints % 4 == 2) {
            for (let i = 0; i < numberOfPoints; i++) {
                angles.push(i * Math.PI / (numberOfPoints / 2))
            }
        }
        // console.log("angles:")
        // console.log(angles)
        return(angles)
    }

    function generatePoints(angles) {
        points = []
        for (let i = 0; i < angles.length; i++) {
            points.push([Math.min(width/4, height/4) * Math.cos(angles[i]) + width/2, Math.min(width/4, height/4) * Math.sin(angles[i]) + height/2])
        }
        // console.log("points:")
        // console.log(points)
        return(points)
    }

    function draw(start, stop, index, rotate) {
        if (canvas.getContext) {
            ctx = canvas.getContext("2d")
        }
        
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(width/2, height/2, Math.min(width/4, height/4), 0, 2 * Math.PI)
        ctx.closePath()
        ctx.stroke()

        for (let i = start; i < stop + 1; i++) {
            ctx.beginPath()
            let pointCoordinates = generatePoints(generateAngles(i, rotate))
            ctx.moveTo(pointCoordinates[pointCoordinates.length - 1][0], pointCoordinates[pointCoordinates.length - 1][1])
            ctx.closePath()
            ctx.stroke()
            
            ctx.moveTo(pointCoordinates[pointCoordinates.length - index][0], pointCoordinates[pointCoordinates.length - index][1])
            for (let i = 0; i < index * (pointCoordinates.length - 0); i += index) {
                ctx.lineTo(pointCoordinates[i % pointCoordinates.length][0], pointCoordinates[i % pointCoordinates.length][1])
                ctx.arc(pointCoordinates[i % pointCoordinates.length][0], pointCoordinates[i % pointCoordinates.length][1], 2, 0, 2 * Math.PI)

                ctx.moveTo(pointCoordinates[i % pointCoordinates.length][0], pointCoordinates[i % pointCoordinates.length][1])
            }
            ctx.stroke()
        }
    }

    // draw(3, 3, 1, -Math.PI/2)

    nos = 10
    for (i = 1; i < nos; i++) {
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        draw(nos, nos, i, -Math.PI/2)
    }
}
DoTheThings()