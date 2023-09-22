'use strict'

class TableTemplate {
    static fillIn(tableID, dict, columnName) {
        let table = document.getElementById(tableID);
        let tableBody = table.children[0];
        let rows = tableBody.children;

        // Fill in the header row
        let filler = new TemplateProcessor(rows[0].innerHTML);
        rows[0].innerHTML = filler.fillIn(dict);

        // Determine the index of the column that needs to be modified
        let column = -1;
        for (let i = 0; i < rows[0].children.length; i++) {
            if (rows[0].children[i].innerHTML === columnName) {
                column = i;
            }
        }

        // Iterate through the remaining rows in the table and edit the correct column
        if (column === -1) {
            for (let r = 0; r < rows.length; r++) {
                for (let c = 0; c < rows[r].children.length; c++) {
                    filler = new TemplateProcessor(rows[r].children[c].innerHTML);
                    rows[r].children[c].innerHTML = filler.fillIn(dict)
                }
            }
        } else {
            for (let i = 0; i < rows.length; i++) {
                filler = new TemplateProcessor(rows[i].children[column].innerHTML);
                rows[i].children[column].innerHTML = filler.fillIn(dict);
            }
        }


        // Determine if the table is hidden, and if it is show it

        if (table.style.visibility === "hidden") {
            table.style.visibility = "visible";
        }
    }
}