const express = require ('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())


const users=[{name:'Said'}, { name:'Adam'}]

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req,res)=> {
try{
   // const salt= await bcrypt.genSalt()
    const hashedpassword = await bcrypt.hash(req.body.password,10)
   // console.log(salt)
     console.log("The encrypted password is " + hashedpassword)
    const user ={name: req.body.name,
        password: hashedpassword}
        users.push(user)
        res.status(201).send()
}  
catch{
    res.status(500).send()
}
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
      return res.status(400).send('Cannot find user')
    }
    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
        res.send('Success')
      } else {
        res.send('Not Allowed')
      }
    } catch {
      res.status(500).send()
    }
  })

app.listen(4000)
 