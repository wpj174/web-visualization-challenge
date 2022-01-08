

// function to populate metadata
function demoInfo(sample)
{
    // pass in sample data
    console.log(sample);
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
    console.log(item);
}

// call the initialization funciton
initialize();