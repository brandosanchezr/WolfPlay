var data 
function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', '../files/tableNormalDistribution.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
            document.getElementById('cargandoDiv').style.display = "none";
          }
    };
    xobj.send(null);  
 }

 function init(){
    loadJSON(function(response) {
        data = JSON.parse(response);
    });
}

function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
}

function search(){
    let max = data[ document.getElementById('z').value * 1]
    let min = data[ document.getElementById('z_2').value * 1]
    document.getElementById('Cargando').innerHTML = max
    document.getElementById('Cargando_2').innerHTML = min
    document.getElementById('Cargando_R').innerHTML = max*1 - min*1
}

function search_2(){
    let searchVal = document.getElementById('i').value * 1
    if (searchVal < -1 || searchVal > 1)
        document.getElementById('Cargando_i').innerHTML = 'Valor fuera de los límites'
    else
        document.getElementById('Cargando_i').innerHTML = getKeyFromVal(data, searchVal)
}

function getKeyFromVal(dataOb, value){
    let keys =  Object.keys(dataOb).sort(comparar)
    let result = 0
    let result2 = 0
    for (let index = 0; index < keys.length; index++)
        if (value*1000 < dataOb[keys[index]]*1000 && (result2 = keys[index])) 
            break
        else
            result = keys[index]
    return result2*1000 - value*1000 < value*1000 - result*1000? result2:result
} 
function comparar ( a, b ){ return a - b; }
ready(init)