const WebSocket = require('ws');
const http = require('http');
const express = require("express");
const socketserver = http.createServer();
// const Redis = require('ioredis');
// const redisClient = new Redis();

// const cors = require('cors'); // Import the cors package
// Enable CORS by setting the appropriate headers
// socketserver.on('request', (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust the origin as needed
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
//
//     if (req.method === 'OPTIONS') {
//         res.writeHead(200);
//         res.end();
//     }
//
//     // ... rest of your request handling logic
// });

const wss = new WebSocket.Server({ noServer: true });

const redisClient = require('./redis'); // Adjust the path as needed

// Now you can use `redisClient` to interact with Redis
// const reference = Math.ceil(Math.random()*10**16);
// let reference;

// redisClient.get('myKey', (err, result) => {
//     if (err) {
//         console.error('Error:', err);
//     } else {
//         console.log('Value:', result);
//     }
// });

const Redis = require('ioredis');
const redis = new Redis(); // Connect to your Redis server

// Initialize a cursor with value 0
let cursor = 0;
let ref;
let reference;


// // Delete a single key
// redis.del('2f473a22-b55d-4678-a863-ffa8da77fbfe', (err, result) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(`Deleted ${result} keys`);
//     }
// });


// (async () => {
//     const allKeysAndValues = {};
//
//     while (true) {
//         const [newCursor, keys] = await redis.scan(cursor, 'MATCH', '*');
//
//         // Iterate through the keys and get their values
//         for (const key of keys) {
//             const value = await redis.get(key);
//             allKeysAndValues[key] = value;
//         }
//
//         // Update the cursor for the next iteration
//         cursor = newCursor;
//
//         // Check if the iteration has finished
//         if (cursor === '0') {
//             break;
//         }
//     }
//
//     console.log('All Keys and Values:', allKeysAndValues);
//     redis.quit(); // Close the Redis connection when done
// })();



let receivedMessage; // Declare a variable to store the message

// const clients = new Map(); // Map to associate client IDs with WebSocket instances


wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    // clients.set('clientA', ws); // Store the WebSocket instance with its associated client ID


    ws.on('message', (message) => {
        if (typeof message === 'string') {
            // Handle text messages
            // console.log(`Received WebSocket Client message: ${message}`);
            // receivedMessage = message; // Store the message as text
            const par = JSON.parse(message);
            const mess = par.orderAttempts;
            const autho = par.authorization_url;
            redisClient.set(`${mess}`, JSON.stringify({'authorization_url': autho}));

        }
        else if (message instanceof Buffer) {
            // Handle binary messages by converting them to text
            const textMessage = message.toString('utf-8'); // Convert to UTF-8 text

            const par = JSON.parse(textMessage);
            const mess = par.orderAttempts;
            const autho = par.authorization_url;
            redisClient.set(`${mess}`, JSON.stringify({'authorization_url': autho}));

        }
    });
});

socketserver.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});


socketserver.on('request', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust the origin as needed
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
    } else {

        if (req.method === 'POST' && req.url === '/send') {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                // Broadcast the received HTTP request body to all WebSocket clients

                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(body);
                    }
                });


                const bd = JSON.parse(body);
                console.log(bd.authorization_url);
                console.log(bd.checkoutId);
                console.log(bd.orderAttempts);

                ref = bd.orderAttempts;

                async function getValueWithPolling(key) {
                    return new Promise(async (resolve) => {
                        async function poll() {
                            const value = await redisClient.get(key);
                            if (value !== null) {
                                resolve(value);
                            } else {
                                // If the value is not set, wait for a while and then poll again
                                setTimeout(poll, 1000); // Adjust the polling interval as needed
                            }
                        }

                        // Start the polling
                        poll();
                    });
                }

                (async () => {
                    try {
                        const value = await getValueWithPolling(`${ref}`);

                        console.log('Value:', value);
                        // Send the WebSocket message response to the HTTP client
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(value || '');

                    } catch (err) {
                        console.error('Error:', err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                    } finally {
                        // redisClient.quit(); // Close the Redis connection
                    }
                })();




                // Send a JSON response back to the HTTP client
                // const jsonResponse = {receivedMessage: "recedMessage"};
                // res.writeHead(200, {'Content-Type': 'application/json'});
                // res.end(JSON.stringify(jsonResponse));
                // res.end(jsonResponse);
            });
        }
        else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not Found');
        }
    }
});


// Start the server
const port = 8080; // Port for serving files

socketserver.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
