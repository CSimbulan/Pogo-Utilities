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
    output = document.getElementById("output");
    input = document.getElementById("name");
    table = document.getElementById("ivtable");

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

    /*Table generator.*/
    for (var a=0; a<10; a++) {
        var row = table.insertRow(a);
        for (var b=0; b<10; b++) {
            var cell = row.insertCell(b);
            cell.innerHTML = atk + "," + def;
        }
    }





}
