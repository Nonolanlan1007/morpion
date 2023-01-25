let player1;
let player2;

let plate = {
    a: {
        a1: 0,
        a2: 0,
        a3: 0
    },
    b: {
        b1: 0,
        b2: 0,
        b3: 0
    },
    c: {
        c1: 0,
        c2: 0,
        c3: 0
    }
}

let Possibleswins = [
    // horizontal
    ["A1", "A2", "A3"],
    ["B1", "B2", "B3"],
    ["C1", "C2", "C3"],

    // vertical
    ["A1", "B1", "C1"],
    ["A2", "B2", "C2"],
    ["A3", "B3", "C3"],

    // diagonales
    ["A1", "B2", "C3"],
    ["A3", "B2", "C1"],
]

let player1Cases = []
let player2Cases = []

let currentPlayer = 1;
const player1Item = "croix.png"
const player2Item = "rond.png"
const none = "vide.png"

function setPlayersNames () {
    player1 = document.getElementById("player1").value
    player2 = document.getElementById("player2").value
    document.getElementById("formDiv").style.display = "none"
    document.getElementById("title").style.display = "block"
    gameManager(true, false, false)
    drawGameBoard()
}

function drawGameBoard () {
    document.getElementById("line1").innerHTML = `
        <button id="A1" onclick="caseSelector('A1')" ${player1Cases.includes("A1") || player2Cases.includes("A1") ? "disabled" : ""}><img src="${getPlayerOnCase("A1") === 1 ? player1Item : getPlayerOnCase("A1") === 2 ? player2Item : none}" width="50" height="50"></button>
        <hr width="0.5px" size="50px" />
        <button id="A2" onclick="caseSelector('A2')" ${player1Cases.includes("A2") || player2Cases.includes("A2") ? "disabled" : ""}><img src="${getPlayerOnCase("A2") === 1 ? player1Item : getPlayerOnCase("A2") === 2 ? player2Item : none}" width="50" height="50"></button>
        <hr width="0.5px" size="50px" />
        <button id="A3" onclick="caseSelector('A3')" ${player1Cases.includes("A3") || player2Cases.includes("A3") ? "disabled" : ""}><img src="${getPlayerOnCase("A3") === 1 ? player1Item : getPlayerOnCase("A3") === 2 ? player2Item : none}" width="50" height="50"></button>
    `
    document.getElementById("line2").innerHTML = `
        <button id="B1" onclick="caseSelector('B1')" ${player1Cases.includes("B1") || player2Cases.includes("B1") ? "disabled" : ""}><img src="${getPlayerOnCase("B1") === 1 ? player1Item : getPlayerOnCase("B1") === 2 ? player2Item : none}" width="50" height="50"></button>
        <hr width="0.5px" size="50px" />
        <button id="B2" onclick="caseSelector('B2')" ${player1Cases.includes("B2") || player2Cases.includes("B2") ? "disabled" : ""}><img src="${getPlayerOnCase("B2") === 1 ? player1Item : getPlayerOnCase("B2") === 2 ? player2Item : none}" width="50" height="50"></button>
        <hr width="0.5px" size="50px" />
        <button id="B3" onclick="caseSelector('B3')" ${player1Cases.includes("B3") || player2Cases.includes("B3") ? "disabled" : ""}><img src="${getPlayerOnCase("B3") === 1 ? player1Item : getPlayerOnCase("B3") === 2 ? player2Item : none}" width="50" height="50"></button>
    `
    document.getElementById("line3").innerHTML = `
        <button id="C1" onclick="caseSelector('C1')" ${player1Cases.includes("C1") || player2Cases.includes("C1") ? "disabled" : ""}><img src="${getPlayerOnCase("C1") === 1 ? player1Item : getPlayerOnCase("C1") === 2 ? player2Item : none}" width="50" height="50"></button>
        <hr width="0.5px" size="50px" />
        <button id="C2" onclick="caseSelector('C2')" ${player1Cases.includes("C2") || player2Cases.includes("C2") ? "disabled" : ""}><img src="${getPlayerOnCase("C2") === 1 ? player1Item : getPlayerOnCase("C2") === 2 ? player2Item : none}" width="50" height="50"></button>
        <hr width="0.5px" size="50px" />
        <button id="C3"  onclick="caseSelector('C3')" ${player1Cases.includes("C3") || player2Cases.includes("C3") ? "disabled" : ""}><img src="${getPlayerOnCase("C3") === 1 ? player1Item : getPlayerOnCase("C3") === 2 ? player2Item : none}" width="50" height="50"></button>
    `
}

/**
 * @param {String} Case Case où trouver le joueur
 * @returns {String}
 */
