var selectedZIP = "30002";
console.log(selectedZIP);

const groceryURL = "Resources/all_georgia.json";

d3.json(groceryURL).then(function(zipcodes){
    console.log(zipcodes[selectedZIP].groceryStores)
    var grocerylist = zipcodes[selectedZIP].groceryStores;
     //Creating  table to create list of grocery stores
    var selectDiv = d3.select("#grocerylist");
    selectDiv.selectAll("table").remove();
    var table = selectDiv.append("table");
    var tbody = table.append("tbody");


    //Adding each demographic info in a table with a single column
    grocerylist.forEach(entry => {
        var row = tbody.append("tr");
        var listElement = row.append("td");
        listElement.attr("class", "h6");
        listElement.style("font-size", "12x"); // change font-size to 24px 
        listElement.text(`${entry}`);
    });
});

// def incURL
const incURL = "Resources/Income_(by_Zip_Code)_2018.csv";

// def educURL
const educURL = "Resources/Educational_Attainment_(by_Zip_Code)_2018.csv";


//dropdown
d3.csv(incURL).then(function(dropdown) {
    //Create drop down menu from sample.names
    var dropData = dropdown.map(e=>e.GEOID);
    
    
    d3.select('#selDataset')
        .selectAll('myOptions')
            .data(dropData)
        .enter()
            .append('option')
        .text(f => f)
        .attr("value", f => f);
});

//incURL GET request
    //income function??
d3.csv(incURL).then(function(income){
   
    //match incData[3] w/ slectedZIP and load that row's data?
    //var zips = income.features[0].properties.GEOID; 
    var selectedData = income.filter(a=>a.GEOID == selectedZIP)[0];

    //var selectedData = selectedData.properties;

    //def plot points
    var lt35k = (selectedData.HHIncLt35k_e18);
    var lt75k = (selectedData.HHInc35_75k_e18);
    var lt200k = (selectedData.HHInc75_200k_e18);
    var gt200k = (selectedData.HHInc200kP_e18);
    
    //list of x cols but y vals? need to fix 'selectedData.'...? where incData.GEOID == selectedZIP, iYl = vals???
    //how/need to push list of vals to iy/xl?
    var vals = [lt35k,lt75k,lt200k,gt200k]
    
    //Creating Bar Chart???
    var traceB = {
        type: 'bar',
        x: ['Under $35k','$35-75k','$75k-200k','Over $200k'],
        y: vals,
        orientation: 'v',
        marker: {
            color: vals,
            colorscale: [
                ['0.0', '#f7dc6f'],
                ['0.111111111111', '#5dade2'],
                ['0.222222222222', '#58d68d'],
                ['0.333333333333', '#c39bd3'],
                ['0.444444444444', '#ec7063'],
                ['0.555555555556', '#fdedec'],
                ['0.666666666667', '#2980b9'],
                ['0.777777777778', '#d2b4de'],
                ['0.888888888889', '#73c6b6'],
                ['1.0', 'rgb(242, 100, 217)']]
        },
    };

    var bdata = [traceB];
    var blayout = {
        xaxis: {title: "Income Levels"},
        yaxis: {title: "Number of Households"},
        automargin: true,
        autosize: true,
    };

    Plotly.newPlot('bar', bdata, blayout);
});

//educURL GET request
    //education function??
