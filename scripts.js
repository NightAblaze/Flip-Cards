document.addEventListener('DOMContentLoaded', () => {
    let cardArray = [];
    let playableCards = [];
    let cardsChosen = [];
    let cardsChosenId = [];
    let playerTurn = 1;
    let p1Score = 0;
    let p2Score = 0;
    let p3Score = 0;
    let p4Score = 0;
    document.getElementById("p1Score").innerHTML = p1Score;
    document.getElementById("p2Score").innerHTML = p2Score;
    document.getElementById("p3Score").innerHTML = p3Score;
    document.getElementById("p4Score").innerHTML = p4Score;
    let finalScores = "";
    let success = new Audio('sounds/success.mp3');
    let fail = new Audio('sounds/fail.mp3');
    let end = new Audio('sounds/end.mp3');
    
    //creates the back of the card
    const cardback = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    cardback.setAttribute('x','25');
    cardback.setAttribute('y','80');
    cardback.setAttribute('class','cardback');
    cardback.setAttribute('stroke','black');
    cardback.setAttribute('stroke-width','3');
    cardback.setAttribute('fill','grey');
    cardback.innerHTML = "?";

    //create the base shapes

        //circle
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle.setAttribute('cx','50');
        circle.setAttribute('cy','50');
        circle.setAttribute('r','40');
        circle.setAttribute('stroke','black');
        circle.setAttribute('stroke-width','3');
        circle.setAttribute('fill','red');

        //ellipse
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')
        ellipse.setAttribute('cx','50');
        ellipse.setAttribute('cy','50');
        ellipse.setAttribute('rx','45');
        ellipse.setAttribute('ry','30');
        ellipse.setAttribute('stroke','black');
        ellipse.setAttribute('stroke-width','3');
        ellipse.setAttribute('fill','yellow');

        //rectangle
        const rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
        rectangle.setAttribute('points','5,25 95,25 95,75 5,75');
        rectangle.setAttribute('stroke','black');
        rectangle.setAttribute('stroke-width','3');
        rectangle.setAttribute('fill','blue');

        //star
        const star = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
        star.setAttribute('points','50,5 61,37 95,37 69,60 80,95 50,72 20,95 31,60 5,37 39,37');
        star.setAttribute('stroke','black');
        star.setAttribute('stroke-width','3');
        star.setAttribute('fill','lime');

        //triangle
        const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
        triangle.setAttribute('points','50,10 90,90 10,90');
        triangle.setAttribute('stroke','black');
        triangle.setAttribute('stroke-width','3');
        triangle.setAttribute('fill','green');

        //square
        const square = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
        square.setAttribute('points','10,10 90,10 90,90 10,90');
        square.setAttribute('stroke','black');
        square.setAttribute('stroke-width','3');
        square.setAttribute('fill','pink');

        //cross
        const cross = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
        cross.setAttribute('points','40,5 60,5 60,40 95,40 95,60 60,60 60,95 40,95 40,60 5,60 5,40 40,40');
        cross.setAttribute('stroke','black');
        cross.setAttribute('stroke-width','3');
        cross.setAttribute('fill','purple');

        //pentagon
        const pentagon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
        pentagon.setAttribute('points','50,5 95,35 80,95 20,95 5,35');
        pentagon.setAttribute('stroke','black');
        pentagon.setAttribute('stroke-width','3');
        pentagon.setAttribute('fill','lightblue');

        //hexagon
        const hexagon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
        hexagon.setAttribute('points','30,10 70,10 95,50 70,90 30,90 5,50');
        hexagon.setAttribute('stroke','black');
        hexagon.setAttribute('stroke-width','3');
        hexagon.setAttribute('fill','darkblue');

        //octogon
        const octogon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
        octogon.setAttribute('points','33,5 67,5 95,33 95,67 67,95 33,95 5,67 5,33');
        octogon.setAttribute('stroke','black');
        octogon.setAttribute('stroke-width','3');
        octogon.setAttribute('fill','orange');

    // shapes available
    const shapes = [circle, ellipse, rectangle, star, triangle, square, cross, pentagon, hexagon, octogon];

    // colours available
    const colours = ["red", "yellow", "blue", "lime", "green", "pink", "purple", "lightblue", "darkblue", "orange"];

    // board variables
    let amountShapes = 3;
    let amountColours = 3;
    let numberOfCards = 16;
    let players = 1;
        
    // assign grid variable
    const grid = document.querySelector('#grid');
    
    // Binds the button's click event to the generateGame function
    document.getElementById("generate").addEventListener("click",a=>{generateGame(
        document.getElementById('shapes').value,
        document.getElementById('colours').value,
        document.querySelector('input[name="size"]:checked').value,
        document.querySelector('input[name="players"]:checked').value,
    )});

    // gather game options
    function generateGame(numberOfShapes, numberOfColours, size, numberOfPlayers){
        amountShapes = numberOfShapes;
        amountColours = numberOfColours;
        numberOfCards = (size * size);
        boardDimension = (size * 106);
        players = numberOfPlayers;
        
        document.getElementById("grid").style.height = boardDimension + "px";
        document.getElementById("grid").style.width = boardDimension + "px";
        document.getElementById("scores").style.width = boardDimension + "px";

        scoreboard();

        document.getElementById("rulesGrid").style.display = "none";

        // create the cards
        for (let i = 0; i < numberOfCards; i++){
            cardArray[i] = {id: i, shape: shapes[Math.floor(Math.random() * amountShapes)], colour: colours[Math.floor(Math.random() * amountColours)]};
        }

        // creating a copy of cardArray to keep track of cards still playable for scorable function
        playableCards = [...cardArray];

        createBoard();
       
    }

    // create the board
    function createBoard() {
        for (let j = 0; j < cardArray.length; j++) {
            // create each card entry and add to the grid
            let card = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            card.setAttribute('data-id', j);
            card.setAttribute('width', '100');
            card.setAttribute('height', '100');
            card.setAttribute('class', 'playCard');
            card.appendChild(cardback.cloneNode(true)); // adds a copy of cardback
            card.addEventListener('click', flipCard);   // activates flipcard function when a card is clicked
            grid.appendChild(card);
        }
    }

    // check for match
    function checkForMatch(){
        let cards = grid.querySelectorAll('svg');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        // checks if both the shapes and colours match
        if(cardsChosen[0].shape === cardsChosen[1].shape && cardsChosen[0].colour === cardsChosen[1].colour){
            popup("You found a perfect match! +3 points");
            cards[optionOneId].removeChild(cards[optionOneId].firstElementChild); // makes card blank
            cards[optionTwoId].removeChild(cards[optionTwoId].firstElementChild); // makes card blank
            cards[optionOneId].setAttribute('class', 'blank');              // changes class of matched cards
            cards[optionTwoId].setAttribute('class', 'blank');              // changes class of matched cards
            cards[optionOneId].removeEventListener("click", flipCard);      // prevents card being selected again
            cards[optionTwoId].removeEventListener("click", flipCard);      // prevents card being selected again
                
            reducePlayableCards();

            success.cloneNode().play();

            score(3);

            scorable();
        }

        // checks if the shapes matches
        else if(cardsChosen[0].shape === cardsChosen[1].shape){
            popup("You found a shape match! +1 point");
            cards[optionOneId].removeChild(cards[optionOneId].firstElementChild); // makes card blank
            cards[optionTwoId].removeChild(cards[optionTwoId].firstElementChild); // makes card blank
            cards[optionOneId].setAttribute('class', 'blank');              // changes class of matched cards
            cards[optionTwoId].setAttribute('class', 'blank');              // changes class of matched cards
            cards[optionOneId].removeEventListener("click", flipCard);      // prevents card being selected again
            cards[optionTwoId].removeEventListener("click", flipCard);      // prevents card being selected again

            reducePlayableCards();

            success.cloneNode().play();

            score(1);

            scorable();
        }

        // checks if the colours match
        else if(cardsChosen[0].colour === cardsChosen[1].colour){
            popup("You found a colour match! +1 point");
            cards[optionOneId].removeChild(cards[optionOneId].firstElementChild); // makes card blank
            cards[optionTwoId].removeChild(cards[optionTwoId].firstElementChild); // makes card blank
            cards[optionOneId].setAttribute('class', 'blank');              // changes class of matched cards
            cards[optionTwoId].setAttribute('class', 'blank');              // changes class of matched cards
            cards[optionOneId].removeEventListener("click", flipCard);      // prevents card being selected again
            cards[optionTwoId].removeEventListener("click", flipCard);      // prevents card being selected again

            reducePlayableCards();

            success.cloneNode().play();

            score(1);

            scorable();
        }

        // if the above 3 are not correct then the shapes or colours do not match
        else{
            // changes message if only 1 player
            fail.cloneNode().play();

            if(players == 1){
                popup("That is not a match. Try again!");
            }
            else{
                changePlayer();
                popup("That is not a match. It is now player " + (playerTurn) + "'s turn!");
            }
            cards[optionOneId].removeChild(cards[optionOneId].firstElementChild); // makes card blank
            cards[optionTwoId].removeChild(cards[optionTwoId].firstElementChild); // makes card blank
            cards[optionOneId].appendChild(cardback.cloneNode(true)); // returns card to cardback
            cards[optionTwoId].appendChild(cardback.cloneNode(true)); // returns card to cardback
        }
        cardsChosen = [];
        cardsChosenId = [];   
    }

    // displays message in the middle of the screen
    function popup(text){
        document.getElementById("notification").innerHTML = text;
        document.getElementById("popup").style.display = "flex";
    }

    // reduces playableCards array for scorable function
    function reducePlayableCards(){
        let remove = playableCards.findIndex(x => x.id == cardsChosenId[0]);

        if (remove > -1) { // only splice array when item is found
            playableCards.splice(remove, 1);
        }

        remove = playableCards.findIndex(x => x.id == cardsChosenId[1]);
        if (remove > -1) { // only splice array when item is found
            playableCards.splice(remove, 1);
        }
    }


    //check there are still cards that are scorable
    function scorable(){
        if(playableCards.length == 0){
            end.play();
            gameEnd("There are no more scorable pairs remaining!");
        }
        else{
            for (let k = 0; k < playableCards.length-1; k++){
                for (l = k; l < playableCards.length-1; l++){
                    if(playableCards[k].shape == playableCards[l+1].shape || playableCards[k].colour == playableCards[l+1].colour){
                        return;
                    }
                    else if (k == playableCards.length-2 && l == playableCards.length-2){
                        end.play();
                        gameEnd("There are no more scorable pairs remaining!");
                    }
                }
            }
        }
    }

    // once there are no more pairs will display the final scores depending on the number of players
    function gameEnd(text){
        if(players == 1){
            finalScores = "Player 1 Score: " + p1Score;
        }
        else if(players == 2){
            finalScores = "Player 1's Score: " + p1Score + "<br> Player 2's Score: " + p2Score;
        }
        else if(players == 3){
            finalScores = "Player 1's Score: " + p1Score + "<br> Player 2's Score: " + p2Score + "<br> Player 3's Score: " + p3Score;
        }
        else if(players == 4){
            finalScores = "Player 1's Score: " + p1Score + "<br> Player 2's Score: " + p2Score + "<br> Player 3's Score: " + p3Score + "<br> Player 4's Score: " + p4Score;
        }
        document.getElementById("endText").innerHTML = text + "<br>" + finalScores;
        document.getElementById("end").style.display = "grid";
    }

    // flip card
    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if(cardId != cardsChosenId[0] && cardsChosen.length != 2) {    // checks to ensure not selecting the same card again and not selecting more than 2 cards
            cardsChosen.push(cardArray[cardId]);    // creates an array of the 2 cards selected
            cardsChosenId.push(cardId);             // creates an array of the cardId's of the 2 cards selected
            this.removeChild(this.firstElementChild);
            this.appendChild(cardArray[cardId].shape.cloneNode(true)); // applies the shape of the card as defined in cardArray
            this.firstElementChild.setAttribute('fill', cardArray[cardId].colour) // applies the colour of the card as defined in cardArray
            if (cardsChosen.length == 2) { // when 2 cards have been selected run checkForMatch
                setTimeout(checkForMatch, 500); // delays match check
            }
        } 
    }

    // assign score based on player's turn
    function score(pointGain){
        switch(playerTurn) {
            case 1:
                p1Score = p1Score + pointGain;
                document.getElementById("p1Score").innerHTML = p1Score;
                break;
            case 2:
                p2Score = p2Score + pointGain;
                document.getElementById("p2Score").innerHTML = p2Score;
                break;
            case 3:
                p3Score = p3Score + pointGain;
                document.getElementById("p3Score").innerHTML = p3Score;
                break;
            case 4:
                p4Score = p4Score + pointGain;
                document.getElementById("p4Score").innerHTML = p4Score;
                break;
        }
    }

    // changes the active player
    function changePlayer(){
        switch(playerTurn) {
            case 1:
                if(players == 1){

                }
                else{
                    playerTurn++;
                } 
            break;
            case 2:
                if(players == 2){
                    playerTurn = 1;
                }
                else{
                    playerTurn++;
                } 
                break;
            case 3:
                if(players == 3){
                    playerTurn = 1;
                }
                else{
                    playerTurn++;
                } 
                break;
            case 4:
                playerTurn = 1;
                break;
        }
    }

    // reveals the scores of any players playing
    function scoreboard(){
        if(players == 1){
            document.getElementById("p1").style.display = "block";
        }
        else if(players == 2){
            document.getElementById("p1").style.display = "block";
            document.getElementById("p2").style.display = "block";
        }
        else if(players == 3){
                document.getElementById("p1").style.display = "block";
                document.getElementById("p2").style.display = "block";
                document.getElementById("p3").style.display = "block";
        }
        else if(players == 4){
                document.getElementById("p1").style.display = "block";
                document.getElementById("p2").style.display = "block";
                document.getElementById("p3").style.display = "block";
                document.getElementById("p4").style.display = "block";
        }
    }

    // refreshes the page to restart the game once complete
    function refreshPage(){
        window.location.reload();
    } 

    // Binds the button's click event to the generateGame function
    document.getElementById("playAgain").addEventListener("click",a=>{refreshPage()});
})