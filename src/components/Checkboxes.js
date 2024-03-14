import React from "react";
import "./../styles/Checkboxes.css"

/**
 * Creates the Checkboxes to select and unselect Categories to be shown.
 * <p>
 *     This Class receives "selectedCategories" and "selectionChanger" as props.
 *     @property selectedCategories is an Array containing each Category with ID and "selected"-boolean
 *     @property selectionChanger is a method called to update the parent component's state.
 */
export default class Checkboxes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkboxes: this.props.selectedCategories,
        };
    }

    /**
     * Handles the onClick() Call of a Checkbox.
     * <p>
     *     This method inverts the boolean value in 'checkboxArray' for the entry with corresponding id.
     *     It informs the parent component about the change by calling the selectionChanger method.
     *
     * @param id is the ID of the checkbox that has been clicked
     */
    handleClick(id){
        checkboxArray[id][2] = !checkboxArray[id][2];
        this.props.selectionChanger(checkboxArray);
    }

    /**
     * Creates the Checkbox fitting the ID.
     * <p>
     *     This method uses the ID to check for the corresponding label, then calls @link{#Checkbox}
     *     with that label and the same id to create the actual checkbox.
     *
     * @param id is the ID of the checkbox to be created
     * @returns {JSX.Element}
     * @constructor
     */
    CheckboxCreator(id) {
        let label;

        for (let i = 0; i < checkboxArray.length; i++) {
            if (checkboxArray[i][0] === id) {
                label = checkboxArray[i][1]
            }
        }

        return (
            <div>
                {this.Checkbox(id, label)}
            </div>
        );
    }


    /**
     * Creates a labeled Checkbox.
     * <p>
     *     This method is called by the @Link{#CheckboxCreator} only.
     *     Every Checkbox has an individual ID to be identified.
     *
     * @param id is the ID of the checkbox created
     * @param label is the Label that will appear besides the checkbox
     * @returns {JSX.Element}
     * @constructor
     */
    Checkbox(id, label) {
        return (
            <div>
                <input type="checkbox" class="checkboxes" id="myCheck"  onClick={() => this.handleClick(id)}/>
                <label htmlFor="myCheck">{label}</label>
            </div>
        );
    }

    /**
     * Renders a div container with 8 checkboxes.
     * <p>
     *     Creates a div "Checkboxes" containing two divs "column", each containing 4 checkboxes, created by
     *     the @link{#CheckboxCreator}. Hard-Coded with the IDs 0 to 7.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div id={"Checkboxes"}>
                <div className={"column"}>
                    {this.CheckboxCreator(0)}
                    {this.CheckboxCreator(1)}
                    {this.CheckboxCreator(2)}
                    {this.CheckboxCreator(3)}
                </div>
                <div className={"column"}>
                    {this.CheckboxCreator(4)}
                    {this.CheckboxCreator(5)}
                    {this.CheckboxCreator(6)}
                    {this.CheckboxCreator(7)}
                </div>

            </div>

        );
    }
}

//A 2d array is created to store an id, a text and a boolean for each Checkbox
//checkboxArray[_][0] stores the ID.
//checkboxArray[_][1] stores the text.
//checkboxArray[_][1] stores the boolean.
let checkboxArray = new Array(8);

for (let i = 0; i < checkboxArray.length; i++) {
    checkboxArray[i] = new Array(4);
}


//The Array gets initialized for the id and the boolean
//The id just gets a running number and all booleans are initialized on false
for (let x = 0; x < checkboxArray.length; x++) {
    checkboxArray[x][0] = x;
    checkboxArray[x][2] = false;
}

//The Array gets initialized for the labels
checkboxArray[0][1] = "Human Necessities";
checkboxArray[1][1] = "Transporting";
checkboxArray[2][1] = "Chemistry";
checkboxArray[3][1] = "Textiles";
checkboxArray[4][1] = "Fixed Constructions";
checkboxArray[5][1] = "Mechanical Engineering";
checkboxArray[6][1] = "Physics";
checkboxArray[7][1] = "Electricity";

//The Array gets initialized for the labels
checkboxArray[0][3] = "A ";
checkboxArray[1][3] = "B ";
checkboxArray[2][3] = "C ";
checkboxArray[3][3] = "D ";
checkboxArray[4][3] = "E ";
checkboxArray[5][3] = "F ";
checkboxArray[6][3] = "G ";
checkboxArray[7][3] = "H ";

