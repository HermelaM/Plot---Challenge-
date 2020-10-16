
function Ploty(id) {
    //read json file using D3
    d3.json("samples.json").then (sampledata =>{
        console.log(sampledata)
        // sort and slice data
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)
        var sampleValues =  (sampledata.samples[0].sample_values.slice(0,10));  
        // Reverse the array
            sampleValues = sampleValues.reverse();                                                                    
        console.log(sampleValues)
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels)
        
        // get top 10 otu ids 
        var Ten_top = ( sampledata.samples[0].otu_ids.slice(0, 10));
        // Reverse the array
            Ten_top = Ten_top.reverse();

        var OTU_id = Ten_top.map(d => "OTU " + d);
        console.log(`OTU IDS: {OTU_id}`)

        // Create your trace.
         var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            type:"bar",
            orientation: "h",
        };

        // data 
        var data = [trace];

        // Apply the group bar mode to the layout
        var layout = {
            title: "Top 10 OTU",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };

        // create the bar plot
    Plotly.plot("bar", data, layout);
        // The bubble chart
        var trace1 = {
            x: OTU_id,
            y: sampleValues,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: ids
            },
            text: labels

        };
        // set the layout for the bubble plot
        var layout = {
            xaxis:{title: "OTU ID"},
            height: 500,
            width: 1000
        };

        // creating data variable 
        var data1 = [trace1];

    // create the bubble plot
    Plotly.plot("bubble", data1, layout); 
    
    });
}  
// create the function to get the necessary data
function DemoInfo(id) {
// read the json file using D3
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata)

        // filter by id
        var newsample = metadata.filter(meta => meta.id.toString() === id)[0];
        // select the place to put data
        var Infobox = d3.select("#sample-metadata");
        
        // empty existing data
        Infobox.html("");

        // get the necessary data for the id and append the info
        Object.entries(newsample).forEach(([key, value]) => {
            Infobox.append("h5").text(`${key}:${value}`);   
        });
    });
}
// update when there is a change
//d3.selectAll("body").on("change", updatePlotly);
function optionChanged(id) {
    Ploty(id);
    DemoInfo(id);
}
//  Call update() when a change takes plac
function update() {

    var dropdown = d3.select("#selDataset");
    // read the data 
    d3.json("samples.json").then((data)=> {
        console.log(data)
        // get the id data to the dropdwown menu
        data.names.forEach(function(id) {
            dropdown.append("option").text(id).property("value");
        });

        // display new data 
        Ploty(data.names[0]);
        DemoInfo(data.names[0]);
    });
}

update();