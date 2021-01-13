const puppeteer = require('puppeteer');

(async function main() {
    try{
        let Url = 'https://www.czc.cz/lego/lego/zbozi?q-first=0';

        let browser = await puppeteer.launch({headless: false});
        let page = await browser.newPage();

        await page.goto(Url, { waitUntil: 'networkidle2' });   


        const pagesCount = await page.$eval('.paging.ajax > a.last', a => a.textContent)

        let itemsInSale = [];
        let salesCount = 0;

        console.log(pagesCount);
        

        const button = await page.$('button.btn.show-next');
        
        for (let i = 0; i < pagesCount-1; i++) {
            await button.click();
            await page.waitFor(1000);
        }
       
        

        

        /* const items = await page.$$('#titles > div > div');
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
 */
       
       

        

       

    } catch (err) {
        console.log(err);
    }
})();
