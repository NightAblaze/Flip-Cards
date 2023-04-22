document.addEventListener('DOMContentLoaded', () => {
    let cardArray = [];

    // create cards
    for (let i = 0; i < 16; i++){
        cardArray[i] = {shape: "triangle", colour: "red"}
    }
    // console.log(cardArray) // testing array has populated - working
    
    //create the back of the cards
    const cardback = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        cardback.setAttribute('x','25');
        cardback.setAttribute('y','80');
        cardback.setAttribute('class','cardback');
        cardback.setAttribute('stroke','black');
        cardback.setAttribute('stroke-width','3');
        cardback.setAttribute('fill','grey');
        cardback.innerHTML = "?"

    // console.log(cardback); // testing cardback is working - working

    // assign grid variable
    const grid = document.querySelector('.grid');
    
    // assign triangle variable for testing purposes
    let triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    triangle.setAttribute('points','50,10 90,90 10,90');
    triangle.setAttribute('stroke','black');
    triangle.setAttribute('stroke-width','3');
    triangle.setAttribute('fill','green');



    // create the board
    function createBoard() {
        for (let j = 0; j < cardArray.length; j++) {
            var card = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            card.setAttribute('data-id', j);
            card.setAttribute('width', '100');
            card.setAttribute('height', '100');
            card.appendChild(cardback); //  ONLY last entry is being appended
            // card.addEventListener('click', flipCard); // not created yet
            grid.appendChild(card);
            console.log(card);   // testing
        }
    }

createBoard()

})

