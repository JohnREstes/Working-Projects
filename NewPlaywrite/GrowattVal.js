const { chromium } = require('playwright');  // Ensure you're importing Playwright correctly

async function main(){
    const browser = await chromium.launch({
        headless: true  // Set headless to true
    });
    const page = await browser.newPage();
    let texts, values, animPan;

    try {
        await page.goto('https://server-us.growatt.com/');
        await page.waitForTimeout(1000);

        await page.waitForSelector('#val_loginAccount', { timeout: 30000 });
        await page.fill('#val_loginAccount', 'johnnie321');
        
        await page.waitForSelector('#val_loginPwd');
        await page.fill('#val_loginPwd', '133Utica');
        
        await page.getByRole('button', { name: 'Login' }).click();
        
        await page.waitForTimeout(1500);
        await page.goto('https://server-us.growatt.com/index');
        await page.waitForTimeout(1500);

        await page.locator('div').filter({ hasText: /^XSK0CKS03AXSK0CKS058$/ }).locator('i').click();
        await page.locator('dd').filter({ hasText: 'XSK0CKS03A' }).click();
        await page.waitForTimeout(1000);
        
        // Locate and extract HTML content from .animPan element
        animPan = await page.$('.animPan');
        texts = await animPan.innerHTML();
        
        // Extract specific data using regex or DOM manipulation
        values = extractValuesFromHTML(texts);
        console.log("XSK0CKS03A", values);

        await page.locator('div').filter({ hasText: /^XSK0CKS03AXSK0CKS058$/ }).locator('i').click();
        await page.locator('dd').filter({ hasText: 'XSK0CKS058' }).click();
        await page.waitForTimeout(1000);

        // Locate and extract HTML content from .animPan element
        animPan = await page.$('.animPan');
        texts = await animPan.innerHTML();
        
        // Extract specific data using regex or DOM manipulation
        values = extractValuesFromHTML(texts);
        console.log('XSK0CKS058', values);

    } catch (error) {
        console.error('Error during script execution:', error);
    } finally {
        await browser.close();
    }
}

main();

function extractValuesFromHTML(html) {
    // Regular expressions to match and extract values
    const regexVoltage = /Battery Voltage<\/td><td><span class="val_i_vBat">([\d.]+)<\/span>V/;
    const regexPvVoltage = /PV1\/PV2 Voltage<\/td><td><span class="val_i_vPv1">([\d.]+)<\/span>\/<span class="val_i_vPv2">([\d.]+)<\/span>V/;
    const regexRechargingCurrent = /PV1\/PV2 Recharging Current<\/td><td><span class="val_i_iPv1">([\d.]+)<\/span>\/<span class="val_i_iPv2">([\d.]+)<\/span>A/;
    const regexTotalChargeCurrent = /Total Charge Current<\/td><td><span class="val_i_iTotal">([\d.]+)<\/span>A/;
    const regexAcInput = /Ac Input Voltage\/Frequency<\/td><td><span class="val_i_vAcInput">([\d.]+)<\/span>V\/<span class="val_i_fAcInput">([\d.]+)<\/span>HZ/;
    const regexAcOutput = /Ac Output Voltage\/Frequency<\/td><td><span class="val_i_vAcOutput">([\d.]+)<\/span>V\/<span class="val_i_fAcOutput">([\d.]+)<\/span>HZ/;
    const regexConsumptionPower = /Consumption Power<\/td><td><span class="val_i_loadPower">([\d.]+)<\/span>W\/<span class="val_i_loadPower2">([\d.]+)<\/span>VA/;
    const regexLoadPercentage = /Load Percentage<\/td><td><span class="val_i_loadPrecent">([\d.]+)<\/span>%/;

    // Extract values using regex
    const batteryVoltage = extractValue(html, regexVoltage);
    const pv1Voltage = extractValue(html, regexPvVoltage, 1);
    const pv2Voltage = extractValue(html, regexPvVoltage, 2);
    const pv1RechargingCurrent = extractValue(html, regexRechargingCurrent, 1);
    const pv2RechargingCurrent = extractValue(html, regexRechargingCurrent, 2);
    const totalChargeCurrent = extractValue(html, regexTotalChargeCurrent);
    const acInputVoltage = extractValue(html, regexAcInput, 1);
    const acInputFrequency = extractValue(html, regexAcInput, 2);
    const acOutputVoltage = extractValue(html, regexAcOutput, 1);
    const acOutputFrequency = extractValue(html, regexAcOutput, 2);
    const consumptionPower = extractValue(html, regexConsumptionPower, 1);
    const consumptionPowerVA = extractValue(html, regexConsumptionPower, 2);
    const loadPercentage = extractValue(html, regexLoadPercentage);

    return {
        'Battery Voltage': batteryVoltage,
        'PV1 Voltage': pv1Voltage,
        'PV2 Voltage': pv2Voltage,
        'PV1 Recharging Current': pv1RechargingCurrent,
        'PV2 Recharging Current': pv2RechargingCurrent,
        'Total Charge Current': totalChargeCurrent,
        'Ac Input Voltage': acInputVoltage,
        'Ac Input Frequency': acInputFrequency,
        'Ac Output Voltage': acOutputVoltage,
        'Ac Output Frequency': acOutputFrequency,
        'Consumption Power': consumptionPower,
        'Consumption Power VA': consumptionPowerVA,
        'Load Percentage': loadPercentage
    };
}

function extractValue(html, regex, groupIndex = 1) {
    const match = html.match(regex);
    return match ? parseFloat(match[groupIndex]) : null;
}
