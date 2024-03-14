import * as d3 from 'd3';
import { useD3 } from './hooks/useD3.js';
import React from 'react';
import bubbledata from "../data/data_latlong_ctry_cat_year.csv"

export default class OverviewMap extends React.Component {
    /**
     * Collects Labels from selected Categories.
     * <p>
     *     This method receives the prop containing the array with the categories and stores all the selected
     *     into 'labelArray' so that 'labelArray' contains only selected labels.
     */
     getLabels() {
        for (let i = 0; i < this.props.selectedCategories.length; i++) {
            if (this.props.selectedCategories[i][2] === true) {
                labelArray[i] = this.props.selectedCategories[i][1];
            } 
        }
    }

    /**
     * creates an Europe Bubblemap 
     * displays bubbles (top five countries only) based on the checked checkboxes.
     * 
     * @returns {JSX.Element}
     */
    createBubbleMap(){

        let self = this;

        //Color Variables can be changed HERE
        let baseColor = "#E9D8A6";
        let baseColorSelectable = "#EE9B00";

        //get variables from parent
        var selectedCategories = this.props.selectedCategories;
        var year = this.props.selectedYear;

        function isSelectable(iso2) {
            switch(iso2){
                case "DE":
                case "FR":
                case "GB":
                case "CH":
                case "IT":
                    return true;
                    break;
                default:
                    return false;
                    break;
            }
        }

        this.getLabels();

        function Map() {

            const ref = useD3(
                (svg) => {
                    const height = 900;
                    const width = 500;
                    let bubbles = [];
        
                    const projection = d3.geoMercator()
                        .center([7, 53])
                        .scale(800)
                        .translate([width / 2, height / 2])
        
                    // Load geo.json data and boot
                    d3.json("https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/GeoJSON/europe.geojson").then( function(data) {

                        // Draw the map
                        svg.append("g")
                            .selectAll("path")
                            .data(data.features)
                            .join("path").attr("fill", function (d) {
                                if(isSelectable(d.properties.ISO2)){
                                    return baseColorSelectable;
                                } else return baseColor;
                        })

                            .attr("country-name", function(d){
                                return d.properties.NAME;
                            })
                            .attr("iso2", function (d) {
                                return d.properties.ISO2;
                            })
                            .attr("d", d3.geoPath().projection(projection))
                            .style("stroke", "#fff")

                        //when no checkbox is selected, draw nothing
                        if(labelArray.length >= 1){
                            drawBubbles();
                        }

                    })

                    //load data from csv file and filter it dependent on the year and checkboxes. 
                    function drawBubbles(){
                        d3.csv(bubbledata).then(function (bdata) {
                            
                            //filter year
                            bdata = bdata.filter(function(d){return (d.filing_date == year)})
                           
                            //filter category
                            for (let i = 0; i < selectedCategories.length; i++) {
                                
                                if (!selectedCategories[i][2]) {
                                    bdata = bdata.filter(function(d){return(d.publn_kind != selectedCategories[i][3])})
                                    //svg.selectAll("circle").data(markers).transition().duration(1000).style("opacity", 1).attr("r", function(d){ return size(d.size) })
                                }
                            }

                            //Bubble-Color can be changed here
                            let circleColor = "#9B2226"

                            svg
                            .selectAll("myCircles")
                            .data(bdata)
                            .enter()
                            .append("circle")
                            .attr("cx", function (d) { return projection([d.lng, d.lat])[0] })
                            .attr("cy", function (d) { return projection([d.lng, d.lat])[1] })
                            .attr("r", 2)
                            .style("fill", circleColor)
                            .transition()       //Adds transition
                            .duration(1000)
                            .attr("stroke", circleColor)
                            .attr("stroke-width", 0.7)
                            .attr("fill-opacity", .4)
                            
                        })
                        
                    }
        
                },
        
            );

            return (
                <svg id={"MapIllustration"}
                     ref={ref}
                     viewBox={"-55 200 745 600"}
                     preserveAspectRatio={"xMinYMin meet"}
                >
                </svg>
            );
        }

        return (
            <div>
                <Map/>
            </div>
        );
    }
                
    /**
     * Renders the labels.
     * <p>
     *     This method returns a div container with the output created by the @link{#writeLabels} method.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div>
                {this.createBubbleMap()}
            </div>

        );
    }
}

//this labelArray is a storage for all labels to be shown.
let labelArray = [];