function getPlayerOnCase (Case) {
    switch (Case) {
        case "A1": {
            return plate.a.a1
            break;
        }
        case "A2": {
            return plate.a.a2
            break;
        }
        case "A3": {
            return plate.a.a3
            break;
        }
        case "B1": {
            return plate.b.b1
            break;
        }
        case "B2": {
            return plate.b.b2
            break;
        }
        case "B3": {
            return plate.b.b3
            break;
        }
        case "C1": {
            return plate.c.c1
            break;
        }
        case "C2": {
            return plate.c.c2
            break;
        }
        case "C3": {
            return plate.c.c3
            break;
        }
    }
}

function caseSelector (Case) {
    switch (Case) {
        case "A1": {
            document.getElementById(Case).disabled = true

            plate.a.a1 = currentPlayer
            break;
        }
        case "A2": {
            document.getElementById(Case).disabled = "disabled"
            plate.a.a2 = currentPlayer
            break;
        }
        case "A3": {
            document.getElementById(Case).disabled = "disabled"
            plate.a.a3 = currentPlayer
            break;
        }
        case "B1": {
            document.getElementById(Case).disabled = "disabled"
            plate.b.b1 = currentPlayer
            break;
        }
        case "B2": {
            document.getElementById(Case).disabled = "disabled"
            plate.b.b2 = currentPlayer
            break;
        }
        case "B3": {
            document.getElementById(Case).disabled = "disabled"
            plate.b.b3 = currentPlayer
            break;
        }
        case "C1": {
            document.getElementById(Case).disabled = "disabled"
            plate.c.c1 = currentPlayer
            break;
        }
        case "C2": {
            document.getElementById(Case).disabled = "disabled"
            plate.c.c2 = currentPlayer
            break;
        }
        case "C3": {
            document.getElementById(Case).disabled = "disabled"
            plate.c.c3 = currentPlayer
            break;
        }
    }

    saveCase(Case)

    if ((player1Cases.length + player2Cases.length) === 9 && !checkWin()) {
        document.getElementById("title").innerHTML = `
        <h1>Partie terminée</h1>
        <h2>Match <span class="special">nul</span> !</h2>`
        drawGameBoard()
        document.getElementById("restartBtn").style.display = "block"
        return;
    }

    let win = checkWin()
    if (win === true) {
        gameManager(false, false, true)
        drawGameBoard()
        let allCases = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]

        for (const Case in allCases) {
            document.getElementById(allCases[Case]).disabled = "disabled";
        }
    }
    if (win === false) {
        nextPlayer(currentPlayer)
        gameManager(false, true, false)
        drawGameBoard()
    }
}

function nextPlayer (currentP) {
    currentPlayer = currentP === 1 ? 2 : 1
    document.getElementById(currentP === 1 ? "player2" : "player1").style.color = "#00FF2E"
    document.getElementById(currentP === 2 ? "player2" : "player1").style.color = "#000000"
}

function checkWin () {
    let win = false
    if (currentPlayer === 1 && player1Cases.length >= 3) {
        for (const possibility in Possibleswins) {
            if (player1Cases.includes(Possibleswins[possibility][0]) && player1Cases.includes(Possibleswins[possibility][1]) && player1Cases.includes(Possibleswins[possibility][2])) win = true
        }
    }
    if (currentPlayer === 2 && player2Cases.length >= 3) {
        for (const possibility in Possibleswins) {
            if (player2Cases.includes(Possibleswins[possibility][0]) && player2Cases.includes(Possibleswins[possibility][1]) && player2Cases.includes(Possibleswins[possibility][2])) win = true
        }
    }
    return win
}

function saveCase(Case) {
    if (currentPlayer === 1) {
        player1Cases.push(Case)
    }
    if (currentPlayer === 2) {
        player2Cases.push(Case)
    }
}

/**
 * 
 * @param {Boolean} starter 
 * @param {Boolean} normal 
 * @param {Boolean} end 
 */
function gameManager (starter, normal, end) {
    if (starter === true) {
        let players = [];
        players.push(player1)
        players.push(player2)
        let player = Math.floor(Math.random()*players.length + 1);
        currentPlayer = player
        document.getElementById("title").innerHTML = `
        <h1>Jeu !</h1>
        <h2>C'est <span class="special">${currentPlayer === 2 ? player2 : player1}</span> qui commence !</h2>`
    }
    if (normal === true) {
        document.getElementById("title").innerHTML = `
        <h1>Jeu</h1>
        <h2>C'est au tour de <span class="special">${currentPlayer === 2 ? player2 : player1}</span> !</h2>`
    }
    if (end === true) {
        document.getElementById("title").innerHTML = `
        <h1>Partie terminée</h1>
        <h2>Victoire de <span class="special">${currentPlayer === 2 ? player2 : player1}</span> !</h2>`
        document.getElementById("restartBtn").style.display = "block"
    }
}

function restartGame () {
    window.location.href = `${window.location.href.split("?")[0]}?player1=${encodeURI(player1)}&player2=${encodeURI(player2)}`
}