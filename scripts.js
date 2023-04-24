document.addEventListener('DOMContentLoaded', () => {
    const resultDisplay = document.querySelector("#p1Result")
    let cardArray = [];
    let cardsChosen = [];
    let cardsChosenId = [];
    let p1Score = 0
    let p2Score = 0

    //create the back of the card
    const cardback = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    cardback.setAttribute('x','25');
    cardback.setAttribute('y','80');
    cardback.setAttribute('class','cardback');
    cardback.setAttribute('stroke','black');
    cardback.setAttribute('stroke-width','3');
    cardback.setAttribute('fill','grey');
    cardback.innerHTML = "?"

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

    const amountShapes = 1
    const amountColours = 1

    // create cards
    for (let i = 0; i < 16; i++){
        cardArray[i] = {id: i, shape: shapes[Math.floor(Math.random() * amountShapes)], colour: colours[Math.floor(Math.random() * amountColours)]}
    }
     
    // assign grid variable
    const grid = document.querySelector('.grid');
      
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
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    // check for match
    function checkForMatch(){
        let cards = grid.querySelectorAll('svg');
        let playableCards = cardArray;
        console.log(playableCards); // testing
        let remove = "";
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        console.log(cardsChosenId); // testing

        if(cardsChosen[0].shape === cardsChosen[1].shape && cardsChosen[0].colour === cardsChosen[1].colour){
            alert("You found a perfect match!");
            cards[optionOneId].removeChild(cards[optionOneId].firstElementChild); // makes card blank
            cards[optionTwoId].removeChild(cards[optionTwoId].firstElementChild); // makes card blank
            cards[optionOneId].removeEventListener("click", flipCard);      // prevents card being selected again
            cards[optionTwoId].removeEventListener("click", flipCard);      // prevents card being selected again
                
                // reduces playableCards array for scorable function
                remove = playableCards.findIndex(x => x.id == cardsChosenId[0]);
                  
                console.log(remove); // testing

                if (remove > -1) { // only splice array when item is found
                    playableCards.splice(remove, 1);
                }

                console.log(playableCards); //testing

                remove = playableCards.findIndex(x => x.id == cardsChosenId[1]);
                if (remove > -1) { // only splice array when item is found
                    playableCards.splice(remove, 1);
                }
                console.log(playableCards); //testing

            p1Score = p1Score + 3;
            
            console.log(playableCards[2].shape)

                //check there are still cards that are scorable
                for (let k = 0; k < playableCards.length; k++){
                    for (l = k; l < playableCards.length; l++){
                        if(playableCards[k].shape == playableCards[l+1].shape || playableCards[k].colour == playableCards[l+1].colour){
                            break;
                        }
                        else if (k == playableCards.length-1 && l == playableCards.length-1){
                            alert("There are no more scorable pairs remaining!")
                        }
                    }
                }
        }
        else if(cardsChosen[0].shape === cardsChosen[1].shape){
            alert("You found a shape match!");
            cards[optionOneId].removeChild(cards[optionOneId].firstElementChild); // makes card blank
            cards[optionTwoId].removeChild(cards[optionTwoId].firstElementChild); // makes card blank
            cards[optionOneId].removeEventListener("click", flipCard);      // prevents card being selected again
            cards[optionTwoId].removeEventListener("click", flipCard);      // prevents card being selected again

                // reduces playableCards array for scorable function
                remove = playableCards.findIndex(x => x.id == cardsChosenId[0]);
    
                console.log(remove); // testing

                if (remove > -1) { // only splice array when item is found
                    playableCards.splice(remove, 1);
                }

                console.log(playableCards); //testing

                remove = playableCards.findIndex(x => x.id == cardsChosenId[1]);
                if (remove > -1) { // only splice array when item is found
                    playableCards.splice(remove, 1);
                }
                console.log(playableCards); //testing

            p1Score = p1Score + 1;

                //check there are still cards that are scorable
                for (let k = 0; k < playableCards.length; k++){
                    for (l = k; l < playableCards.length; l++){
                        if(playableCards[k].shape == playableCards[l+1].shape || playableCards[k].colour == playableCards[l+1].colour){
                            break;
                        }
                        else if (k == playableCards.length-1 && l == playableCards.length-1){
                            alert("There are no more scorable pairs remaining!")
                        }
                    }
                }
        }
        else if(cardsChosen[0].colour === cardsChosen[1].colour){
            alert("You found a colour match!");
            cards[optionOneId].removeChild(cards[optionOneId].firstElementChild); // makes card blank
            cards[optionTwoId].removeChild(cards[optionTwoId].firstElementChild); // makes card blank
            cards[optionOneId].removeEventListener("click", flipCard);      // prevents card being selected again
            cards[optionTwoId].removeEventListener("click", flipCard);      // prevents card being selected again

                // reduces playableCards array for scorable function
                remove = playableCards.findIndex(x => x.id == cardsChosenId[0]);
        
                console.log(remove); // testing

                if (remove > -1) { // only splice array when item is found
                    playableCards.splice(remove, 1);
                }

                console.log(playableCards); //testing

                remove = playableCards.findIndex(x => x.id == cardsChosenId[1]);
                if (remove > -1) { // only splice array when item is found
                    playableCards.splice(remove, 1);
                }
                console.log(playableCards); //testing

            p1Score = p1Score + 1;
            //check there are still cards that are scorable
            for (let k = 0; k < playableCards.length; k++){
                for (l = k; l < playableCards.length; l++){
                    if(playableCards[k].shape == playableCards[l+1].shape || playableCards[k].colour == playableCards[l+1].colour){
                        break;
                    }
                    else if (k == playableCards.length-1 && l == playableCards.length-1){
                        alert("There are no more scorable pairs remaining!")
                    }
                }
            }
        }
        else{
            alert("Sorry, try again");
            cards[optionOneId].removeChild(cards[optionOneId].firstElementChild); // makes card blank
            cards[optionTwoId].removeChild(cards[optionTwoId].firstElementChild); // makes card blank
            cards[optionOneId].appendChild(cardback.cloneNode(true)); // returns card to cardback
            cards[optionTwoId].appendChild(cardback.cloneNode(true)); // returns card to cardback
        }
        cardsChosen = [];
        cardsChosenId = [];   
        console.log(p1Score); //testing    
    }

    // flip card
    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if(cardId != cardsChosenId[0]) {    // checks to ensure not selecting the same card again
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

createBoard()

})

