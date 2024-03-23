module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    phoneCodeField: '#code',
    paymentMethod: '.pp-text',
    creditCardField: '.card-number-input #number',
    codeField: '.card-second-row #code',
    paymentValueMethod: '.pp-value-text',
    addedCreditCard: 'div=Card',
    inputMessageToDriverField: '#comment',
    actualMessageToDriver: 'div.reqs-header',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlanButton: 'button=Supportive',
    addCardButton: 'div=Add card',
    linkButton: "button=Link",
    closeButton: '.payment-picker .section.active .close-button',
    blanketButton: 'div.r-sw',
    addIceCreamButton: '.counter-plus',
    iceCreamPrice: '.counter-value',
    orderButton: '.smart-button-main',

    // Modals
    phoneNumberModal: '.modal',
    carSearchModal: '.order-body',
    driverInfoDetails: '.order-subbody',

    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.phoneCodeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
};