$(document).ready(function(){
   loadStations(); 
   $("#select-native-2").on("change", function(event){
       //console.log(event);
        let stationAbbr = event.currentTarget.value;
       $("#trains").html("");
        callBartAPI(stationAbbr);
   });
});

function loadStations(){
    stations.forEach(station => buildSelect(station));
}

function buildSelect(station){
    let option = "<option value = '" + station.stationAbbr + "'>" + station.stationName + "</option>";
    $("#select-native-2").append(option);
}

function callBartAPI(stationAbbr){
    let url = "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + stationAbbr + "&json=y&key=" + key;
    console.log(url);
    $.get(url, function(data){
        let trains = data.root.station[0].etd;
        trains.forEach(train => displayTrain(train));
    });    
   
}

function displayTrain(train){
    //console.log(train);
    const destination = train.destination;
    $("#trains").append("<li data-role='list-divider' style='font-size: 1.5em;'>" + destination + "</li>");
    const arrivals = train.estimate;
    arrivals.forEach(arrival => displayArrival(arrival));
     $('#trains').listview().listview('refresh');
}

function displayArrival(arrival){
    const minutes = arrival.minutes;
    const platform = arrival.platform;
    const length = arrival.length;
    const color = arrival.hexcolor;
    let out = "";
    out += "<strong>Time:</strong> " + arrival.minutes + " minutes away.";
    
    out += "<br/><strong>Platform:</strong> " + arrival.platform;
    out += " | <strong>Length:</strong> " + arrival.length;
    $("#trains").append("<li><div style='display: flex;'><div class='trainBox' style='background-color: " + color + "'></div><div class='trainInfo'>" + out + "</div></div></li>");
}

