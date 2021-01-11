const puppeeteer = require('puppeteer');
import {Isale} from './../interfaces/sale';

const getAlzaItems = async () => {
    let Url = 'https://www.alza.cz/hracky/nejprodavanejsi-nejlepsi-lego/18851136.htm#f&cst=null&cud=0&pg=1prod=&sc=2500';

    let browser = await puppeeteer.launch({headless: true});
    let page = await browser.newPage();

    await page.goto(Url, { waitUntil: 'networkidle2' });   
   
    const actions = await page.$$('.action');
    const itemsCount = actions.length;

    let itemsInSale: Isale[] = [];
    for (const action in actions)
    {
       /*  itemsInSale.push({
            
        }); */
    }

    console.log();
   


    
    
    
    
    
    
    return {
        itemsCount,
        itemsInSale
    };
}



module.exports.getAlzaItems = getAlzaItems;