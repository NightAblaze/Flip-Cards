document.addEventListener('DOMContentLoaded', () => {
    let cardArray = {};

    // create cards
    for (let i = 0; i < 16; i++){
        cardArray[i] = {shape: "triangle", colour: "red"}
    }

    console.log(cardArray) // testing array has populated
    console.log(cardArray.length); // NEEDS SORTING - CURRENTLY UNDEFINED

    const cardback = document.createElement('text')
        cardback.setAttribute('x','25');
        cardback.setAttribute('y','80');
        cardback.setAttribute('class','cardback');
        cardback.setAttribute('stroke','black');
        cardback.setAttribute('stroke-width','3');
        cardback.setAttribute('fill','grey');
        document.getElementsByClassName("cardback").innerHTML = "?";

    console.log(cardback); // testing cardback is working

    const triangle = document.createElement('polygon')
        triangle.setAttribute('points','50,10 90,90 10,90');
        triangle.setAttribute('stroke','black');
        triangle.setAttribute('stroke-width','3');
        triangle.setAttribute('fill','green');

    const grid = document.querySelector('.grid');

    // create the board
    function createBoard() {
        for (let j = 0; j < 16; j++) {
            let card = document.createElement('svg');
            card.setAttribute('data-id', j);
            card.setAttribute('width', '100');
            card.setAttribute('height', '100');
            card.appendChild(cardback);
            // card.addEventListener('click', flipcard); // not created yet
            grid.appendChild(card);
            console.log(card);   // testing
        }
    }

createBoard()

})

