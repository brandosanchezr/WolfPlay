(function($){
    $("#submit").on("change",function  (e) {
        e.preventDefault();
        console.log();
        $.post("/home/F_T", $(this).serialize(), function( data ) {
            var xValues = new Array();
            var yValues = new Array();
            var yValues_T = new Array();

            for (let index = 0; index <= 20; index++) {
                xValues[index] = index * .5 - 5;
                yValues[index] = data[0][index];
                yValues_T[index] = data[1][index];
            }

            var trace1 = {
                x: xValues,
                y: yValues,
                type: 'scatter'
            };
            var trace2 = {
                x: xValues,
                y: yValues_T,
                type: 'scatter'
            };
            var data_abs = [trace1];
            var data_ang = [trace2];
            Plotly.newPlot('plotAbs', data_abs);
            Plotly.newPlot('plotAng', data_ang);
            var elements = document.querySelectorAll('.tit');
            elements = elements.length ? elements : [elements];
            
        });
    })
})(jQuery); // end of jQuery name space

