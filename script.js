const cardsContainer = document.querySelector('.cards--container');
const dragFromHereDiv = document.querySelector('.drag--from--here');
const dragIntoHereDiv = document.querySelector('.drag--into--here');

const createCardsImages = () => {
    const card1 = document.createElement('img');
    card1.src = 'cartas/Alexa.png';

    const card2 = document.createElement('img');
    card2.src = 'cartas/Elemental de Água Gigante.png';

    const card3 = document.createElement('img');
    card3.src = 'cartas/Gigante Marinho.png';
    
    const card4 = document.createElement('img');
    card4.src = 'cartas/Leviatã.png';
    

    [card1, card2, card3, card4].forEach((card) => {
        card.className = 'carta';
        card.draggable = true;
      });
      
      dragFromHereDiv.append(card1, card2);

      dragIntoHereDiv.append(card3, card4);

      return [card1, card2, card3, card4];

};

let draggedCard = null;
let offsetX = 0;
let offsetY = 0;

const touchStart = (event) => {
    draggedCard = event.target;
    const touch = event.touches[0];

    // Calcula o offset para a posição correta durante o movimento
    offsetX = touch.clientX - draggedCard.getBoundingClientRect().left;
    offsetY = touch.clientY - draggedCard.getBoundingClientRect().top;

    event.preventDefault();
    event.dataTransfer.effectAllowed = 'move';
};


const touchMove = (event) => {
    if (draggedCard) {
        const touch = event.touches[0];
        draggedCard.style.position = 'absolute';
        draggedCard.style.left = `${touch.clientX - offsetX}px`;
        draggedCard.style.top = `${touch.clientY - offsetY}px`;
    };
};


const touchEnd = (event) => {
    if (!draggedCard) return;

     // Verifica se a carta foi solta sobre um contêiner válido
     const touch = event.changedTouches[0];
     const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

     if (dropTarget && (dropTarget.classList.contains('drag--from--here') || dropTarget.classList.contains('drag--into--here'))) {
        dropTarget.appendChild(draggedCard);
        draggedCard.style.position = ''; // Remove o posicionamento absoluto
        draggedCard.style.left = ''; // Limpa as propriedades de estilo
        draggedCard.style.top = '';
    };
    
    draggedCard = null;
};


const dropCard = ( { target } ) => {
    if (target.classList.contains("column--highlight")) {
        target.classList.remove("column--highlight");
        if (!(target.classList.contains("column"))) {
            target.classList.add("column");
        };
    };
    target.append(draggedCard);
;}

const cards = createCardsImages();

cards.forEach( (card) => {
    card.addEventListener("touchstart", touchStart);
    card.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
});

//dragFromHereDiv.addEventListener("dragover", dragOver);
dragFromHereDiv.addEventListener("touchend", touchEnd);

//dragIntoHereDiv.addEventListener("dragenter", dragEnter);
//dragIntoHereDiv.addEventListener("dragover", dragOver);
dragIntoHereDiv.addEventListener("touchend", touchEnd);
dragIntoHereDiv.addEventListener("drop", dropCard);
