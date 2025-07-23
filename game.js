function getlevel(int) {
    // Get data from text file and make into an array


    fetch('./assets/levels/Level1.txt')
    .then(response => response.text())
    .then(data => {
        console.log(data); // Output file content
    })
    .then(data => {
      document.getElementById('output').textContent = data;
      console.log('File read successfully:', data);
    })
    .catch(error => {
      console.error('Error reading file:', error);
  });
}

function drawlevel() {
    // use canvas to draw level
}

getlevel(1);