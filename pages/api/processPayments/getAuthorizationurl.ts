import { NextApiRequest, NextApiResponse } from 'next';
import {useWebSocketClient} from "@lib/hooks";
import {bigcommerceClient, getSession, setItexpayApiKeys} from '../../lib/auth';
// import {SessionProps} from "@types";

export default async function getAuthorizationurl(req: NextApiRequest, res: NextApiResponse) {
    const {
        body,
        method,
    } = req;

    try {

        // console.log("yessh")
        // const { first_name, last_name, email, phone, grand_total } = body;
        // // const bod = { first_name, last_name, email, phone, grand_total };

        const fetch = require('node-fetch');
        const par = JSON.parse(body);

        const { id, first_name, last_name, email, phone, grand_total } = par;
        // console.log(email)

        // const apiFormattedData = { first_name, last_name, email, phone_number, amount };

        const reference = Math.ceil(Math.random()*10**16);


        let url = "https://staging.itexpay.com/api/pay";

        let options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'ITXPUB_STAGING_4MLOLINTPIZL9D1SBIUGOR5JM3CEJ0REBZGJBNBO-7623000009-L0GST0KPJXTH0UV'
                // Accept: 'application/json',
                // 'Content-Type': 'application/json',
                // 'X-Auth-Token': 'gdk5cbgxsevvah9669ib22s25x90dc0'
            },

            // body: `{"amount": ${amount}, "currency": "NGN", "redirecturl": "http://localhost:3000/api/capture", "customer": {"email": "toosoft36@gmail.com", "first_name": "izuchu", "last_name": "chukwu", "phone_number": "08025056555" }, "reference": ${reference}}`,
            body: `{"amount": ${grand_total}, "currency": "NGN", "redirecturl": "http://localhost:3000/api/${id}/capture", "customer": {"email": "${email}", "first_name": "${first_name}", "last_name": "${last_name}", "phone_number": "${phone}" }, "reference": ${reference}}`,

            // body: '{\n' +
            //     '    "amount": 98,\n' +
            //     '    "currency": "NGN",\n' +
            //     '    "redirecturl": "http://localhost:3000/api/capture",\n' +
            //     '    "customer": {\n' +
            //     '        "email": "toosoft36@gmail.com",\n' +
            //     '        "first_name": "izu",\n' +
            //     '        "last_name": "chukwu",\n' +
            //     '        "phone_number": "08025056555"\n' +
            //     '    },\n' +
            //     '    "reference": "as abhbjern new ref "\n' +
            //     '}',

            // body: '{"name":"Bootstrap","description":"Build responsive websites","src":"https://toosoft.com.ng/myscript.js","auto_uninstall":true,"load_method":"default","location":"head","visibility":"all_pages","kind":"src","consent_category":"essential"}'
        };


        const response = await fetch(url, options);
        const data = await response.json();
        // console.log(data)


        //let checkoutId;
        //      console.log('Log Checkout');
        // await fetch('/api/storefront/carts', {
        //   credentials: 'include'
        // }).then(function (response) {
        //   return response.json();
        // }).then(function (cartJson) {
        //   console.log(cartJson);
        //   return cartJson[0].id;
        // }).catch(function (error) {
        //   console.log(error);
        // }).then(function (cartId) {
        //   return fetch('/api/storefront/checkouts/' + cartId, {
        //     credentials: 'include'
        //   })
        // }).then(function (response) {
        //   return response.json();
        // }).then(function (checkoutJson) {
        //     checkoutId = checkoutJson.id;
        //   console.log(checkoutJson);
        // }).catch(function (error) {
        //   console.log(error);
        // });

        //fetch(url, options)
        //     .then(res => res.json())
        //     //.then(json => console.log(json))
        //     .then(json =>  {
        //         authorization_url = json.authorization_url; // Assign the response to a variable
        //     })
        //     .catch(err => console.error('error:' + err));
        //
        //        location.href = authorization_url;

        // const response = await fetch(url, options);
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        // const data =  response.json();
        // const session = await getSession(req);
        //
        // const { accessToken, storeHash } = await getSession(req);
        // const bigcommerce = bigcommerceClient(accessToken, storeHash);
        //
        // const { data } = await bigcommerce.get(`/catalog/products/${pid}`);
        // res.status(200).json(data);
        // Authenticate the app on install
        // const session = await getBCAuth(req.query);
        // const encodedContext = encodePayload(session); // Signed JWT to validate/ prevent tampering
        // const itexkeys = req.body;
        // const sampleData = {
        //     message: 'Hello, BigCommerce storefront!',
        //     timestamp: new Date(),
        //     itexkeys,
        // };
        //
        // // Respond with the sample data as JSON
        res.status(200).json(data);

    } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json({ message });
    }

    // try {
    //     const { accessToken, storeHash } = await getSession(req);
    //     const bigcommerce = bigcommerceClient(accessToken, storeHash);
    //
    //     const { data } = await bigcommerce.get(`/catalog/products/${pid}`);
    //     res.status(200).json(data);
    // } catch (error) {
    //     const { message, response } = error;
    //     res.status(response?.status || 500).json({ message });
    // }
}

