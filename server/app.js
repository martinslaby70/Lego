const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());


app.get('/ql', (req, res) => {
  
    console.log(req.body);
    
});

app.get('/qls', (req, res) => {
  
    console.log(req.body);
    
});



app.listen(PORT, () => console.log(`lisening to port ${PORT}`))