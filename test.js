const puppeteer = require('puppeteer');

async function checkAndOrder() {
    // اجرای مرورگر به صورت headless (در پس‌زمینه)
    const browser = await puppeteer.launch({ headless: false }); // برای نمایش مرورگر، headless: false تنظیم کنید
    const page = await browser.newPage();

    try {
        // باز کردن سایت
        await page.goto('URL_سایت_سفارش_غذا', { waitUntil: 'networkidle2' });

        // پیدا کردن و کلیک روی دکمه انتخاب غذا
        const foodButton = await page.$('CSS_SELECTOR_دکمه_انتخاب_غذا');
        if (foodButton) {
            await foodButton.click();
            console.log("غذا انتخاب شد.");

            // رفتن به صفحه سبد خرید
            await page.waitForSelector('CSS_SELECTOR_دکمه_سبد_خرید');
            const cartButton = await page.$('CSS_SELECTOR_دکمه_سبد_خرید');
            await cartButton.click();
            console.log("به سبد خرید منتقل شد.");

            // وارد کردن کد تخفیف
            await page.waitForSelector('CSS_SELECTOR_کادر_کد_تخفیف');
            await page.type('CSS_SELECTOR_کادر_کد_تخفیف', 'کد تخفیف شما');
            const applyButton = await page.$('CSS_SELECTOR_دکمه_ثبت_کد_تخفیف');
            await applyButton.click();
            console.log("کد تخفیف ثبت شد.");

            // کلیک روی دکمه ثبت سفارش
            await page.waitForSelector('CSS_SELECTOR_دکمه_ثبت_سفارش');
            const submitButton = await page.$('CSS_SELECTOR_دکمه_ثبت_سفارش');
            await submitButton.click();
            console.log("سفارش ثبت شد.");

        } else {
            console.log("غذا موجود نیست. چند ثانیه دیگر بررسی می‌شود.");
        }
    } catch (error) {
        console.error("خطا:", error);
    } finally {
        // بستن مرورگر
        await browser.close();
    }
}

// اجرای اسکریپت به‌صورت متناوب
setInterval(checkAndOrder, 5000); // هر ۵ ثانیه یک بار سایت چک می‌شود