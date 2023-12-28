const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb://seeeop2:seeeop2@ac-zlksgxu-shard-00-00.psi31ps.mongodb.net:27017,ac-zlksgxu-shard-00-01.psi31ps.mongodb.net:27017,ac-zlksgxu-shard-00-02.psi31ps.mongodb.net:27017/?ssl=true&replicaSet=atlas-12avqi-shard-0&authSource=admin&retryWrites=true&w=majority')
  .then( () => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})