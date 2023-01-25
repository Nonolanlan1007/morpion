let players = []
let matchs = []

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

async function addPlayer () {
	let name = document.getElementById("addPlayer").value;

    if (name === undefined || name === "") return alert("Veuillez entrer un nom de joueur.")

	const player = players.find(x => x.name === name)

	if (player) return alert("Ce joueur est déjà dans la liste des participants !")

    if (name.includes(" ")) return alert("Les espaces sont interdits !")

    if (name.includes(".")) return alert("Les points sont interdits !")

	players.push({
		id: players.length + 1,
		name: name,
        points: 0
	})

	document.getElementById("playersTable").innerHTML = `
		<tr>
            <td>Joueurs</td>
            <td>Action</td>
        </tr>
        ${players.map(x => `
        	<tr>
            <td>
                ${x.name}
            </td>
            <td>
                <button id="removePlayerBtn" onclick="removePlayer(${x.id})">Retirer</button>
            </td>
        </tr>
        `).join("\n")}
        <tr>
            <td>
                <input type="text" placeholder="Jean Michel" id="addPlayer" />
            </td>
            <td>
                <button id="addPlayerBtn" onclick="addPlayer()">Ajouter</button>
            </td>
        </tr>
	`
}

async function startGame () {
    if (players.length < 3) return alert("Vous devez être au moins 3 joueurs pour pouvoir commencer une partie en mode tournois.")

    document.getElementById("leftDivs").style.display = "block"

    matchMaking()
    shuffleMatchs();

    drawLeaderboard()
    drawNextMatchs()  

    const match = matchs[0]
    matchs = matchs.filter(x => x.id !== match.id);
    match.current = true
    matchs.push(match)
    const currentMatch = matchs.find(x => x.current === true)

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    const currentPlayer = match.players[randomIntFromInterval(0, 1)]
    document.getElementById("title").innerHTML = `
    <h1>Jeu !</h1>
    <h2>C'est <span class="special">${players.find(x => x.id === currentPlayer).name}</span> qui commence !</h2>`
    document.getElementById("one").style.display = "none"
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
 * @param {Number} id 
 */
async function removePlayer (id) {
    const player = players.find(x => x.id === id)

    if (!player) return alert("Joueur introuvable !")

    players = players.filter(x => x.id !== player.id)

    let newArray = []

    players.forEach(x => {
        newArray.push({
            id: newArray + 1,
            name: x.name
        })
    })

    players = newArray

    console.log(newArray)

    document.getElementById("playersTable").innerHTML = `
		<tr>
            <td>Joueurs</td>
            <td>Action</td>
        </tr>
        ${players.map(x => `
        	<tr>
            <td>
                ${x.name}
            </td>
            <td>
                <button id="removePlayerBtn" onclick="removePlayer(${x.id})">Retirer</button>
            </td>
        </tr>
        `).join("\n")}
        <tr>
            <td>
                <input type="text" placeholder="Jean Michel" id="addPlayer" />
            </td>
            <td>
                <button id="addPlayerBtn" onclick="addPlayer()">Ajouter</button>
            </td>
        </tr>
	`
}


/**
 * @param {String} - Text dont vous souhaitez retirer les espaces.
 * @return {String} - Votre texte sans espaces.
 */
async function removeSpaces (text) {
    return text.replace(/ /g, "")
}

async function matchMaking () {
    players.forEach(x => {
        players.forEach(y => {
            if (y.id === x.id) return;

            const match = matchs.find(x => x.players.includes(x.id) && x.players.includes(y.id))

            if (match) return;

            matchs.push({
                id: matchs.length + 1,
                winner: undefined,
                current: false,
                players: [y.id, x.id]
            })
        })
    })
}

async function shuffleMatchs () {
    for (let i = matchs.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [matchs[i], matchs[j]] = [matchs[j], matchs[i]];
    }
}

async function drawLeaderboard () {
    let leaderboard = players.filter(x => x.points > 0)

    if (leaderboard.length === 0) {
        return document.getElementById("lbDiv").innerHTML = `
            <h2 class="special">Classement</h2>
            <p>En attente du premier match...</p>
        `
    }

    leaderboard = leaderboard.sort((a, b) => a.points > b.points)

    document.getElementById("lbDiv").innerHTML = `
        <h2 class="special">Classement</h2>
        ${leaderboard.map((x, y) => `<p><b class="special">#${y + 1}</b> ${x.name} avec <span class="special">${x.points}</span> points</p>`).slice(0, 6).join("\n")}
    `
}

async function drawNextMatchs () {
    let nextMatchs = matchs.filter(x => x.winner === undefined)

    if (nextMatchs.length === 0) {
        return document.getElementById("nextMatchsDiv").innerHTML = `
            <h2 class="special">Prochains matchs</h2>
            <p>En de la création du match...</p>
        `
    }
    
    document.getElementById("nextMatchsDiv").innerHTML = `
        <h2 class="special">Prochains matchs</h2>
        ${nextMatchs.map((x) => `<p>${players.find(y => y.id === x.players[0])?.name} <b class="special">VS</b> ${players.find(y => y.id === x.players[1])?.name}</p>`).slice(0, 6).join("\n")}
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
        drawGameBoard()
        let allCases = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]

        for (const Case in allCases) {
            document.getElementById(allCases[Case]).disabled = "disabled";
        }
        nextMatch(currentPlayer)
    }
    if (win === false) {
        nextPlayer(currentPlayer)
        drawGameBoard()
    }
}

function nextPlayer (currentP) {
    currentPlayer = currentP === matchs.find(x => x.current === true).players[0] ? matchs.find(x => x.current === true).players[1] : matchs.find(x => x.current === true).players[0]
    document.getElementById("title").innerHTML = `
        <h1>Jeu</h1>
        <h2>C'est au tour de <span class="special">${players.find(x => x.id === currentPlayer).name}</span> !</h2>`
}

function checkWin () {
    let win = false
    if (currentPlayer === matchs.find(x => x.current === true).players[0] && player1Cases.length >= 3) {
        for (const possibility in Possibleswins) {
            if (player1Cases.includes(Possibleswins[possibility][0]) && player1Cases.includes(Possibleswins[possibility][1]) && player1Cases.includes(Possibleswins[possibility][2])) win = true
        }
    }
    if (currentPlayer === matchs.find(x => x.current === true).players[1] && player2Cases.length >= 3) {
        for (const possibility in Possibleswins) {
            if (player2Cases.includes(Possibleswins[possibility][0]) && player2Cases.includes(Possibleswins[possibility][1]) && player2Cases.includes(Possibleswins[possibility][2])) win = true
        }
    }
    return win
}

function saveCase(Case) {
    if (currentPlayer === matchs.find(x => x.current === true).players[0]) {
        player1Cases.push(Case)
    }
    if (currentPlayer === matchs.find(x => x.current === true).players[1]) {
        player2Cases.push(Case)
    }
}

function nextMatch (winner) {
    let match = matchs.find(x => x.current === true)

    match.current = false;
    match.winner = currentPlayer

    const player = players.find(x => x.id === currentPlayer)

    player.points += 1;

    let finishedMatchs = matchs.filter(x => x.current === false && winner === undefined).length

    const nextMatch = matchs[finishedMatchs-1];
    console.log(matchs)
    console.log(nextMatch)
}