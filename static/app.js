function init() 
  {
            var selector = d3.select("#selDataset");
            d3.json("/names").then((sampleNames) => 
            {
                sampleNames.forEach((sample) => 
                {
                  selector
                  .append("option")
                  .text(sample)
                  .property("value", sample);
                });
                const firstSample = sampleNames[0];
                console.log(firstSample);
                buildCharts(firstSample);
                buildMetadata(firstSample);
            });
  }

  function buildCharts(sample) 
  {
            samplestring=`/samples/${sample}`
            console.log(samplestring)
            d3.json(samplestring).then((x) =>
            {
              console.log(x)
              var ids = x.otu_ids
              var values = x.sample_values
              var labels = x.otu_labels
              var trace1 = 
                {
                  x: ids,
                  y: values,
                  text: labels,
                  mode: 'markers',
                  marker: 
                    {
                      size: values,
                      color: values,
                      colorscale: 
                        [
                        [0, 'rgb(104, 222, 222)'], 
                        [1, 'rgb(72, 104, 156)'], 
                        [2, 'rgb(43, 34, 125)']
                        ]
                    }
                  };
              var data = [trace1];
              var layout = 
                {
                  showlegend: false,
                  xaxis: 
                    {
                      title: 'OTU ID'
                    },
                  height: 500,
                  width: 800
                };

              Plotly.newPlot("bubble", data, layout);
              
              var trace2 = 
                [{
                  values: values.slice(0,10),
                  labels: ids.slice(0,10),
                  hovertext: labels.slice(0,10),
                  type: "pie",
                  hoverinfo: 'text'
                }];

              var layout2 = 
                {
                  height: 500,
                  width: 700
                };
                    
              Plotly.newPlot("pie", trace2, layout2);

            });
  }

  function optionChanged(newSample) 
  {
            buildCharts(newSample);
            buildMetadata(newSample);
  }

  function buildMetadata(sample) 
  {
            var panel = d3.select("#sample-metadata");
            panel.html("");
            metastring=`/metadata/${sample}`
            console.log(metastring)
            d3.json(metastring).then((metadata) =>
            {
              console.log(metadata)
              Object.entries(metadata).forEach(([key, value]) => 
              {
                console.log(key, value)
                panel
                .append("li")
                .text(`${key}: ${value}`)
              });
            });

  }



  init();