const mongoose = require('mongoose')

mongoose.connect('mongodb://taskuser:taskpwd123@ds039291.mlab.com:39291/mypdata', {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true
}).then(
  () => { console.log('Connected to DB') },
  err => { console.log('Unable Connected to DB') }
);
