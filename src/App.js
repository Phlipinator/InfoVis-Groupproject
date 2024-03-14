import Header from "./components/Header";
import OverviewCharts from "./components/OverviewCharts";
import CompareCharts from "./components/CompareCharts";
import Toggle from "./components/Toggle";
import Checkboxes from "./components/Checkboxes";
import OverviewMap from "./components/OverviewMap";
import CompareMap from "./components/CompareMap";
import TimeSlider from './components/TimeSlider';
import CompareLegend from "./components/CompareLegend";
import Helper from './components/Helper';

import React from "react";

/**
 * The App class contains all contents and states.
 *
 * @state selectedCategories stores an Array containing each Category, an ID and "selected"-boolean.
 * @state overview is a boolean to determine the current view
 */
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.changeSelectedCategories = this.changeSelectedCategories.bind(this);
        this.changeSelectedMode = this.changeSelectedMode.bind(this)
        this.setCompareCountries = this.setCompareCountries.bind(this);
        this.state = {
            selectedCategories: new Array(8).fill(new Array(4)),
            overview: false,
            selectedYear: 1980,
            compareCountry1: null,
            compareCountry2: null,
        };

    }

    /**
     * Changes the state.selectedCategories
     * <p>
     *     This method is used by the child components to update the state.selectedCategories
     * @param categoriesArray the new state.selectedCategories to be stored.
     */
    changeSelectedCategories = (categoriesArray) => {
        this.setState({ selectedCategories : categoriesArray});
    }

    /**
     * Changes the state.overview
     * <p>
     *     This method is used by the child components to update the state.selectedCategories
     */
    changeSelectedMode = (overview) => {
        this.setState({overview: overview});
    }

    /**
     * Changes the state.selectedYear
     * <p>
     *     This method is used by the child components to update the state.selectedYear
     */
    changeSelectedYear = (year) => {
        this.setState({ selectedYear : year});
    }

    /**
     * Changes the state.compareCountry1 and state.compareCountry2
     * <p>
     *     This method is used by the child components to update the state.compareCountry1 and state.compareCountry2
     * 
     */
    setCompareCountries = (cc1, cc2) => {
        this.setState({compareCountry1: cc1, compareCountry2: cc2})
    }

    /**
     * Shows different Map dependent on the toggle: Overview and Country Comparison
     *    
     *  @returns {JSX.Element}
     */
    showMap(){
        if(this.state.overview){
            return <div>
                <OverviewMap selectedCategories={this.state.selectedCategories}
                             selectedYear={this.state.selectedYear}/>
            </div>
        } else {
            return <div>
                <CompareMap selectedCategories={this.state.selectedCategories}
                            compareCountry1={this.state.compareCountry1}
                            compareCountry2={this.state.compareCountry2}
                            compareCountrySetter={this.setCompareCountries}/>
            </div>
        }

    }

    /**
     * Shows different BarChart dependent on the toggle: Overview and Country Comparison
     *    
     *  @returns {JSX.Element}
     */
    showCharts(){
        if(this.state.overview){
            return <div>
                <OverviewCharts selectedCategories={this.state.selectedCategories}
                                selectedYear={this.state.selectedYear}/>
            </div>
        } else {
            return <div>

                <CompareLegend compareCountry1={this.state.compareCountry1}
                               compareCountry2={this.state.compareCountry2} />

                <CompareCharts selectedCategories={this.state.selectedCategories}
                               overview={this.state.overview}
                               compareCountry1={this.state.compareCountry1}
                               compareCountry2={this.state.compareCountry2}
                               selectedYear={this.state.selectedYear}
                               />
            </div>
        }

    }

    /**
     * Renders the App.
     * <p>
     *     This method renders all content of the app divs depend on the grid-layout decisions used in the index.css and App.css files.
     *
     * @returns {JSX.Element}
     */
    render () {
        return <div id={"page"}>

            <div className={"content"}>
                {/*This div is used by the grid layout to leave space at the left*/}
                <div/>
                <div className="wrapper">
                    <div id={"columnLeft"}>
                        <Header/>
                        <div/>
                        <div id={"Charts"}>
                            {this.showCharts()}
                        </div>
                        <div/>

                        <Checkboxes selectedCategories={this.state.selectedCategories} selectionChanger={this.changeSelectedCategories}/>
                        <div/>
                        <Toggle overview={this.state.overview} modeChanger={this.changeSelectedMode}/>
                    </div>

                    <div id={"columnRight"}>
                        <div/>
                        <div id = {"HelperContainer"}>
                            <Helper overview={this.state.overview}/>
                        </div>
                        <div/>
                        <div id = {"MapContainer"}>
                            {this.showMap()}
                        </div>
                        <div/>
                        <div/>
                        <div/>
                        <div id={"SliderContainer"}>
                            <TimeSlider id={"TimeSlider"}
                            selectedYear={this.state.selectedYear}
                            selectionYear={this.changeSelectedYear}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }
}
