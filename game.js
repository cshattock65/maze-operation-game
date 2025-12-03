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

        let penPointX = 20
        let penPointY = 20
        levelArr.forEach(element => {
            if (element === "X"){
                ctx.beginPath();
                ctx.moveTo(penPointX, penPointY);
                penPointX += 50
                penPointY += 0
                ctx.lineTo(penPointX, penPointY);
                ctx.stroke();
            }
            else if(element === "O"){
                ctx.beginPath();
                ctx.moveTo(penPointX, penPointY);
                penPointX += 20
                penPointY += 20
                ctx.lineTo(penPointX, penPointY);
                ctx.stroke();           
            }
            else{
                ctx.beginPath();
                ctx.moveTo(penPointX, penPointY);
                penPointX += 20
                penPointY += 20
                ctx.lineTo(penPointX, penPointY);
                ctx.stroke();           
            }
        });
    }

    (async () => {
        const levelArr = await getlevel(2);
        console.log('Level array is:', levelArr);
        paintlevel(levelArr);
    })();
}

drawlevel();