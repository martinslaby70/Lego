const puppeteer = require('puppeteer');

(async function main() {
    try{
        let Url = 'https://www.czc.cz/lego/lego/zbozi?q-first=0';

        let browser = await puppeteer.launch({headless: true});
        let page = await browser.newPage();

        await page.goto(Url, { waitUntil: 'networkidle0' });   


        const pagesCount = await page.$eval('.paging.ajax > a.last', a => a.textContent)

        let itemsInSale = [];
        let salesCount = 0;
        const itemsCount = await page.$eval('.order-by-sum.h-800', div => parseInt(div.textContent)); 
        console.log(pagesCount);
        

        
        
        for (let i = 0; i < pagesCount-1; i++) {
           
            console.log('\n\n\nLOADED\n-------------------------------------------------');

            const items = await page.$$('.new-tile');

            for (const item of items) {
                
                const name = item.$eval('.tile-title > h5 > a', a => a.textContent);
                const img = item.$eval('a.image > img', img => img.getAttribute('src'));   

                const originalPrice = await item.$eval('span.price-before > span.price-vatin', span => span.textContent);
                const currentPrice = await item.$eval('span.price > span.price-vatin', span => span.textContent);
                const sale = await item.$eval('.img-wrapper > span.discount-percent', span => span.textContent);
                const description = await item.$eval('.tile-desc', span => span.textContent);
                const link = await item.$eval('aimage', a => 'https://www.czc.cz' + a.getAttribute('href'));
                
                
                const categories = () => {
                    const avalibleCategories = ['City', 'Technik', 'Exlusive', 'Creator', 'Ninjago', 'Star Wars', 'Architecture', 'Super Mario', 'Harry Potter', 'Marvel'];
                    let returnCategories = [];

                    avalibleCategories.forEach(category => {
                        if (description.toUpperCase().trim().includes(category.trim().toUpperCase()))
                            returnCategories.push(category);
                    })
                   

                    return returnCategories
                }

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
            
            try {
                const button = await page.$('.paging.ajax > a.page-next');
                await Promise.all([
                    button.click(),
                    page.waitForNavigation()
                ]);
            } catch (error) {
                console.log(error);
            }

           
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
       
       

    console.log({
        itemsCount,
        salesCount,
        itemsInSale
    });

    browser.close();   
    
    } catch (err) {
        console.log(err);
    }
})();
