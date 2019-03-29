/*This function happens when the page loads.*/
/*Links the calculate function to the button.*/
window.onload = function()
{
	var addButton = document.getElementById("calculate");
	addButton.onclick = calculate;
}

/*Calculates the CPs and IVs*/
function calculate() {
    var output = document.getElementById("output");
    var input = document.getElementById("name");
    var newT = document.createElement("table");
    output.appendChild(newT);
    for (var a=0; a<10; a++) {
        var row = newT.insertRow(a);
        for (var b=0; b<10; b++) {
            var cell = row.insertCell(b);
            cell.innerHTML = a + "," + b;
        }
    }
}