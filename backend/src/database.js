const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/auth-mean-task', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(db => console.log('Database is connected'))
.catch(err => console.log(err))