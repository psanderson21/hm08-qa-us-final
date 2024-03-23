const page = require('../../page');
const helper = require('../../helper');

describe('Create an order', () => {

    //Setting the address
    it('should set the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601');

        await expect($(page.toField)).toHaveValue('1300 1st St');
    })

    //Selecting supportive plan
    it('should select supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        
        const supportivePlanButton = $('div=Supportive');
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await browser.pause(10000);
        await expect(supportivePlanButton).toBeExisting();
    })

    //Filling in the phone number
    it('should fill in the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");        
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    //Adding a credit card
    it('should add credit card to order', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const paymentMethod = $(page.paymentMethod);
        await paymentMethod.waitForDisplayed();
        await paymentMethod.click();

        const addCardButton = await $(page.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();

        const creditCardField = await $(page.creditCardField);
        await creditCardField.waitForDisplayed();
        await creditCardField.setValue(123400004321);
        
        const codeField = await $(page.codeField);
        await codeField.waitForDisplayed();
        await codeField.click();
        await codeField.setValue(12);

        const outOfControl = $('div=Adding a card');
        await outOfControl.waitForDisplayed();
        await outOfControl.click();

        const linkButton = await $(page.linkButton);
        await linkButton.waitForDisplayed();
        await linkButton.click();

        const addedCreditCard = $(page.addedCreditCard);
        await expect(addedCreditCard).toBeExisting();

    })

    //Writing a message for the driver
    it('should write a message for the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        
        const inputMessageToDriverField = await $(page.inputMessageToDriverField);
        await inputMessageToDriverField.waitForDisplayed();
        await inputMessageToDriverField.setValue('Thank you very much');

        const actualMessageToDriver = await $(page.actualMessageToDriver);
        await actualMessageToDriver.waitForDisplayed();
        await expect(actualMessageToDriver).toBeExisting();
    })

    //Ordering a blanket and handkerchiefs
    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const supportivePlanButton = $('div=Supportive');
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();

        const blanketButton = $(page.blanketButton);
        await blanketButton.waitForDisplayed();
        await blanketButton.click();
        
        const blanketCheckbox = await browser.$(".switch-input");
        const isChecked = await blanketCheckbox.isSelected();
        await expect(isChecked).toBe(true);

    })

    //Ordering 2 ice creams
    it('should order two ice cream', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const addIceCreamButton = await $(page.addIceCreamButton);
        await addIceCreamButton.waitForDisplayed();
        await addIceCreamButton.click();
        await browser.pause(10000);
        await addIceCreamButton.click();

        const iceCreamPrice = await $(page.iceCreamPrice);
        const iceCreamPriceFinal = await iceCreamPrice.getText();
        await expect(iceCreamPriceFinal).toBe("2");
    })

    //The car search modal appears
    it('should make car search modal appear', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const phoneNumber = helper.getPhoneNumber("+1");        
        await page.submitPhoneNumber(phoneNumber);
        
        const orderButton = await $(page.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();

        const carSearchModal = await $(page.carSearchModal);
        await carSearchModal.waitForDisplayed();
        await expect(carSearchModal).toBeExisting();
    })

    //Driver info should appear in car search modal
    it('should wait for driver info to appear in modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        
        const phoneNumber = helper.getPhoneNumber("+1");        
        await page.submitPhoneNumber(phoneNumber);

        const orderButton = await $(page.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();

        const carSearchModal = await $(page.carSearchModal);
        await carSearchModal.waitForDisplayed();
        
        const driverInfoDetails = $(page.driverInfoDetails);
        await driverInfoDetails.waitForDisplayed();
        await expect (driverInfoDetails).toBeExisting();

    })
})