d3.csv(educURL).then(function(education){

    //match eduData w/ slectedZIP and load that row's data??
    var userData = education.filter(d=>d.GEOID == selectedZIP)[0];

    var noHS = (userData.NoHS_e18);
    var someHS = (userData.SomeHS_e18);
    var HSgrad = (userData.HSGrad_e18);
    var someCol = (userData.SomeColl_e18);
    var assocs = (userData.Associates_e18);
    var undrgrd = (userData.BA_e18);
    var grdplus = (userData.GradProf_e18);

    //need to FIX 'userData.'...? where eduData.GEOID == selectedZIP? 
    var eduCols = [noHS,someHS,HSgrad,someCol,assocs,undrgrd,grdplus]
    
    //Creating Pie Graph
    var pdata = [{
        type: 'pie',
        values: eduCols,
        labels: ['No High School', 'Some HS', 'HS Grad', 'Some College', "Associate's", "Bachelor's", "Grad./Professional"],
        textinfo: 'label+percemt',
        insidetextorientation: 'outside',
        marker: {
            'colors': [
                '#f7dc6f',
                '#ec7063',
                '#fdedec',
                '#2980b9',
                '#d2b4de',
                '#73c6b6',
                'rgb(242, 100, 217)'
            ]}
        }];
        
        var playout = {
            autosize: true,
            automargin: true,
            showlegend:false,
        };
        
        //userData?
        Plotly.newPlot('pie', pdata, playout);
    });


    //Function that runs When Dropdown Changes
    var dropdown = d3.select('#selDataset');
    dropdown.on("change", function() {
        var selectedZIP = d3.event.target.value;
        console.log(selectedZIP)

        //incURL GET request
        //income function??
        d3.csv(incURL).then(function(income){
        
            //match incData[3] w/ slectedZIP and load that row's data?
            //var zips = income.features[0].properties.GEOID; 
            var selectedData = income.filter(a=>a.GEOID == selectedZIP)[0];

            //var selectedData = selectedData.properties;

            //def plot points
            var lt35k = (selectedData.HHIncLt35k_e18);
            var lt75k = (selectedData.HHInc35_75k_e18);
            var lt200k = (selectedData.HHInc75_200k_e18);
            var gt200k = (selectedData.HHInc200kP_e18);
            
            //list of x cols but y vals? need to fix 'selectedData.'...? where incData.GEOID == selectedZIP, iYl = vals???
            //how/need to push list of vals to iy/xl?
            var vals = [lt35k,lt75k,lt200k,gt200k]
            
            //Creating Bar Chart???
            var traceB = {
                type: 'bar',
                x: ['Under $35k','$35-75k','$75k-200k','Over $200k'],
                y: vals,
                orientation: 'v',
                marker: {
                    color: vals,
                    colorscale: [
                        ['0.0', '#f7dc6f'],
                        ['0.111111111111', '#5dade2'],
                        ['0.222222222222', '#58d68d'],
                        ['0.333333333333', '#c39bd3'],
                        ['0.444444444444', '#ec7063'],
                        ['0.555555555556', '#fdedec'],
                        ['0.666666666667', '#2980b9'],
                        ['0.777777777778', '#d2b4de'],
                        ['0.888888888889', '#73c6b6'],
                        ['1.0', 'rgb(242, 100, 217)']]
                },
            };

            var bdata = [traceB];
            var blayout = {
                xaxis: {title: "Income Levels"},
                yaxis: {title: "Number of Households"},
                autosize: true,
            };

            Plotly.newPlot('bar', bdata, blayout);
        });

        //educURL GET request
        //education function??
        d3.csv(educURL).then(function(education){
        

            //match eduData w/ slectedZIP and load that row's data??
            var userData = education.filter(d=>d.GEOID == selectedZIP)[0];

            var noHS = (userData.NoHS_e18);
            var someHS = (userData.SomeHS_e18);
            var HSgrad = (userData.HSGrad_e18);
            var someCol = (userData.SomeColl_e18);
            var assocs = (userData.Associates_e18);
            var undrgrd = (userData.BA_e18);
            var grdplus = (userData.GradProf_e18);

            //need to FIX 'userData.'...? where eduData.GEOID == selectedZIP? 
            var eduCols = [noHS,someHS,HSgrad,someCol,assocs,undrgrd,grdplus]
            
            //Creating Pie Graph
            var pdata = [{
                type: 'pie',
                values: eduCols,
                labels: ['No High School', 'Some HS', 'HS Grad', 'Some College', "Associate's", "Bachelor's", "Grad./Professional"],
                textinfo: 'label+percemt',
                insidetextorientation: 'outside',
                marker: {
                    'colors': [
                        '#f7dc6f',
                        '#ec7063',
                        '#fdedec',
                        '#2980b9',
                        '#d2b4de',
                        '#73c6b6',
                        'rgb(242, 100, 217)'
                    ]}
                }];
                
                var playout = {
                    autosize: true,
                    automargin: true,
                    showlegend:false,
                    colorscale: 'Picnic'
                };
                
                //userData?
                Plotly.newPlot('pie', pdata, playout);
        });

        d3.json("Resources/all_georgia.json").then(function(zipcodes){
            console.log(zipcodes[selectedZIP].groceryStores)
            var grocerylist = zipcodes[selectedZIP].groceryStores;
             //Creating Side Panel of Dempgraphic Info Body
            var selectDiv = d3.select("#grocerylist");
            selectDiv.selectAll("table").remove();
            var table = selectDiv.append("table");
            var tbody = table.append("tbody");
 

            //Adding each demographic info in a table with a single column
            grocerylist.forEach(entry => {
                var row = tbody.append("tr");
                var listElement = row.append("td");
                listElement.attr("class", "h6");
                listElement.style("font-size", "12px"); 
                listElement.text(`${entry}`);
            });

        })
    });
