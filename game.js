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
            console.log('row =', row);

            var column = elmnt % 20;
            console.log('column', column);

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
    function mouseCollision(){
        // if mouse is on black pixel fail and white fine
        // Imagine the best way of doing that is to set up a recurring function
        // that calculates how far the curser is from a black pixel
        // I think chatgpt might be fair for this one

        // https://blog.thejaytray.com/canvas-basics-06-collision-detection/
    }
}
drawLevel();

// Add Mouse collision
// Add Automatic level creation
// Gameify