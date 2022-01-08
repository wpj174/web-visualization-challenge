

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
        console.log(resultData);

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

// function to build the graphs

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

    });
}

// function to update the dashboard
function optionChanged(item)
{
    // call the update to the metadata
    demoInfo(item);

}

// call the initialization funciton
initialize();