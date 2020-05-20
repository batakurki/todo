const mongoose = require('mongoose')

mongoose.connect('mongodb://<username>:<password>@<hostipORhostaddress>:<PORT>/<DB_SCHEMA>', {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true
}).then(
  () => { console.log('Connected to DB') },
  err => { console.log('Unable Connected to DB') }
);
