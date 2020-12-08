// const { text } = require('express');
const pptr = require('puppeteer');

// const User = require('../models/User');
// const Url = require('../models/Url');


const scrape = async (address) => {
    const browser = await pptr.launch({
        headless : true,
        // slowMo : 250
     });
    const page = await browser.newPage();
    await page.goto(address);
    // await page.screenshot({path : 'wiki.png'});
    // console.log(divs.length);
    // console.log(divs[1]);
    
    const text = await page.evaluate( () => {
        const paras = document.getElementsByTagName("p");
        // const data = paras[2].textContent;
        let arr = [];
        for(let i = 0 ; i< paras.length ; i++){
            arr.push(paras[i].textContent);
        }
        return arr;
    });

    await browser.close();
    // console.log(text);
    return text;
};

module.exports = scrape;