Title:  
    Tripleten QA Project 8
    
Description:
    This project consists of two main sections:
        1. Writing
            The meat of this project is to write automated tests in javascript that check 9 specific points of functionality in the Urban Routes web app.  For each of the 9 tests, I include a descriptive title (beginning with the word 'should') and an expected result using the expect function.  There is a significant amount of code repition for each test, because certain prerequesites must be met before new parts of the app are open to testing (i.e. the address fields must be filled out the 'order taxi' button clicked before a phone number may be submitted).  The tests are checked via the WDIO automation framework.
            The final writing task is to create this README.md file.  
        3. Submitting 
            When the project files are completed and ready to be submitted for review, I commit and push the changes in the local folder hm08-qa-us to my GitHub page. At the time of writing, I haven't done this yet. My plan is the same as project 7: to create my own repository in GitHub and push the local file there before submitting. If it works the same as last time, it will be the same as though I had been able to link my GitHub in the first place.

A description of the technologies and techniques used:
    1. Automated Testing
        Writing test automation is the overarching theme of this project.
    *** In the file 'wdio.conf.js', functionality for Firefox has been commented out.  I was able to get all the tests working in Chrome, but only 7 out of 9 working in Firefox.  I worked for a long while with a tutor to debug this, and his conclusion was that there was an error with the binary .  Removing firefox from the config file was the ultimate solution he recommended to me.
    2. JavaScript
        Used to write tests for the endpoints.  Writing automated tests in javascript involves understanding a large number of techniques.  
        - The 'describe' function creates a block consisting of multiple tests that relate to a specific functionality.  'describe' and 'it' form the basic structure of the testing document.
        - the 'it' function is a subset of 'describe' and indicates single tests within the larger block
        - Asynchronus functions appear on most lines of code, allowing certain parts to resolve before moving on to the next part.
        - The 'expect' function acts as a 'finish line' for the test, allowing you to determine whether your requirements have been met or not.
        - CSS selectors are the most common way to find elements of a webpage to test.  
        - The 'inspect' feature of google chrome shows the HTML structure of the web app being tested and allows the tester to zero in on the specific elements of the page.  These can then be used (with their CSS selectors) to write accurate tests.
        - XPath selectors are a different way to accomplish the same thing as CSS selectors.  The difference is that XPath finds elements via constructing a specific path to them, which is useful when you are dealing with multiple elements of the same name.
        - Modules are blocks of code that are used multiple times in one testing document.  To avoid copy/pasting that block and cluttering up the code, a module is created in a separate file and referenced in the testing document.  The reference is accomplished with the 'import' and 'export' functions.
    3. Webdriver.IO
        Automation framework used to run tests in Chrome and Firefox.
    4. NPM
        A set of tools to enable code sharing in JavaScript.  Installing npm in my project and adding tools to it (such as chromedriver and geckodriver) is a large part of getting everything to work.
    5. GitHub
        Used to store and submit project files
    6. Terminal app
        Used to execute tests, install npm, create project files (i.e. this README.md), and push project files to GitHub.
    
Instructions for running the tests:
    1. Deploy server
    2. Copy the server URL and use it to replace the existing URL in the wdio.conf.js file
    3. Open a terminal (Mac) and navigate to the project file hm08-qa-us.
    4. Run the command npm install
    5. Run each test with the command: npx run wdio