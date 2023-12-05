let exp = require('express')
const fs = require('fs/promises');

let app = exp();

app.get('/', (req, res)=>{
    let content = Date().split(' ')
// console.log(content)
let date = content[4].split(':').join("-")

    fs.writeFile(`./${content[1]}${content[2]}-${date}.txt`, content, {flag:'w'}, (error)=>{
        if(error)console.log(err)
    })
    res.status(200).send("Please refresh page to create new file with time stamp");
    
})

app.listen(3001)


