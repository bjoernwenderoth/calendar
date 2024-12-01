let myCal = document.getElementById("adventCal");
let currentDate = new Date();

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

        if ( /* ( currentDate.getMonth() + 1 ) < 12 || */ currentDate.getDate() < day) {
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
    <img src="/images/door_${day}.jpg" alt="">
    <h3>${adventMessage}</h3>
    <p>- Ich liebe dich!</p>
    </div>`;
}

function closeMessage() {
    document.getElementById('doorOpenDiv').innerHTML = '';
    document.getElementById('doorOpenDiv').style.display = 'none';
}

(function () {
    let doors = [];
    for (let i = 0; i < 24; i++) {
        doors[i] = new Door(myCal, i + 1);
        doors[i].content();
    }
    return doors;
})();