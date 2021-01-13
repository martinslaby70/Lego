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
            const description = await (await item.$eval('.Description', span => span.textContent)).trim('\\n');
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
            //not in sale
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
        const Url = 'https://www.czc.cz/lego/lego/zbozi?q-first=0';

        let browser = await puppeteer.launch({
            headless: true,
            args: [
                '--incognito',
            ]
        });
        let page = await browser.newPage();

        await page.goto(Url, { waitUntil: 'networkidle2' });   

        let itemsInSale = [];
        let salesCount = 0;
        const itemsCount = await page.$eval('.order-by-sum.h-800', div => parseInt(div.textContent)); 
        const pagesCount = await page.$eval('.paging.ajax > a.last', a => a.textContent)
        
        const autoScroll = async (page) => {
            await page.evaluate(async () => {
                await new Promise((resolve, reject) => {
                    let totalHeight = 0;
                    let distance = 100;
                    const timer = setInterval(() => {
                        const scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;
        
                        if(totalHeight >= scrollHeight){
                            clearInterval(timer);
                            resolve();
                        }
                    }, 100);
                });
            });
        }

        for (let i = 1; i < pagesCount; i++) {
           
            const items = await page.$$('.new-tile');
            await autoScroll(page);

            for (let l = 0; l < items.length; l++) {
                const item = items[l];
                console.clear();
                console.log(`${l+ (27*i)} / ${itemsCount}`)
                
                try {
                        
                        const name = await item.$eval('.tile-title > h5 > a', a => a.textContent.trim('\\n'));
                        const img = await item.$eval('a.image > img', img => img.getAttribute('src'));   
                        const originalPrice = await item.$eval('span.price-before > span.price-vatin', span => span.textContent);
                        const currentPrice = await item.$eval('span.price > span.price-vatin', span => span.textContent);
                        const sale = await item.$eval('.img-wrapper > span.discount-percent', span => span.textContent.trim('\\n'));
                        const description = await item.$eval('.tile-desc', span => span.textContent.trim('\\n'));
                        const link = await item.$eval('a.image', a => 'https://www.czc.cz' + a.getAttribute('href'));
                        
                        const avalibleCategories = ['City', 'Technik', 'Exlusive', 'Creator', 'Ninjago', 'Star Wars', 'Architecture', 'Super Mario', 'Harry Potter', 'Marvel'];
                        let categories = [];
                        for (const category of avalibleCategories) {                           
                            if (description.toUpperCase().includes(category.toUpperCase()))
                                categories.push(category);
                        }
                        
                    
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
                } catch (err) {
                    //not in sale
                    //console.log(err);
                }
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

    browser.close();   
    return({
        itemsCount,
        salesCount,
        itemsInSale
    });
    
}



module.exports = {getAlzaItems, getCzcItems};