const express = require('express')
const app = express();
const cors = require('cors')
require('./database')

app.use(cors())
app.use(express.json())

app.use('/api', require('./routes'))



app.listen(3000);
console.log('Server on Port: 3000')