// export default async function products(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         const { accessToken, storeHash } = await getSession(req);
//         const bigcommerce = bigcommerceClient(accessToken, storeHash);
//
//         const { data } = await bigcommerce.get('/catalog/summary');
//         res.status(200).json(data);
//     } catch (error) {
//         const { message, response } = error;
//         res.status(response?.status || 500).json({ message });
//     }
// }

// <script>
// (function(win) {
//     'use strict';
//
//     var listeners = [],
//     doc = win.document,
//     MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
//     observer;
//
//     function ready(selector, fn) {
//         // Store the selector and callback to be monitored
//         listeners.push({
//             selector: selector,
//             fn: fn
//         });
//         if (!observer) {
//             // Watch for changes in the document
//             observer = new MutationObserver(check);
//             observer.observe(doc.documentElement, {
//                 childList: true,
//                 subtree: true
//             });
//         }
//         // Check if the element is currently in the DOM
//         check();
//     }
//
//     function check() {
//         // Check the DOM for elements matching a stored selector
//         for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
//             listener = listeners[i];
//             // Query for elements matching the specified selector
//             elements = doc.querySelectorAll(listener.selector);
//             for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
//                 element = elements[j];
//                 // Make sure the callback isn't invoked with the
//                 // same element more than once
//                 if (!element.ready) {
//                     element.ready = true;
//                     // Invoke the callback with the element
//                     listener.fn.call(element, element);
//                 }
//             }
//         }
//     }
//
//     // Expose `ready`
//     win.ready = ready;
//
// })(this);
//
// //ready('#checkoutBillingAddress', function(element) {
// ready('.form-checklist.optimizedCheckout-form-checklist', function(element) {
// //ready('.form-checklist-item', function(element) {
// //ready('#checkout-payment-continue', function(element) {
//     // do something
//    // alert("You're on the payment step!");
// //-----------------------------------------------
//  // Create the li element
// var listItem = document.createElement('li');
// listItem.classList.add('form-checklist-item', 'optimizedCheckout-form-checklist-item');
//
// // Create the div with class "form-checklist-header"
// var headerDiv = document.createElement('div');
// headerDiv.classList.add('form-checklist-header');
//
// // Create the form-field div
// var formFieldDiv = document.createElement('div');
// formFieldDiv.classList.add('form-field');
//
// // Create the input element
// var inputElement = document.createElement('input');
// inputElement.setAttribute('id', 'radio-itexpay');
// inputElement.setAttribute('type', 'radio');
// inputElement.classList.add('form-checklist-checkbox', 'optimizedCheckout-form-checklist-checkbox');
// inputElement.setAttribute('name', 'paymentProviderRadio');
// inputElement.setAttribute('value', 'itexpay');
//
// // Create the label element
// var labelElement = document.createElement('label');
// labelElement.setAttribute('for', 'radio-itexpay');
// labelElement.classList.add('form-label', 'optimizedCheckout-form-label');
//
// // Create the paymentProviderHeader-container div
// var headerContainerDiv = document.createElement('div');
// headerContainerDiv.classList.add('paymentProviderHeader-container');
//
// // Create the paymentProviderHeader-nameContainer div
// var nameContainerDiv = document.createElement('div');
// nameContainerDiv.classList.add('paymentProviderHeader-nameContainer');
// nameContainerDiv.setAttribute('data-test', 'payment-method-itexpay');
//
// // Create the paymentProviderHeader-name div
// var nameDiv = document.createElement('div');
// nameDiv.setAttribute('aria-level', '6');
// nameDiv.classList.add('paymentProviderHeader-name');
// nameDiv.setAttribute('role', 'heading');
// nameDiv.textContent = 'ITEXPay';
// nameDiv.setAttribute('data-test', 'payment-method-name');
//
// // Create the paymentProviderHeader-cc div
// var ccDiv = document.createElement('div');
// ccDiv.classList.add('paymentProviderHeader-cc');
//
// // Append the elements to build the structure
// nameContainerDiv.appendChild(nameDiv);
// headerContainerDiv.appendChild(nameContainerDiv);
// labelElement.appendChild(headerContainerDiv);
// formFieldDiv.appendChild(inputElement);
// formFieldDiv.appendChild(labelElement);
// headerDiv.appendChild(formFieldDiv);
// listItem.appendChild(headerDiv);
//
// // Append the list item to the desired parent element in your document
// var parentElement = document.querySelector('ul'); // Replace with the actual parent element selector
// parentElement.appendChild(listItem);
//
//
// //-----------------------------------------------------------------
//
//     var li = document.createElement("button");
//     //alert('button created now');
//
// // Set the button's attributes
// li.innerHTML = "Click Me"; // Text inside the button
// li.id = "myButton"; // ID for the button
//
// // Add an event listener to the button (optional)
// li.addEventListener("click", function() {
//     alert("li Clicked!");
// });
//
// // Find an existing element in the HTML to append the button to (e.g., a <div> with id="container")
// var container = document.getElementsByClassName("form-checklist"); // Replace "container" with the actual ID of the element
//
// // Append the button to the container element
// container[0].appendChild(listItem);
//
//     // Get all radio buttons with the name "paymentMethod"
// var radioButtons = document.getElementsByName("paymentProviderRadio");
//     function itexpay_process() {
//             	//alert("adddfd redirecting ...");
//         location.href = "http://localhost:3000/products";
//             }
// // Add an event listener to each radio button
// for (var i = 0; i < radioButtons.length; i++) {
//     radioButtons[i].addEventListener("change", function(event) {
//         // Check if the radio button is selected
//         //alert("payment method changed");
//         if (event.target.checked) {
//             // Get the selected value
//             var selectedValue = event.target.value;
//             var place_order = document.getElementById('checkout-payment-continue');
//
//             if (selectedValue !== "itexpay" && place_order.type !== "submit"){
//                 place_order.type = "submit";
//               		place_order.removeEventListener("click", itexpay_process);
//             }
//             if (selectedValue == "itexpay" && place_order.type !== "button"){
//                 place_order.type = "button";
//               		place_order.addEventListener("click", itexpay_process);
//             }
//
//         }
//     });
// }
//
// });
//
//     console.log('Log Checkout');
// fetch('/api/storefront/carts', {
//   credentials: 'include'
// }).then(function (response) {
//   return response.json();
// }).then(function (cartJson) {
//   console.log(cartJson);
//   return cartJson[0].id;
// }).catch(function (error) {
//   console.log(error);
// }).then(function (cartId) {
//   return fetch('/api/storefront/checkouts/' + cartId, {
//     credentials: 'include'
//   })
// }).then(function (response) {
//   return response.json();
// }).then(function (checkoutJson) {
//   console.log(checkoutJson);
// }).catch(function (error) {
//   console.log(error);
// });
// </script>
