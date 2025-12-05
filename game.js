function drawlevel(){    
    async function getlevel(level) {
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
    
    function paintlevel(levelArr){    
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");

        //Draw Maze outline
        let penPointX = 0
        let penPointY = 0
        
        ctx.beginPath();
        ctx.moveTo(penPointX, penPointY);
        penPointX = 500
        ctx.lineTo(penPointX, penPointY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(penPointX, penPointY);
        penPointY = 500
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
            const row = Math.floor(elmnt / 10) + 1;
            console.log('row =', row);

            var column = elmnt % 10;
            console.log('column', column);

            penPointX = 50 * column
            penPointY = 50 * row

            if (element === "X"){
                ctx.beginPath();
                ctx.moveTo(penPointX, penPointY);
                penPointX += 50
                ctx.lineTo(penPointX, penPointY);
                ctx.stroke();

                ctx.beginPath();
            }
            else if(element === "Y"){
                ctx.beginPath();
                ctx.moveTo(penPointX, penPointY);
                penPointY += 50
                ctx.lineTo(penPointX, penPointY);
                ctx.stroke();
            }
            else if(element === "Y\r\n"){
                ctx.beginPath();
                ctx.moveTo(penPointX, penPointY);
                penPointX += 0
                penPointY += 50
                ctx.lineTo(penPointX, penPointY);
                ctx.stroke(); 
            }
            else if(element === "-"){
                ctx.beginPath();
                ctx.moveTo(penPointX, penPointY);
                penPointX += 0
                penPointY += 50
                ctx.stroke(); 
            }

            elmnt += 1
            
        });
    }

    (async () => {
        const levelArr = await getlevel(2);
        console.log('Level array is:', levelArr);
        paintlevel(levelArr);
    })();
}

drawlevel();