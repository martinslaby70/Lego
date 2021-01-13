const puppeteer = require('puppeteer');


const getAlzaItems = async () => {
    let Url = 'https://www.alza.cz/hracky/nejprodavanejsi-nejlepsi-lego/18851136.htm#f&cst=null&cud=0&pg=0-99prod=&sc=2500';

    let browser = await puppeteer.launch({headless: true});
    let page = await browser.newPage();
    
    await page.goto(Url, { waitUntil: 'networkidle2' });   
   
    const items = await page.$$('.box.browsingitem');
    const itemsCount = items.length;
    let salesCount = 0;
    let itemsInSale = [];
    
    for (let i = 0; i < itemsCount; i++) {
        const item = items[i];
        
        //replace with condition if(isInSale)
        try 
        {
            const name = await item.$eval('a.name', a => a.textContent);
            const originalPrice = await item.$eval('span.np2', span => span.textContent);
            const currentPrice = await item.$eval('span.c2', span => span.textContent);
            const sale = await item.$eval('span.np', span => span.textContent);
            const description = await (await item.$eval('.Description', span => span.textContent)).trim('\n');
            const link = await item.$eval('a.name', a => 'https://www.alza.cz' + a.getAttribute('href'));
            const img = await item.$eval('em > img', img => img.getAttribute('data-src')); 
            
            const categories = await item.$eval('a.pc.browsinglink', a => {
                //format categories
                const temp = a.getAttribute('data-impression-category')
                .replace(/\s/g, '')
                .split("\\")
                .filter(category => category !== 'Hračky')
                .filter(category => category !== 'LEGO');
            
                return temp;
            });
            
            salesCount++;

            itemsInSale.push({
                name,
                originalPrice,
                currentPrice,
                sale,
                description,
                link,
                img,
                categories
            })
        }
        catch(err){
            //console.log(err);
        }
        
    }

    await browser.close();

    return {
        itemsCount,
        salesCount,
        itemsInSale
    };
}


const getCzcItems = async () => {
    let Url = 'https://www.czc.cz/lego/lego/zbozi?q-first=0';

    let browser = await puppeteer.launch({headless: false});
    let page = await browser.newPage();
    
    await page.goto(Url, { waitUntil: 'networkidle2' });   
   
    
    const pagesCount = await page.$eval('.paging.ajax > a.last', a => Number(a.innerHTML))
    
    let itemsInSale = [];
    let salesCount = 0;


    for (let i = 0; i < pagesCount - 1; i++) {
        const button = await page.$('button.btn.show-next');
        button.click();    
    }

    await page.waitForSelector('#titles');

    const items = await page.$$('#titles > div > div');
    const itemsCount = items.length;

    for (const item of items) {
      
        
        try {
            const name = item.$eval('.tile-title > h5 > a', a => a.textContent);
            const img = item.$eval('a.image > img', img => img.getAttribute('src'));

            console.log({name, img});

            salesCount++;
            itemsInSale.push({name,img})

        } catch (err) {
            console.log(err);
        }
    }

    await browser.close();

    return {
        itemsCount,
        salesCount,
        itemsInSale
    };


}



module.exports = {getAlzaItems, getCzcItems};