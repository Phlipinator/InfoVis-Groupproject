import React from "react";
import "./../styles/CompareLegend.css";

/**
 * creates dynamic Helper Text for The Chats-Component
 *
 * @returns {JSX.Element}
 */
export default class CompareLegend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compareCountry1: this.props.compareCountry1,
            compareCountry2: this.props.compareCountry2,
        };
    }

    /**
     * Turns the Countries names from abbreviations into the real name
     *
     * @param iso2 The abbreviation of the country
     * @returns {string} The real name of the country
     */
    getCountryName(iso2) {
        switch(iso2){
            case "DE":
                return "Germany";
                break;
            case "FR":
                return "France";
                break;
            case "GB":
                return "Great Britain";
                break;
            case "CH":
                return "Switzerland"
                break;
            case "IT":
                return "Italy"
                break;
        }
    }


    /**
     * Creates a div output for each case, 0, 1 or 2 countries selected to be shown as a legend
     * @returns {JSX.Element} the div to be shown as a legend
     */
    LegendCreator() {
        if (this.props.compareCountry1 === null && this.props.compareCountry2 === null) {
            return(
                <div>
                    <p>Please select two countries that you want to compare</p>
                </div>
            )
        }
        if (this.props.compareCountry1 !== null && this.props.compareCountry2 === null) {
            return(
                <div>
                    <p>
                        Please select another country you want to compare to
                        <span className={"country1"}> {this.getCountryName(this.props.compareCountry1)} </span>
                    </p>
                </div>
            )

        }
        if (this.props.compareCountry2 !== null && this.props.compareCountry1 === null) {
            return(
                <div>
                    <p>
                        Please select another country you want to compare to

                        <span className={"country2"}> {this.getCountryName(this.props.compareCountry2)}</span>
                    </p>
                </div>
            )

        }
        if (this.props.compareCountry1 !== null && this.props.compareCountry2 !== null) {
            return(
                <div>
                    <p>Comparing
                        <span className={"country1"}> {this.getCountryName(this.props.compareCountry1)} </span>
                         to
                        <span className={"country2"}> {this.getCountryName(this.props.compareCountry2)} </span>
                    </p>
                </div>
            )

        }
    }


    /**
     * Help-Text
     *
     * @returns {JSX.Element} The Output
     */
    render()
    {
        return(

            <div id={"Legend"}>
                {this.LegendCreator()}
            </div>
        );

    }
};
