/*var webdriver = require("selenium-webdriver");

var browser_name = new webdriver.Builder().withCapabilities(webdriver.Capabilities.firefox()).build();

browser.get("http://localhost:3000");

var promise = browser_name.getTitle();

promise.then(function(title) 

{

console.log(title);

//console.log("hola");

});

browser.quit();*/
/*const {Builder, By, Key, util} = require("selenium-webdriver");
const webdriver = require('selenium-webdriver');
//const chromedriver = require('chromedriver');


async function example() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/");
}

example();*/

const webdriver=require('selenium-webdriver');
const chrome=require('selenium-webdriver/chrome');
const chromedriver=require('chromedriver');


chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

var driver = new webdriver.Builder()
                 .withCapabilities(webdriver.Capabilities.chrome())
                 .build();

driver.get("http://localhost:3000");

var promise = driver.getTitle();

promise.then(function(title) 

{

console.log(title);

//console.log("hola");

});

//driver.quit();