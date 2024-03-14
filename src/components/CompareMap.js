import * as d3 from 'd3';
import { useD3 } from './hooks/useD3.js';
import React from 'react';
import "./../styles/Map.css";

export default class CompareMap extends React.Component {
    /**
     * creates an Europe Map, which is interactive. 
     * Two countries can be selected from the top five.
     *
     * @returns {JSX.Element}
     */
    createCompareMap(){

        let self = this;

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

        function Map() {
            const ref = useD3(
                (svg) => {
                    const height = 900;
                    const width = 500;

                    const projection = d3.geoMercator()
                        .center([7, 53])
                        .scale(800)
                        .translate([width / 2, height / 2])

                    //Color Variables can be changed HERE
                    let color1 = "#0A9396";
                    let color2 = "#BB3E03";
                    let baseColor = "#E9D8A6";
                    let baseColorSelectable = "#EE9B00";

                    let hoverColor;

                     if(self.props.compareCountry1 === null){
                         hoverColor = color1;
                     } else if(self.props.compareCountry2 === null) {
                         hoverColor = color2;
                     } else {
                         hoverColor = baseColorSelectable;
                     }

                    // Load geo.json data and boot
                    d3.json("https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/GeoJSON/europe.geojson").then( function(data) {
                        let mouseOver = function(d) {
                            if (isSelectable(this.getAttribute("iso2"))) {
                                d3.selectAll(".Country")
                                    .transition()
                                    .duration(200)
                                    .style("opacity", .5)
                                d3.select(this)
                                    .transition()
                                    .duration(200)
                                    .style("opacity", 1)
                                    .attr("fill", function (d) {
                                        if(this.getAttribute("iso2") === self.props.compareCountry1) {
                                            return baseColorSelectable;
                                        }
                                        return hoverColor
                                    })
                                    .style("stroke", "transparent")
                            }
                        }

                        let mouseLeave = function(d) {
                            if (isSelectable(this.getAttribute("iso2"))) {
                                d3.selectAll(".Country")
                                    .transition()
                                    .duration(200)
                                    .style("opacity", .8)
                                d3.select(this)
                                    .transition()
                                    .duration(200)
                                    .attr("fill", function (d) {
                                        switch (d.properties.ISO2) {
                                            case self.props.compareCountry1:
                                                return color1;
                                                break;
                                            case self.props.compareCountry2:
                                                return color2;
                                                break;
                                            default:
                                                if(isSelectable(d.properties.ISO2)){
                                                    return baseColorSelectable;
                                                } else return baseColor;
                                        }
                                    })
                                    .style("stroke", "white")
                            }
                        }

                        let mouseClick = function (d) {
                            let compareCountry1 = self.props.compareCountry1;
                            let compareCountry2 = self.props.compareCountry2;

                            if(isSelectable(this.getAttribute("iso2"))) {
                                if (compareCountry1 === null) {
                                    compareCountry1 = this.getAttribute("iso2");
                                    if(this.getAttribute("iso2") === compareCountry2) {
                                        compareCountry2 = null;
                                    }

                                } else if (compareCountry1 !== null && compareCountry2 === null) {

                                    if (compareCountry1 !== this.getAttribute("iso2")) {
                                        compareCountry2 = this.getAttribute("iso2");
                                    } else {
                                        compareCountry1 = null;
                                    }

                                } else if (compareCountry1 !== null && compareCountry2 !== null) {
                                    if (compareCountry1 === this.getAttribute("iso2")) {
                                        compareCountry1 = null;

                                    }
                                    if (compareCountry2 === this.getAttribute("iso2")) {
                                        compareCountry2 = null;
                                    }
                                }
                                self.props.compareCountrySetter(compareCountry1, compareCountry2);
                            }
                        }

                        // Draw the map
                        svg.append("g")
                            .selectAll("path")
                            .data(data.features)
                            .join("path").attr("fill", function (d) {
                                switch (d.properties.ISO2) {
                                    case self.props.compareCountry1:
                                        return color1;
                                        break;
                                    case self.props.compareCountry2:
                                        return color2;
                                        break;
                                    default:
                                        if(isSelectable(d.properties.ISO2)){
                                            return baseColorSelectable;
                                        } else return baseColor;
                                }
                            })

                            .attr("country-name", function(d){
                                return d.properties.NAME;
                            })
                            .attr("iso2", function (d) {
                                return d.properties.ISO2;
                            })
                            .attr("d", d3.geoPath().projection(projection))
                            .style("stroke", "#fff")
                            //MouseOver and MouseLeave
                            .on("mouseover", mouseOver )
                            .on("mouseleave", mouseLeave )
                            .on("click", mouseClick)
                    })
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
            <div >
                <Map/>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.createCompareMap()}
            </div>

        );
    }
}

