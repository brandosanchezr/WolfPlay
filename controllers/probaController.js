const fs = require('fs')

function simpson_(f, r, m, a, b, n){
	var dx = (b-a)/n;
	var sum1 = f(a + dx/2, r, m);
	var sum2 = 0;
	for(var i = 1; i < n; i++){
        sum1 += f(a + dx*i + dx/2, r, m);
		sum2 += f(a + dx*i, r, m);        
    }
	return (dx/6) * (f(a, r, m) + f(b, r, m) + 4*sum1 + 2*sum2);
}

function simpson(f, a, b, n){
	var dx = (b-a)/n;
	var sum1 = f(a + dx/2);
	var sum2 = 0;
	for(var i = 1; i < n; i++){
        sum1 += f(a + dx*i + dx/2);
		sum2 += f(a + dx*i);        
    }
	return (dx/6) * (f(a) + f(b) + 4*sum1 + 2*sum2);
}

function f1(x, r, m){
	return ( Math.exp(-.5 * Math.pow( (x-m) / r, 2)) / (r * Math.sqrt(Math.PI * 2)) );
}
function f2(x){
	return ( Math.exp(-.5 * Math.pow(x, 2) ) / (Math.sqrt(Math.PI * 2)) );
}

exports.Proba_Post = function(req, res, next){
    let a = parseFloat(req.body.numA);
    let b = parseFloat(req.body.numB);
    let r = parseFloat(req.body.numR);
    let m = parseFloat(req.body.numM);
    let result = "Hubo un problema :/";
    
    if(req.body.numAi)
        a = m - 10*r;
    if(req.body.numBi)
        b = m + 10*r;
    if(req.body.numAi && req.body.numBi)
        result = 1;
    else
        result = simpson_(f1, r, m, a, b , 70);
    if(!result || !r || !m)
        result = '';
    return res.send(`Resultado: ${result}`);
}

exports.Proba_2_Post = function(req, res, next){
    let table = {};
    console.log("En marcha")
    fs.readFile('./public/files/tableNormalDistribution.json', 'utf8', function (err, data) {
        if (err){
            for (let index = -30000; index <= 30000; index ++)
                    table[(index/10000).toString()] = simpson(f2, -3, index/10000, 100);
            fs.writeFile("./public/files/tableNormalDistribution.json", JSON.stringify(table, null, 4), (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
                console.log("File has been created");
                return res.send(table);
            });
        }else
            return res.send(JSON.parse(data));
    });
}