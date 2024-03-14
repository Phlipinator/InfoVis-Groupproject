import React from "react";
import "./../styles/Toggle.css"

/**
 * Toggle that can change modes between Compare and Overview
 */
export default class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            overview: this.props.overview,
        };
       
    }

    handleClick() {
        this.props.modeChanger(!this.props.overview)
    }

    ToggleSwitch(){
        return (
            <div id={"ToggleSwitch"}>
                <label className="switch">
                    <input type="checkbox" onClick={() => this.handleClick()}/>
                    <span className="slider round"/>
                </label>
            </div>
        );
    }

    LeftLabel() {
        return (
            <p  id = {"LabelLeft"}>
                Comparison
            </p>
        );
    }

    RightLabel() {
        return (
            <p id = {"LabelRight"}>
                Overview
            </p>
        );
    }

    render() {
        return (
            <div id={"ToggleContainer"}>
                {this.LeftLabel()}
                {this.ToggleSwitch()}
                {this.RightLabel()}
            </div>

        );
    }
}

