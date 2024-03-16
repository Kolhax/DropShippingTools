// ==UserScript==
// @name         Product Info Retriever
// @namespace    https://www.kepar.fun
// @version      0.1
// @description  Adds a button overlay to retrieve AliExpress product information
// @author       KeparDEV
// @match        *://*.aliexpress.com/item/*
// ==/UserScript==

(function () {
    'use strict';

    // Function to retrieve text content based on XPath
    function getTextContent(xpath) {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        return element ? element.textContent.trim() : null;
    }

    // Function to retrieve video poster attribute based on XPath
    function getVideoPoster(xpath) {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        return element instanceof HTMLVideoElement ? element.poster : null;
    }

    // Function to retrieve text content of heading based on XPath
    function getHeadingTextContent(xpath) {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        return element ? element.textContent.trim() : null;
    }

    // Function to get the current URL without query parameters
    function getCurrentURLWithoutQuery() {
        const currentURL = window.location.href;
        const urlWithoutQuery = currentURL.split('?')[0];
        return urlWithoutQuery;
    }

    // XPath expressions
    const priceXpath = '//*[@id="root"]/div/div[2]/div/div[1]/div[1]/div[2]/div[2]';
    const shippingXpath = '//*[@id="root"]/div/div[2]/div/div[2]/div/div/div[3]/div/div[2]/div';
    const ratingXpath = '//*[@id="root"]/div/div[2]/div/div[1]/div[1]/div[2]/div[6]';
    const videoPosterXpath = '//*[@id="root"]/div/div[2]/div/div[1]/div[1]/div[1]/div/div/div[1]/div[1]/div/video';
    const headingXpath = '//*[@id="root"]/div/div[2]/div/div[1]/div[1]/div[2]/div[5]/h1';

    // Retrieve data using XPath expressions
    const data = {
        HeadingText: getHeadingTextContent(headingXpath),
        Price: getTextContent(priceXpath),
        Shipping: getTextContent(shippingXpath),
        Rating: getTextContent(ratingXpath),
        VideoPoster: getVideoPoster(videoPosterXpath),
        CurrentURLWithoutQuery: getCurrentURLWithoutQuery(),
    };

    // Create a button and set its style
    const button = document.createElement('button');
    button.innerHTML = 'Get Product Info';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.left = '10px';
    button.style.zIndex = '9999';
    button.style.padding = '10px';
    button.style.cursor = 'pointer';

    // Add click event to the button
    button.addEventListener('click', function () {
        // Create a text area and set its value
        const textArea = document.createElement('textarea');
        textArea.value =
            `HeadingText: ${data.HeadingText}\n` +
            `Price: ${data.Price}\n` +
            `Shipping: ${data.Shipping}\n` +
            `Rating: ${data.Rating}\n` +
            `Video Poster: ${data.VideoPoster}\n` +
            `Current URL without Query: ${data.CurrentURLWithoutQuery}`;

        // Append the text area to the document
        document.body.appendChild(textArea);

        // Select the text in the text area
        textArea.select();
        textArea.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text to the clipboard
        document.execCommand('copy');

        // Remove the text area from the document
        document.body.removeChild(textArea);

        // Display alert to inform the user
        alert('Data has been copied to the clipboard.');
    });

    // Append the button to the document
    document.body.appendChild(button);

})();
