function drawLevel(){    
    async function getLevel(level) {
        // Get data from text file and make into an array
        url = './assets/levels/Level'+level+'.txt';
        
        try {
            const response = await fetch(url);
            const data = await response.text();
            const arr = data.split(",");
            console.log('Got level array:', arr);
            return arr;
        } catch (error) {
            console.error('Error reading file:', error);
        }
        }
    
    function paintLevel(levelArr){    
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");

        //Draw Maze outline
        let penPointX = 0
        let penPointY = 0
        
        ctx.beginPath();
        ctx.moveTo(penPointX, penPointY);
        penPointX = 950
        ctx.lineTo(penPointX, penPointY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(penPointX, penPointY);
        penPointY = 950
        ctx.lineTo(penPointX, penPointY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(penPointX, penPointY);
        penPointX = 0
        ctx.lineTo(penPointX, penPointY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(penPointX, penPointY);
        penPointY = 0
        ctx.lineTo(penPointX, penPointY);
        ctx.stroke();

        penPointY = 50
        let elmnt = 0
        let row = 0 

        levelArr.forEach(element => {
            const row = Math.floor(elmnt / 20);

            var column = elmnt % 20;

            penPointX = 50 * column
            penPointY = 50 * row

            if (element === "X" || element === "\r\nX"){
                ctx.beginPath();
                ctx.moveTo(penPointX, penPointY);
                penPointX += 50
                ctx.lineTo(penPointX, penPointY);
                ctx.stroke();

                ctx.beginPath();
            }
            else if(element === "Y" || element === "\r\nY"){
                ctx.beginPath();
                ctx.moveTo(penPointX, penPointY);
                penPointY -= 50
                ctx.lineTo(penPointX, penPointY);
                ctx.stroke();
            }
            else if(element === "Z" || element === "\r\nZ"){
                ctx.beginPath();
                ctx.moveTo(penPointX, penPointY);
                penPointX += 50
                ctx.lineTo(penPointX, penPointY);
                ctx.stroke();
                penPointX -= 50

                ctx.beginPath();
                ctx.moveTo(penPointX, penPointY);
                penPointY -= 50
                ctx.lineTo(penPointX, penPointY);
                ctx.stroke();
            }

            elmnt += 1
        });
    }

    (async () => {
        const levelArr = await getLevel(4);
        console.log('Level array is:', levelArr);
        paintLevel(levelArr);
    })();
}

function gameBehaviours()
{
    let lives = 100
    function clearLevel(){
        const canvas = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    let canvas, ctx;
    let cposX = 0, cposY = 0;
    let px = 0, py = 0;

    let cursor = document.getElementById("cursor");

    function init() {
        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");

        canvas.addEventListener("mousemove", mouseMove, false);
        console.log(" Mouse tracking active");
    }

    function mouseMove(e) {
        e.preventDefault();

        cposX = e.pageX - canvas.offsetLeft;
        cposY = e.pageY - canvas.offsetTop;

        checkCollision();
    }
    function manageLives(action){
        document.getElementById('outputLives').innerHTML = lives;
        if(lives === 0){
            clearLevel();
        }
        if(action === 1){
            lives -= 1;
        }
    }

    function checkCollision() {
        const pixel = ctx.getImageData(cposX, cposY, 1, 1).data;
        const [r, g, b, a] = pixel;

        if (r === 0 && g === 0 && b === 0 && a > 0) {
            console.log(" Collision! Resetting...");
            cursor.style.left = "0px";
            cursor.style.top = "0px";
            action = 1;
            manageLives(action);           
        } else {
            // move the fake cursor element
            // cursor.style.left = (px + cposX + 3) + "px";
            // cursor.style.top = (py + cposY + 180) + "px";
        }
    }

    mouseCollision()
    // start everything when the page loads
    window.addEventListener("load", init, false);
    }

drawLevel();
gameBehaviours()

// Add Automatic level creation
// Gameify