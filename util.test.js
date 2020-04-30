const puppeteer = require('puppeteer');
const {generateText, checkAndGenerate} = require('./util');

test('should output name and age', () => {
    const text = generateText("Ronan", 51);
    expect(text).toBe('Ronan (51 years old)');
});

test('should generate a valid text output', () => {
    const text = checkAndGenerate('Bob', 33);
    expect(text).toBe('Bob (33 years old)');
});

test('should create an element with text and correct class', async() => {
    const browser = await puppeteer.launch({
        headless: false,
         slowMo: 80,
         args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.goto("file:///C:/JS_Projects/JS-Testing/index.html");
    await page.click('input#name');
    await page.type('input#name', 'Lee');
    await page.click('input#age');
    await page.type('input#age', '42');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Lee (42 years old)');
}, 10000);