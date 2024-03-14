import React from "react";
import "./../styles/TimeSlider.css";

/**
 * creates a TimeSlider from the year 1980 to 2014.
 *
 * @returns {JSX.Element}
 */
export default class TimeSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedYear: this.props.selectedYear
        };
    }

    /**
     * alerts parent that selection year has changed
     *
     */
    onChange(e) {
        const newVal = e.target.value;
        this.setState({selectedYear: newVal});
        this.props.selectionYear(newVal);
            
    }

    /**
     * Timeslider
     *
     * @returns {JSX.Element}
     */
    render(){
        return(

            <div id={"TimeSlider"}>
                <p>{this.state.selectedYear}</p>
                <input type="range"
                       class="timeSlider"
                step="1"
                min="1980"
                max="2014"
                value={this.state.selectedYear}
                onChange={this.onChange.bind(this)}
                />
            </div>
        );

    }
};
