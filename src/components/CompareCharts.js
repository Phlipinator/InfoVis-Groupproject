import * as d3 from 'd3';
import React, { useEffect} from 'react';
import barchartdata from "../data/data_latlong_ctry_cat_year.csv"

export default class CompareCharts extends React.Component {

    //retreives the prop containing the array with the categories and stores all the selected into 'labelArray'
    //so that 'labelArray' contains only selected labels.
    /**
     * Collects Labels from selected Categories.
     * <p>
     *     This method receives the prop containing the array with the categories and stores all the selected
     *     into 'labelArray' so that 'labelArray' contains only selected labels.
     */
    getLabels() {
        for (let i = 0; i < this.props.selectedCategories.length; i++) {
            //props.selectedCategories[_][2] stores if category is selected
            if (this.props.selectedCategories[i][2] === true) {
                //props.selectedCategories[_][1] stores name of category
                labelArray[i] = this.props.selectedCategories[i][1];
            } else {
                labelArray[i] = "";
            }
        }
    }

    /**
     * creates a Grouped Barchart dependent on the selected two countries
     *
     * @returns {JSX.Element}
     */
    createGroupedChart() {
        //get variables from parent
        var selectedCategories = this.props.selectedCategories;
        var country1 = this.props.compareCountry1;
        var country2 = this.props.compareCountry2;
        var year = this.props.selectedYear;

        function GroupedChart({ id }) {
            let categoryBars = []
            let country1_bars = []
            let country2_bars = []

            //selectedCategories
            var groups = []

            //selected countries
            var subgroups = [country1, country2]

            //array for the barchart
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
                            //filter the category
                            categoryBars = cdata.filter(function(d){return(d.publn_kind == selectedCategories[i][3])})

                            //get amount of patents for each country
                            country1_bars = categoryBars.filter(function(d){return(d.ctry_code == country1 && d.filing_date == year)})
                            country2_bars = categoryBars.filter(function(d){return(d.ctry_code == country2 && d.filing_date == year)})

                            //add it to the array with the filtered data
                            bardata.push({category: selectedCategories[i][1], country1_patents: country1_bars.length, country2_patents: country2_bars.length})
                            groups.push(selectedCategories[i][1])
                        }
                        
                    }
                    

                    //sort bardata get the right max amount later
                    for (let x = 0; x < bardata.length; x++) {
                        if(bardata[x].country2_patents > bardata[x].country1_patents)  {
                            bardata.sort(function (b,a) {
                                return a.country2_patents - b.country2_patents;
                            });
                        }
                        else if (bardata[x].country1_patents > bardata[x].country2_patents) {
                            bardata.sort(function (d, c) {
                                return c.country1_patents - d.country1_patents;
                            });
                        }
                    }
                    
                    //get maximum amount of patents for the scale
                    if(bardata.length > 0){
                        if(bardata[0].country1_patents > bardata[0].country2_patents){
                            maxamount = bardata[0].country1_patents;
                        }else{
                            maxamount = bardata[0].country2_patents;
                        }
                    }

                    //set maxamount to 10 for a better looking scale in the barchart
                    if(bardata.length > 0 && bardata[0].country1_patents > 10 && bardata[0].country2_patents > 10){
                        if(bardata[0].country1_patents > bardata[0].country2_patents){
                            maxamount = bardata[0].country1_patents;
                        }else{
                            maxamount = bardata[0].country2_patents;
                        }
                    }else if(bardata.length > 0 && bardata[0].country1_patents < 10 && bardata[0].country2_patents < 10){
                        maxamount = 10;
                    }       
                    
                   
                   
                    //draw barchart if anything is selected
                    if (groups.length > 0 && country1 != null && country2 != null)
                    {
                        // new y axis
                        const y = d3.scaleBand()
                            .range([0, bardata.length * 45 ])  //scale y-Axis dynamic
                            .padding(0.1)                   //distance between two bars
                            .domain(groups)
                        svg.append("g")
                            .call(d3.axisLeft(y)); 

                            //x axis
                        const x = d3.scaleLinear()
                            .domain([0, maxamount])        //Scale dynamic 
                            .range([0, width]);

                        svg.append("g")
                            .attr("transform", `translate(0, ${bardata.length * 45})`) //Axis dynamic
                            .call(d3.axisBottom(x))
                            .selectAll("text")
                            .attr("transform", "translate(-10,0)rotate(-45)")
                            .style("text-anchor", "end");
        
                        // Another scale for subgroup position
                        var ySubgroup = d3.scaleBand()
                            .domain(subgroups)
                            .range([0, y.bandwidth()])
                            .padding([0.05])
                            
                        // color palette = one color per subgroup
                        var color = d3.scaleOrdinal()
                            .domain(subgroups)
                            .range(["#0A9396","#BB3E03"])
                        
                        //draw the chart
                        svg.append("g")
                            .selectAll("g")
                            // Enter in data = loop group per group
                            .data(bardata)
                            .enter()
                            .append("g")
                            .attr("transform", function(d) { return "translate(0,"+ y(d.category) + ")"; })
                            .selectAll("rect")
                            //here the data is arranged into a new array for the subgroups
                            .data(function(d){return [{key: subgroups[0], value: d.country1_patents}, {key: subgroups[1], value: d.country2_patents}]})
                            .enter()
                            .append("rect")
                            .transition()       //Adds transition
                            .duration(500)      //duration of transition
                            .attr("x", function(d) { return y(d.value); })
                            .attr("y", function(d) { return ySubgroup(d.key);})
                            .attr("width", function(d){return x(d.value);} )
                            .attr("height", ySubgroup.bandwidth())
                            .attr("fill", function(d) { return color(d.key); });

                    }
 
                })
        
             }, []);
        

            return <div id={id} />;
        }

        return (
            <div>
                <GroupedChart id="chart" />
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
                {this.createGroupedChart()}
            </div>

        );
    }
}

//this labelArray is a storage for all labels to be shown.
let labelArray = [];
