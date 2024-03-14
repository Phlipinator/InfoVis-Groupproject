import * as d3 from 'd3';
import React, { useEffect} from 'react';
import barchartdata from "../data/data_latlong_ctry_cat_year.csv"

export default class OverviewCharts extends React.Component {
     /**
     * creates a Bar Chart
     * displays bars in a chart based on the checked checkboxes.
     *
     * @returns {JSX.Element}
     */
       createBarChart() {
        //get variables from parent
        var selectedCategories = this.props.selectedCategories;
        var year = this.props.selectedYear;

        function BarChart({ id }) {
            let bars = []
            let bardata = [];
            var maxamount = 0;

            useEffect(() => {

                const margin = { top: 80, right: 30, bottom: 50, left: 130 },
                    width = 550 - margin.left - margin.right,
                    height = 500 - margin.top - margin.bottom;

                const svg = d3.select('#' + id)
                    .append('svg')
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);

                //load the data    
                d3.csv(barchartdata).then(function (cdata) {

                    //filter category and year
                    for (let i = 0; i < selectedCategories.length; i++) {
                            
                        if (selectedCategories[i][2]) {
                            bars = cdata.filter(function(d){return (d.filing_date == year)})
                            bars = bars.filter(function(d){return(d.publn_kind == selectedCategories[i][3])})

                            bardata.push({category: selectedCategories[i][1], patents: bars.length})
                        }
                        
                    }

                    //sorts the barchart
                    bardata.sort(function (b, a) {
                        return a.patents - b.patents;
                    });

                    //get maximum amount of patents for the scale
                    if(bardata.length > 0 && bardata[0].patents > 10){
                        maxamount = bardata[0].patents;
                    }else if(bardata.length > 0 && bardata[0].patents < 10){
                        maxamount = 10;
                    }

                    if (bardata.length > 0){
                    
                        // x axis
                        const x = d3.scaleLinear()
                            .domain([0, maxamount])        //Scale dynamic 
                            .range([0, width]);
                        
                        svg.append("g")
                            .attr("transform", `translate(0, ${bardata.length * 45})`) //Axis dynamic
                            .call(d3.axisBottom(x))
                            .selectAll("text")
                            .attr("transform", "translate(-10,0)rotate(-45)")
                            .style("text-anchor", "end");

                        // y axis
                        const y = d3.scaleBand()
                            .range([0, bardata.length * 45])  //scale y-Axis dynamic
                            .padding(0.1)                   //distance between two bars
                            .domain(bardata.map(d => d.category))
                            
                        svg.append("g")
                            .call(d3.axisLeft(y))

                        // Add bars to the svg
                        svg.selectAll("mybar")
                            .data(bardata)
                            .join("rect")
                            .transition()       //Adds transition
                            .duration(1500)      //duration of transition
                            .attr("x", x(0))
                            .attr('y', d => y(d.category))
                            .attr('width', d => x(d.patents))
                            .attr('height', y.bandwidth())
                            .attr('fill', "#9B2226");
                    }    
                    
                })

            }, []);

            return <div id={id} />;
        }

        return (
            <div>
                <BarChart id="barchart" />
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
                {this.createBarChart()}
            </div>

        );
    }
}

