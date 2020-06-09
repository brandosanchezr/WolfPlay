var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    scores: { 
        type: [{gamer: {type: String}, score: {type: Number}, time: {type: String}}], 
        //validate: [arrayLimit, '{PATH} exceeds the limit of 10']
    },
});

GameSchema.statics.checkValue = function (game, score, callback) {
    game = game.toLowerCase();
    Game.findOne({ name: game }) // 'this' now refers to the Member class
    .sort({'scores.score': 'desc'})
    .exec((err, doc)=>{
        if(err) callback(err);
        else if(!doc){
            return callback(null, '0');
        }
        else{
            console.log(doc.scores.length);
            if(doc.scores.length < 10) return callback(null, true);
            else if (doc.scores[0].score < score) {
                Game.update( { name: game }, { $pop: { scores: -1} });
                return callback(null, true);
            }else callback(null, false);
        }
    });
}

var Game = mongoose.model('game', GameSchema);

module.exports = Game;