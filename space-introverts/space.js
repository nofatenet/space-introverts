let divbody = document.getElementById('mainGrid');
    for(i = 0 ; i < 225 ; i++) {
        let div = document.createElement('div');
        div.className = '';
        divbody.appendChild(div);
    }

document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('#score');
    let gridWidth = 15;
    let playerPos = 202;
    let introvertPos = 0;
    let kills = [];
    let score = 0;
    let direction = 1;
    let introvertId

    //define enemy:
    const introverts = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39 
    ]

    //draw enemy:
    introverts.forEach( introvert =>
    squares[introvertPos + introvert].classList.add('introvert'));

    //draw player:
    function drawPlayer() {
        squares[playerPos].classList.add('player');
    }
    drawPlayer();

    //movement player:
    function movePlayer(e) {
        squares[playerPos].classList.remove('player');
        switch (e.keyCode) {
            case 37:
            if(playerPos % gridWidth !== 0) 
            playerPos -=1;
            //console.log("Links!")
                break;
            case 39:
            if(playerPos % gridWidth < gridWidth -1)
            playerPos +=1;
            //console.log("Rechts!")
                break;
        }
        drawPlayer();
    }
    document.addEventListener('keydown', movePlayer);

    //moving the introverts:
    function moveIntrovert() {
        const leftEnd = introverts[0] % gridWidth === 0;
        const rightEnd = introverts[introverts.length -1] % gridWidth === gridWidth -1;

        if((leftEnd && direction === -1) || (rightEnd && direction === 1)){
            direction = gridWidth
        } else if (direction === gridWidth) {
            if(leftEnd) direction = 1
            else direction = -1
        }
        for (let i = 0; i <= introverts.length -1; i++) {
            squares[introverts[i]].classList.remove('introvert');
        }
        for (let i = 0; i <= introverts.length -1; i++) {
            introverts[i] += direction;
            
        }
        for (let i = 0; i <= introverts.length -1; i++) {
            if (!kills.includes(i)){ //do not re-add them
                squares[introverts[i]].classList.add('introvert'); 
            }
        }
        if (score == 30) {
        console.log("You Made It!");
        score = 33;
    }
    }

    //is Game Over?
    if(squares[playerPos].classList.contains('introvert')) {
        console.log("hit!");
        scoreDisplay.textContent = 'Game Over';
        squares[playerPos].classList.add('explo');
        clearInterval(introvertId);
    }
    for (let i = 0; i <= introverts.length -1; i++) {
        if(introverts[i] > (squares.length = (gridWidth-1))) {
            scoreDisplay.textContent = 'Game Over';
            clearInterval(introvertId);
        }
    }

    //how fast are those things?!
    introvertId = setInterval(moveIntrovert, 400)

    //fighting:
    function shoot(e) {
        let laserId;
        let laserPos = playerPos;
        //moving the shot:
        function moveLaser() {
            squares[laserPos].classList.remove('laser');
            laserPos -= gridWidth;
            squares[laserPos].classList.add('laser');
            if (squares[laserPos].classList.contains('introvert')) {
                squares[laserPos].classList.remove('laser');
                squares[laserPos].classList.remove('introvert');
                squares[laserPos].classList.add('explo');

        setTimeout(() => squares[laserPos].classList.remove('explo'), 300);
        clearInterval(laserId);

        const killsMade = introverts.indexOf(laserPos)
        kills.push(killsMade);
        score++;
        scoreDisplay.textContent = score;
            }
    if (laserPos < gridWidth){
        clearInterval(laserId)
        setTimeout (() => squares[laserPos].classList.remove('laser'), 100);
            }
        }
    switch(e.keyCode) {
        case 32:
        laserId = setInterval(moveLaser, 120);
        break;
    }
}

document.addEventListener('keydown', shoot);

});
