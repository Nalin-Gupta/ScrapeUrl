// const { text } = require('express');
const pptr = require('puppeteer');

// const User = require('../models/User');
// const Url = require('../models/Url');


const scrape = async (address) => {
    const browser = await pptr.launch({
        'args': [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
     });
    const page = await browser.newPage();
    try{
        await page.goto(address);
    }catch(err){

    }
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