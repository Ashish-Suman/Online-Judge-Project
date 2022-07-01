const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  }
})

const UserSchema = new Schema({
    email:{
      type: String,
      required: true  
    },
    totalScore: {
        type: Number,
        default: 0
    },
    refreshToken: {
      type: [Session],
    }
});

//Remove refreshToken from the response
UserSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken
    return ret
  },

})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);