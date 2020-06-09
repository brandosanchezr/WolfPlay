var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var GamerSchema = new Schema(
  {
    gamerTag: {type: String, required: true, max: 100, trim: true, unique: true},
    password: {type: String, required: true, max: 100, trim: true},
    email: {type: String, required: true, max: 100, trim: true, unique: true},
    totalPoints: {type: Number},
    gamerImg: {type: String},
    resetPasswordToken: String,
    resetPasswordExpires: Date
  }
);

GamerSchema.pre('save', function (next) { //Encrypypass before updating to db
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

GamerSchema.statics.authenticate = function (gamerTag, password, callback) {
  Gamer.findOne({ gamerTag: gamerTag })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

/*/ Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});
*/
//Export model
var Gamer = mongoose.model('gamer', GamerSchema);

module.exports = Gamer;