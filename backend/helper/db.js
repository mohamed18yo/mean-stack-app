const mongoose= require('mongoose')


mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_PW +'@cluster0-bn4ip.mongodb.net/mean-stack-app?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
//to conect local DB use this mongodb://localhost/meanstack2
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("'we're connected!'");
});
  