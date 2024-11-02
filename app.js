const puppeteer = require('puppeteer');

let page; // تعریف متغیر صفحه بیرون از تابع
let browser; // تعریف متغیر مرورگر بیرون از تابع

async function initializeBrowser() {
    // مرورگر را باز کرده و یک تب جدید ایجاد می‌کنیم
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
}
let result = 0;
async function checkOr() {
    if (!page) {
        // اگر هنوز صفحه‌ای باز نشده بود، مرورگر و تب را ایجاد می‌کنیم
        await initializeBrowser();
    }
    try {
        result += 1;
        // بارگذاری صفحه و انتظار تا زمانی که شبکه بی‌کار شود
        await page.goto('https://pouyashop.com/products/category-products/food', { waitUntil: 'networkidle2', timeout: 0 });
        
        // دکمه‌ی افزودن به سبد خرید را پیدا می‌کنیم
        const foodButton = await page.$('body > div > main > div > div:nth-child(2) > div > section > div > div.col-12.px-res-0 > div > div.owl-stage-outer > div > div:nth-child(1) > div > div > div.product-card-body > div.cart > a');
        
        if (foodButton) {
            // کلیک روی دکمه اگر موجود باشد
            await foodButton.click();
            console.log("clicked");

            // // انتظار برای انتخاب‌گر بعدی
            // await page.waitForSelector('CSS_SELECTOR');
            // const cartButton = await page.$('CSS_SELECTOR');
            // await cartButton.click();

            // // انتظار برای انتخاب‌گر بعدی
            // await page.waitForSelector('CSS_SELECTOR');
            // await page.type('CSS_SELECTOR', 'testcode');
            // const applyButton = await page.$('CSS_SELECTOR');
            // await applyButton.click();

            // // انتظار برای انتخاب‌گر نهایی و کلیک روی آن
            // await page.waitForSelector('CSS_SELECTOR');
            // const submitButton = await page.$('CSS_SELECTOR');
            // await submitButton.click();

        } else {
            console.log(foodButton);
            console.log(`Empty...try number of ${result}`);
        }
    } catch (error) {
        console.error("خطا:", error);
    }
}

setInterval(checkOr, 5000);
