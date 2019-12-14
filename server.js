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

app.listen(4000)
 