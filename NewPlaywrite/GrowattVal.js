const { chromium } = require('playwright');
require('dotenv').config();

const usernameGrowatt = process.env.USERNAME_GROWATT;
const passwordGrowatt = process.env.PASSWORD_GROWATT;

async function getGrowattData() {
    const browser = await chromium.launch({
        headless: true  // Set headless to true for headless browsing
    });
    const page = await browser.newPage();
    let growattData = [];

    try {
        // Navigate to the Growatt login page
        await page.goto('https://server-us.growatt.com/');

        // Wait for login form elements
        await page.waitForSelector('#val_loginAccount', { timeout: 30000 });
        await page.waitForSelector('#val_loginPwd');
        await page.waitForSelector('.loginB');

        // Fill in username and password
        await page.fill('#val_loginAccount', usernameGrowatt);
        await page.fill('#val_loginPwd', passwordGrowatt);

        // Click on the login button
        await page.click('.loginB');

        // Navigate to the dashboard page
        await page.waitForTimeout(1000); // Adjust timeout as needed
        await page.goto('https://server-us.growatt.com/index');
        await page.waitForTimeout(1000); // Adjust timeout as needed

        // Process each device
        await processDevice(page, 'XSK0CKS058', growattData);
        await page.waitForTimeout(1000); // Adjust timeout as needed
        await processDevice(page, 'XSK0CKS03A', growattData);

        return growattData;

    } catch (error) {
        console.error('Error during script execution:', error);
    } finally {
        await browser.close();
    }
}

async function processDevice(page, deviceCode, growattData) {
    // Click on the device selector
    await page.locator('.selDiv_blank').locator('i').click();

    // Click on the specific device option
    await page.locator(`dd:has-text("${deviceCode}")`).click();
    await page.waitForTimeout(2000); // Adjust timeout as needed

    // Extract data from animPan element
    const animPan = await page.locator('.animPan');
    const texts = await animPan.innerHTML();
    const values = await extractValuesFromHTML(texts);

    // Push device data to growattData array
    growattData.push({ device: deviceCode, data: values });
}

async function extractValuesFromHTML(html) {
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
    const batteryVoltage = await extractValue(html, regexVoltage);
    const pv1Voltage = await extractValue(html, regexPvVoltage, 1);
    const pv2Voltage = await extractValue(html, regexPvVoltage, 2);
    const pv1RechargingCurrent = await extractValue(html, regexRechargingCurrent, 1);
    const pv2RechargingCurrent = await extractValue(html, regexRechargingCurrent, 2);
    const totalChargeCurrent = await extractValue(html, regexTotalChargeCurrent);
    const acInputVoltage = await extractValue(html, regexAcInput, 1);
    const acInputFrequency = await extractValue(html, regexAcInput, 2);
    const acOutputVoltage = await extractValue(html, regexAcOutput, 1);
    const acOutputFrequency = await extractValue(html, regexAcOutput, 2);
    const consumptionPower = await extractValue(html, regexConsumptionPower, 1);
    const consumptionPowerVA = await extractValue(html, regexConsumptionPower, 2);
    const loadPercentage = await extractValue(html, regexLoadPercentage);

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

async function extractValue(html, regex, groupIndex = 1) {
    const match = html.match(regex);
    return match ? parseFloat(match[groupIndex]) : null;
}

(async () => {
    const data = await getGrowattData();
    console.log(data);
})();
