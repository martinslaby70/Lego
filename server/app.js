const express = require('express');
const cors = require('cors');
var cron = require('node-cron');

const { getAlzaItems } = require('./scraping/scraping');

const app = express();
const PORT = 4000;

app.use(cors());

// connect mongoose


cron.schedule('0 0 * * *', () => {
   
});



app.get('/', (req, res) => {
   getAlzaItems()
   .then(response => {
        res.send(response);
   })
   .catch(error => {
        res.status(400);
        res.send(`error: ${error}`)
   })

});

/* app.get('/qls', (req, res) => {
  
       
});
 */


app.listen(PORT, () => console.log(`lisening to port ${PORT}`))