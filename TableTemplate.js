'use strict'

class TableTemplate {
    static fillIn(tableID, dict, columnName) {
        let tableBody = document.getElementById(tableID).children[0];

        // Fill in the header row
        let row = tableBody.children[0];
        let filler = new TemplateProcessor(row.innerHTML);
        row.innerHTML = filler.fillIn(dict);

        // Determine the index of the column that needs to be modified
        let column = 0;
        for (let i = 0; i < row.children.length; i++) {
            if (row.children[i] === columnName) {
                column = i;
            }
        }

        // Iterate through the remaining rows in the table and edit the correct column
        for (let i = 0; i < tableBody.children.length; i++) {
            filler = new TemplateProcessor(tableBody.children[i].children[column].innerHTML);
            tableBody.children[i].children[column].innerHTML = filler.fillIn(dict);
        }

        // Determine if the table is hidden, and if it is show it
        let table = document.getElementById(tableID);
        if (table.style.visibility === "hidden") {
            table.style.visibility = "visible";
        }
    }
}