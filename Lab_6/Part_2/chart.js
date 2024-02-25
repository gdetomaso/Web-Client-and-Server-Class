// Array of bridge data
var bridges = [
    {name: "Verrazano-Narrows Bridge", city: "New York, NY", span: 1298.4, location: [40.6066, -74.0447]},
    {name: "Golden Gate Bridge", city: "San Francisco and Marin, CA", span: 1280.2, location: [37.8199, -122.4783]},
    {name: "Mackinac Bridge", city: "Mackinaw and St Ignace, MI", span: 1158.0, location: [45.8174, -84.7278]},
    {name: "George Washington Bridge", city: "New York, NY and New Jersey, NJ", span: 1067.0, location: [40.8517, -73.9527]},
    {name: "Tacoma Narrows Bridge", city: "Tacoma and Kitsap, WA", span: 853.44, location: [47.2690, -122.5517]}
];

// Initialize the map and set its view to the United States
var map = L.map('map').setView([39.50, -98.35], 4);

// Set the map layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Create a new instance of L.Icon for the bridge icon
var bridgeIcon = L.icon({
    iconUrl: 'bridge.png',
    iconSize: [18, 45], // size of the icon
});

// Create a new instance of L.Icon for the longest bridge icon
var longestBridgeIcon = L.icon({
    iconUrl: 'bridge.png',
    iconSize: [32, 80], // size of the icon
});

// Find the longest bridge
var longestBridge = bridges.reduce((max, b) => max.span > b.span ? max : b);

// Loop over the array of bridges
for (var i = 0; i < bridges.length; i++) {
    // Create a marker for each bridge
    var marker = L.marker(bridges[i].location, {icon: bridges[i] === longestBridge ? longestBridgeIcon : bridgeIcon}).addTo(map);

    // Bind a popup to the marker with the bridge's name and span length
    marker.bindPopup("<b>" + bridges[i].name + "</b><br>Span: " + bridges[i].span + " meters");
}

// Get the context of the canvas element we want to select
var ctx = document.getElementById('chart').getContext('2d');

// Create a new Chart instance
var chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: bridges.map(b => b.name), // Bridge names
        datasets: [{
            label: 'Span Length (meters)',
            data: bridges.map(b => b.span), // Span lengths
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color of the bars
            borderColor: 'rgba(75, 192, 192, 1)', // Border color of the bars
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});