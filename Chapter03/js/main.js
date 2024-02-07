// initialize function
function initialize() {
    cities();
}

// declare globally to be used in other functions 
var table = document.createElement('table');

// create first table with cities and population
function cities(){
// define array
var cityPop = [
    { 
        city: 'Madison',
        population: 233209
    },
    {
        city: 'Milwaukee',
        population: 594833
    },
    {
        city: 'Green Bay',
        population: 104057
    },
    {
        city: 'Superior',
        population: 27244
    }
];

// create header
var header = document.createElement('tr');
table.appendChild(header);

// create 'City' and 'Population' columns
header.insertAdjacentHTML('beforeend', '<th>City</th><th>Population</th>')

// loop through each element of the array and add data
cityPop.forEach(function(cityPop){
    // make a row for each city
    var rowCityPop = "<tr><td>" + cityPop.city + "</td><td>" + cityPop.population + "</td></tr>";
    // add row to the table
    table.insertAdjacentHTML('beforeend', rowCityPop);
})

//add the table to the div in index.html
var mydiv = document.getElementById("mydiv");
mydiv.appendChild(table);
// run the next functions to add to the website
addColumns(cityPop);
addEvents();

};

function addColumns(cityPop){

// select all rows
var rows = document.querySelectorAll('tr')

// loop to add new column to each row
document.querySelectorAll("tr").forEach(function(row, i){
    // make sure we are in the first row to add the header
    if (i == 0){
        // create header and add to table
        row.insertAdjacentHTML('beforeend', '<th>City Size</th>');

    } else {
        // make city size variable to add based on population
        var citySize;
        if (cityPop[i-1].population < 100000){
            citySize = 'Small';

        } else if (cityPop[i-1].population < 500000){
            citySize = 'Medium';

        } else {
            citySize = 'Large';
        };

        //add the row's html string to the table
        row.insertAdjacentHTML('beforeend','<td>' + citySize + '</td>');      
      };
});
};


function addEvents(){

// add mouseover event
document.querySelector("table").addEventListener("mouseover", function(){
    
    var color = "rgb(";
    
    // create random color of table
    for (var i=0; i<3; i++){

        var random = Math.round(Math.random() * 255);

        color += random;

        if (i < 2){
                color += ",";
        } else {
                color += ")";
        };
}
// style the table
document.querySelector("table").style.color = color;
});
// function to produce text
function clickme(){
    alert('Hey, you clicked me!');
};
// run clickme when table is clicked on
table.addEventListener("click", clickme)
};

// Call initialize function when the script loads
window.onload = initialize();

// function to display geo.json data
function debugAjax(){
    //fetch geo.json from directory
	fetch("data/map.geojson")
		.then(function(response){
            // return as normal json
			return response.json();
		})
        // call debugCallBack function
        .then(debugCallback)
};

// function to handle the data
function debugCallback(response){
    // select HTML element with id of 'mydiv'
    var mydiv = document.querySelector("#mydiv");
    // insert a label, followed by the data
    mydiv.insertAdjacentHTML('beforeend', '<br>GeoJSON data:<br>' + JSON.stringify(response));
};

// execute debugAjax once the window loads
window.onload = debugAjax();
