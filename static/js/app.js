

// function to populate metadata
function demoInfo(sample)
{
    // pass in sample data
    console.log(sample);

    // use d3.json to get the data
    d3.json("samples.json").then((data) => {
        // get the metadata
        let metaData = data.metadata;
        //console.log(metaData);

        // filter based on the sample number passed in - should get a single-item array
        let result = metaData.filter(sampleResult => sampleResult.id == sample);

        //console.log(result);

        // get item 0 from the array
        let resultData = result[0];
        //console.log(resultData);

        // clear the metadata if any for next round of populating
        d3.select("#sample-metadata").html("");

        // use Object.entries to get the value key pairs
        Object.entries(resultData).forEach(([key, value]) => {
            // add to the selected sample metadata panel
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
        });
    });
}

// function to build the barchart
function buildBarChart(sample)
{
    //console.log(sample);

    //let data = d3.json("samples.json");
    //console.log(data);

    d3.json("samples.json").then((data) => {
        // get the sample data
        let sampleData = data.samples;
        console.log(sampleData);

        // filter based on the sample number passed in - should get a single-item array
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);

        //console.log(result);

        // get item 0 from the array
        let resultData = result[0];
        //console.log(resultData);

        // get otu_ids & otu_labels
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        //console.log(otu_ids);
        //console.log(otu_labels);
        //console.log(sample_values);

        // buld the bar chart
        // get the y ticks
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0, 10);
        let textLabels = otu_labels.slice(0, 10);
        //console.log(textLabels);

        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textLabels.reverse(),
            type: "bar",
            orientation: "h"
        };

        let layout = {
            title: "Top 10 Belly Button Bactieria"
        };

        Plotly.newPlot("bar", [barChart], layout);

    });

}

// function to build the bubble chart
function buildBubbleChart(sample)
{
    //console.log(sample);

    //let data = d3.json("samples.json");
    //console.log(data);

    d3.json("samples.json").then((data) => {
        // get the sample data
        let sampleData = data.samples;
        console.log(sampleData);

        // filter based on the sample number passed in - should get a single-item array
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);

        //console.log(result);

        // get item 0 from the array
        let resultData = result[0];
        //console.log(resultData);

        // get otu_ids & otu_labels
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        //console.log(otu_ids);
        //console.log(otu_labels);
        //console.log(sample_values);

        // buld the bubble chart
        // get the y ticks
        //let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        //let xValues = sample_values.slice(0, 10);
        //let textLabels = otu_labels.slice(0, 10);
        //console.log(textLabels);

        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        let layout = {
            title: "Bacteria Cultures Per Sample",
            hover: "closest",
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", [bubbleChart], layout);

    });
}

// function to initialize the dashboard
function initialize()
{
    // load the data from the .json file
    let data = d3.json("samples.json");
    console.log(data);

    // access teh dropdown selectro from the index.html file
    var select = d3.select("#selDataset");

    // use d3.json to get the data
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names; // make an array of just the names
        //console.log(sampleNames);

        // use a foreach to creat the Options list for the samples selector
        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);            
        });
        
        // when initialized pass in data for first sample
        let sample1 = sampleNames[0];

        // call the function to build the metadata
        demoInfo(sample1);

        // call function to build the barchart
        buildBarChart(sample1);

        // call function to build the bubble chart
        buildBubbleChart(sample1);

    });
}

// function to update the dashboard
function optionChanged(item)
{
    // call the update to the metadata
    demoInfo(item);

    // call fuction to build the barchart
    buildBarChart(item);

    // call function to build the bubble chart
    buildBubbleChart(item);


}

// call the initialization funciton
initialize();