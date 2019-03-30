/*This function happens when the page loads.*/
window.onload = function()
{
    /*Links the calculate function to the button.*/
	var addButton = document.getElementById("calculate");
    addButton.onclick = calculate;
    
    /*Loads the base stats file and stores into a global.*/
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.basestats = this.responseText.split("\n");
        }
    }
    xhttp.open("GET", "basestats.txt", true);
    xhttp.send();
}

/*Calculates the CPs and IVs*/
function calculate() {

    /*Get elements from HTML doc and create new table.*/
    var output = document.getElementById("output");
    var input = document.getElementById("name");
    var table = document.getElementById("ivtable");
    var statsArray = [];

    /*Clear the table*/
    table.innerHTML = "";
    
    /*Match input string to base stats*/
    var name = input.value.toLowerCase();
    for (var i=0; i<window.basestats.length; i++) {
        var line = window.basestats[i].split(",");
        if (name == line[0].toLowerCase()) {
            var atk = parseInt(line[1]);
            var def = parseInt(line[2]);
            var sta = parseInt(line[3]);
            /*
            var newp = document.createElement("p");
            newp.innerHTML = line + name + atk + def + sta;
            output.appendChild(newp); */
        }
    }

    for (var at=15; at>9; at--) {
        for (var de=15; de>9; de--) {
            for (var st=15; st>9; st--) {
                var iv = (at + de + st) / 45.0 * 100;
                var cp20 = Math.floor((atk + at) * Math.sqrt(def + de) * Math.sqrt(sta + st) * Math.pow(0.59740001,2) / 10);
                var cp25 = Math.floor((atk + at) * Math.sqrt(def + de) * Math.sqrt(sta + st) * Math.pow(0.667934,2) / 10);
                var cp40 = Math.floor((atk + at) * Math.sqrt(def + de) * Math.sqrt(sta + st) * Math.pow(0.79030001,2) / 10);
                var hp20 = Math.floor((sta + st) * 0.59740001);
                var hp25 = Math.floor((sta + st) * 0.667934);
                var hp40 = Math.floor((sta + st) * 0.79030001);
                var newArray = [cp20, hp20, cp25, hp25, iv.toFixed(1), at, de, st, cp40, hp40];
                statsArray.push(newArray);
            }
        }
    }

    statsArray.sort(sortFunction);

    /*Table generator.*/
    var row = table.insertRow(0);
    row.innerHTML = "<th>CP@20</th><th>HP@20</th><th>CP@25<th>HP@25</th><th>IV%</th><th>ATT</th><th>DEF</th><th>STA</th><th>CP@40</th><th>HP@40</th>";

    for (var a=0; a<statsArray.length; a++) {
        row = table.insertRow(a+1);
        for (var b=0; b<statsArray[0].length; b++) {
            var cell = row.insertCell(b);
            cell.innerHTML = statsArray[a][b];
        }
    }

    




}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}