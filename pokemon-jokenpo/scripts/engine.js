const state = {
    score: {
        player01: 0,
        player02: 0,
        scoreBox: document.getElementById("score__points")
    },
    cardSprites: {
        image: document.getElementById("card-details__image"),
        name: document.getElementById("card-details__name"),
        type: document.getElementById("card-details__type")
    },
    activeCards: {
        player01: document.getElementById("player-01-active-card"),
        player02: document.getElementById("player-02-active-card"),
    },
    actions: {
        button: document.getElementById("next-round")
    }
}

const players = {
    player01: "player-01-cards",
    player02: "player-02-cards"
}

const imagesPath = "./assets/images/";

const cardsData = [
    {
        id: 0,
        name: "Blastoise",
        type: "Water",
        img: `${imagesPath}blastoise.png`,
        win: [1, 3],
        lose: [3, 5]
    },
    {
        id: 1,
        name: "Charizard",
        type: "Fire",
        img: `${imagesPath}charizard.png`,
        win: [3, 5],
        lose: [0, 2]
    },
    {
        id: 2,
        name: "Gyarados",
        type: "Water",
        img: `${imagesPath}gyarados.png`,
        win: [1, 4],
        lose: [3, 5]
    },
    {
        id: 3,
        name: "Jolteon",
        type: "Electric",
        img: `${imagesPath}jolteon.png`,
        win: [0, 2],
        lose: [1, 4]
    },
    {
        id: 4,
        name: "Ninetales",
        type: "Fire",
        img: `${imagesPath}ninetales.png`,
        win: [3, 5],
        lose: [0, 2]
    },
    {
        id: 5,
        name: "Zapdos",
        type: "Electric",
        img: `${imagesPath}zapdos.png`,
        win: [0, 2],
        lose: [1, 4]
    },
];

async function getRandomCardId(params) {
    const randomIndex = Math.floor(Math.random() * cardsData.length);
    return cardsData[randomIndex].id;
}

async function createCardImage(id, player) {
    const card = document.createElement("div");
    card.classList.add("card-box__card");

    const cardImage = document.createElement("img");
    cardImage.classList.add("card-box__card-pokemon");
    cardImage.setAttribute("src", "./assets/images/card-back.svg");
    cardImage.setAttribute("data-id", id);

    card.appendChild(cardImage);

    if(player === players.player01) {
        card.addEventListener("click", () => {
            setActiveCard(cardImage.getAttribute("data-id"));
        });

        card.addEventListener("mouseover", () => {
           drawSelectedCard(id);
        });
    }

    return card;
}

async function setActiveCard(id) {
    await removeAllCardImages();

    let player02CardId = await getRandomCardId();

    state.activeCards.player01.style.display = "block";
    state.activeCards.player02.style.display = "block";

    state.activeCards.player01.src = cardsData[id].img;
    state.activeCards.player02.src = cardsData[player02CardId].img;

    let roundResults = await checkRoundResults(id, player02CardId);

    /*await updateScore()
    await drawButton(roundResults);*/
}

async function removeAllCardImages() {
    let divElements = document.getElementById(players.player01).querySelectorAll("div");
    divElements.forEach((div) => div.remove());

    divElements = document.getElementById(players.player02).querySelectorAll("div");
    divElements.forEach((div) => div.remove());
}

async function drawSelectedCard(id) {
    state.cardSprites.image.src = cardsData[id].img;
    state.cardSprites.name.innerText = cardsData[id].name;
    state.cardSprites.type.innerText = cardsData[id].type;
}

async function drawCards(cardsNumber, player) {
    for (let i = 0; i < cardsNumber; i++) {
        const randomCardId = await getRandomCardId();
        const cardImage = await createCardImage(randomCardId, player);

        document.getElementById(player).appendChild(cardImage);
    }
}

function init() {
    drawCards(6, players.player01);
    drawCards(6, players.player02);
}

init();