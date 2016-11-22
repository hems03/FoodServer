var mongoose=require('mongoose');
var db=mongoose.connection;
db.on('error',console.error);
db.once('open',function(){
});
mongoose.connect('mongodb://localhost/test');

var userSchema=new mongoose.Schema({
        name:{type:String},
        pass:String,
});
var plateSchema=new mongoose.Schema({
        image:{data:Buffer, contentType:String}
});
var User=mongoose.model('User',userSchema);
var Plate=mongoose.model('Plate',plateSchema);

