let myCal = document.getElementById("adventCal");
let currentDate = new Date('2100-12-25');


function Door(calendar, day) {
    this.adventMessage = messages[day - 1][0];
    

    this.content = function () {
        let node = document.createElement("li");
        document.getElementById("adventDoors").appendChild(node);
        node.id = "door" + day;
        node.classList.add("door");

        let innerNode = document.createElement("a");
        node.appendChild(innerNode);
        innerNode.innerHTML = day;
        innerNode.href = "#";   

        if ( ( currentDate.getMonth() + 1 ) < 12 ||  currentDate.getDate() < day)  {
            innerNode.className = "disabled";
            innerNode.onclick = function () {
                return false;
            }
        } else {
            let adventMessage = this.adventMessage;
            innerNode.onclick = function () { 
                openDoorDiv(adventMessage, day);
            }
        }
    };
}

function openDoorDiv(adventMessage, day) {
    document.getElementById('doorOpenDiv').style.display = 'block';

    document.getElementById('doorOpenDiv').innerHTML = `
    <div class="openMessage">
    <h2 onclick="closeMessage()">x</h2>
    <h1>Türchen ${day}</h1>
    <img src="images/door_${day}.jpg" alt="">
    <h3>${adventMessage}</h3>
    <p><i>- Ich liebe dich!</i></p>
    </div>`;
}

function closeMessage() {
    document.getElementById('doorOpenDiv').innerHTML = '';
    document.getElementById('doorOpenDiv').style.display = 'none';
}


(function () {
    let doors = [];
    
    // Verwende die neue shuffleDoors-Funktion
    let shuffledDoorNumbers = shuffleDoors();

    // Erstelle Türchen in zufälliger Reihenfolge
    for (let i = 0; i < 24; i++) {
        let day = shuffledDoorNumbers[i];
        doors[i] = new Door(myCal, day);
        doors[i].content();
    }
    return doors;
})();

function shuffleDoors() {
    // Erstelle ein Array mit Zahlen von 1 bis 24
    let doorNumbers = Array.from({length: 24}, (_, i) => i + 1);
    
    // Fisher-Yates Shuffle-Algorithmus
    for (let i = doorNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [doorNumbers[i], doorNumbers[j]] = [doorNumbers[j], doorNumbers[i]];
    }
    
    return doorNumbers;
}
