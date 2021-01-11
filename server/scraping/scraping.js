const puppeteer = require('puppeteer');


const getAlzaItems = async () => {
    let Url = 'https://www.alza.cz/hracky/nejprodavanejsi-nejlepsi-lego/18851136.htm#f&cst=null&cud=0&pg=1-999prod=&sc=2500';

    let browser = await puppeteer.launch({headless: true});
    let page = await browser.newPage();

    await page.goto(Url, { waitUntil: 'networkidle2' });   
   
    const items = await page.$$('.box.browsingitem');
    const itemsCount = items.length;
    let itemsInSale = [];
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        //replace with condition
        try 
        {
            const name = await item.$eval('a.name', a => a.textContent);
            const originalPrice = await item.$eval('span.np2', span => span.textContent);
            const currentPrice = await item.$eval('span.c2', span => span.textContent);
            const sale = await item.$eval('span.np', span => span.textContent);
            const description = await (await item.$eval('.Description', span => span.textContent)).trim('\n');
            const link = await item.$eval('a.name', a => 'https://www.alza.cz' + a.getAttribute('href'));
            const img = await item.$eval('em > img', img => img.getAttribute('data-src')); 

            itemsInSale.push({
                name,
                originalPrice,
                currentPrice,
                sale,
                description,
                link,
                img
            })
        }
        catch {

        }
        
    }

    browser.close();

    return {
        itemsCount,
        itemsInSale
    };
}



module.exports.getAlzaItems = getAlzaItems;