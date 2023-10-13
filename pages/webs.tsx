// import React, {useEffect, useState} from 'react';
// import {useRouter} from "next/router";
// import {useSession} from "../context/session";
// import {
//     useWebSocketClientCap,
//     useTest,
//     useGetCheckout,
//     useGetAuthorizationurl,
//     useWebSocketCl,
//     useWebSocketClientAuth,
// } from "@lib/hooks";
//
// // let globalReceivedMessage;
// // let globalReceivedMessage = 'bby';
//
// const WebSocketClien = () => {
//
//     // const [receivedMessages, setReceivedMessages] = useState([]); // State to store received messages
//     // const [rMessage, setRMessage] = useState({}); // State to store received messages
//     //
//     // const { data } = useTest();
//     // //
//     // const yess = {data};
//     //
//     // const router = useRouter();
//     // const encodedContext = useSession()?.context;
//     //
//     // // const pid = Number(router.query?.pid);
//     // const { isActive: isActive, current_mode: current_mode, test_public_key, test_private_key, test_encryption_key, live_public_key, live_private_key, live_encryption_key, error, isLoading, mutateList } = useItexpaySettings();
//     // // const { isLoading: isInfoLoading, product } = useProductInfo(pid, list);
//     // // const { description, public_key, private_key, encryption_key, type } = product ?? {};
//     // // const apiFormattedData = { isActive, current_mode, test_public_key, test_private_key, test_encryption_key, live_public_key, live_private_key, live_encryption_key };
//     //
//     // const apiFormattedData = { isActive, current_mode, receivedMessages }
//     //
//     // // const {  isActive, current_mode, test_public_key, test_private_key, test_encryption_key, live_public_key, live_private_key, live_encryption_key } = data;
//     // // const apiFormattedData = { isActive: isActive, current_mode: current_mode, test_public_key, test_private_key, test_encryption_key, live_public_key, live_private_key, live_encryption_key };
//     //
//     // // Update local data immediately (reduce latency to user)
//     // // mutateList([...filteredList, { ...product, ...data }], false);
//     //
//     // // Update product details
//     //
//     // // const handleSubmit = async (data: ItexpayProps) => {
//     // //     try {
//     // //         // const filteredList = list.filter(item => item.id !== pid);
//     // //         const {  isActive, current_mode, test_public_key, test_private_key, test_encryption_key, live_public_key, live_private_key, live_encryption_key } = data;
//     // //         const apiFormattedData = { isActive: isActive, current_mode: current_mode, test_public_key, test_private_key, test_encryption_key, live_public_key, live_private_key, live_encryption_key };
//     // //
//     // //         // Update local data immediately (reduce latency to user)
//     // //         // mutateList([...filteredList, { ...product, ...data }], false);
//     // //
//     // //         // Update product details
//     // //         await fetch(`/api/sample?context=${encodedContext}`, {
//     // //             method: 'PUT',
//     // //             headers: { 'Content-Type': 'application/json' },
//     // //             body: JSON.stringify(apiFormattedData),
//     // //             // body: JSON.stringify(apiFormattedData),
//     // //         });
//     // //
//     // //         // Refetch to validate local data
//     // //         // mutateList();
//     // //
//     // //         router.push('/settings');
//     // //     } catch (error) {
//     // //         console.error('Error updating the product: ', error);
//     // //     }
//     // // };
//     //
//     // // const [datass, setData] = useState(null);
//     // const [myResponse, setMyResponse] = useState({}); // Initialize with null or an initial value
//     //
//     // const checkoutId = '2f473a22-b55d-4678-a863-ffa8da77fbfe';
//     // useEffect(() => {
//     //     // Simulating an asynchronous operation (e.g., fetching data)
//     //     const fetchData = async () => {
//     //         try {
//     //             // Update product details http://localhost:3000/api/verifyItexpaymentstatus'
//     //             // const response = await fetch('http://localhost:3000/api/authorizationUrl', {
//     //             const response = await fetch(`/api/checkouts/2f473a22-b55d-4678-a863-ffa8da77fbfe?context=${encodedContext}`, {
//     //             // const response = await fetch(`/api/checkouts/ccc`, {
//     //             // const response = await fetch(`/api/checkouts/${checkoutId}?context=${encodedContext}`, {
//     //                 method: 'GET',
//     //                 // headers: { 'Content-Type': 'application/json' },
//     //                 // body: JSON.stringify(apiFormattedData),
//     //                 // body: JSON.stringify(apiFormattedData),
//     //             });
//     //
//     //             const datass = await response.json();
//     //             const { email } = datass.data.cart;
//     //             const chec = { email };
//     //
//     //             setMyResponse(chec);
//     //             // const response = await fetch('https://example.com/api/data');
//     //             // const jsonData = await response.json();
//     //             // setData(jsonData); // Update the state with the resolved data
//     //         } catch (error) {
//     //             const { message } = error;
//     //             setMyResponse({ message });
//     //
//     //             console.error('Error fetching data:', error);
//     //         }
//     //     };
//     //
//     //     // Call the fetchData function
//     //     fetchData();
//     // }, []); // Empty dependency array to run the effect once
//     //
//     //
//     // useEffect(() => {
//     //     // WebSocket connection setup
//     //     const socket = new WebSocket('ws://localhost:8080'); // Replace with your server's address
//     //     // const socket = new WebSocket('ws://localhost:3000/api/sample'); // Replace with your server's address
//     //
//     //     // Event listener for when the WebSocket connection is established
//     //     socket.addEventListener('open', () => {
//     //         console.log('WebSocket connection established');
//     //
//     //         // You can send messages to the server after the connection is established
//     //         socket.send(
//     //             // myResponse.email
//     //             'Hello from the ws client changed kk!'
//     //         );
//     //     });
//     //
//     //     // Event listener for receiving messages from the server
//     //     socket.addEventListener('message', (event) => {
//     //
//     //         const receivedMessage = event.data;
//     //         // const rMessage = typeof (JSON.parse(event.data));
//     //         // const essage = event.data;
//     //         const essage = JSON.parse(event.data);
//     //         const { checkoutId } = essage;
//     //
//     //         const rMessage = { checkoutId };
//     //
//     //         setReceivedMessages((prevMessages) => [...prevMessages, receivedMessage]);
//     //         setRMessage(rMessage);
//     //
//     //         console.log(`Received: ${event.data}`);
//     //     });
//     //
//     //     // Event listener for when the WebSocket connection is closed
//     //     socket.addEventListener('close', () => {
//     //         console.log('WebSocket connection closed');
//     //     });
//     //
//     //     // Clean up the WebSocket connection when the component unmounts
//     //     return () => {
//     //         socket.close();
//     //     };
//     // }, []);
//     //
//     //     // return {
//     //     //     messagess:  yess.data ,
//     //     // }
//     //
//     // return (
//     //     <div className="WebSocketClient">
//     //         <h1>WebSocket Clientsss
//     //         </h1>
//     //         <p>
//     //         {/*{yess.data} {formData.isActive} {formData.current_mode} {formData.test_private_key}*/}
//     //         </p>
//     //         <ul>
//     //         {receivedMessages.map((message, index) => (
//     //             <li key={index}>{message}</li>
//     //         ))}
//     //         </ul>
//     //         <h3> { myResponse.email } <br/></h3>
//     //         <h3> { myResponse.message } <br/></h3>
//     //         <h3> { rMessage.checkoutId } <br/></h3>
//     //         <p>Check  the browser console for WebSocket messages.</p>
//     //     </div>
//     // );
//
//     // const { data} = useTest();
//
//     const { first_name, last_name, email, phone_number, amount, authurl } = useWebSocketClientAuth();
//     // const { first_name } = useWebSocketClientCap();
//
//     return (
//                 <div className="WebSocketClient">
//
//                     <h1>Get Authorization Url</h1>
//                     <p>{first_name}</p>
//                     <p>{last_name}</p>
//                     <p>{email}</p>
//                     <p>{phone_number}</p>
//                     <p>{amount}</p>
//                     <p>{authurl}</p>
//
//                 </div>
//             );
//
//
//     // const { first_name, last_name, email } = useWebSocketClientCap();
//     //
//     // return (
//     //     <div className="WebSocketClient">
//     //         <h1>Capture Payment</h1>
//     //         <p>{first_name}</p>
//     //         <p>{last_name}</p>
//     //         <p>{email}</p>
//     //     </div>
//     // );
//
// }
//
// export default WebSocketClien;


import {useItexpaySettings, useTest} from "@lib/hooks";
import {useRouter} from "next/router";
import React, { useEffect, useState } from 'react';
import {useSession} from "../context/session";

function wsc() {
    // export function WebSocketClie() {
//     const [receivedMessages, setReceivedMessages] = useState([]); // State to store received messages
    const [rMessage, setRMessage] = useState(null); // State to store received messages
    const [orderAttempts, setOrderAttempts] = useState(null); // State to store received messages
    // const [datass, setData] = useState(null);
    const [myResponse, setMyResponse] = useState(null); // Initialize with null or an initial value
    const [myUrl, setMyUrl] = useState(null); // Initialize with null or an initial value

    const {data} = useTest();
    //
    const yess = {data};

    const router = useRouter();
    const encodedContext = useSession()?.context;

    // const pid = Number(router.query?.pid);
    const {
        isActive: isActive,
        current_mode: current_mode,
        test_public_key,
        test_private_key,
        test_encryption_key,
        live_public_key,
        live_private_key,
        live_encryption_key,
        error,
        isLoading,
        mutateList
    } = useItexpaySettings();

    useEffect(() => {
        // WebSocket connection setup
        const socket = new WebSocket('ws://localhost:8080'); // Replace with your server's address

        // Event listener for when the WebSocket connection is established
        socket.addEventListener('open', () => {
            console.log('WebSocket connection established');

        });

        // Event listener for receiving messages from the server
        socket.addEventListener('message', (event) => {

            // const receivedMessage = event.data;

            const essage = JSON.parse(event.data);
            console.log(essage);
            // const essage = event.data;
            const {checkoutId, orderAttempts} = essage;

            const rMessage = {checkoutId};
            // const order_Attempts = { orderAttempts };

            // setReceivedMessages((prevMessages) => [...prevMessages, receivedMessage]);
            setRMessage(rMessage);
            setOrderAttempts({orderAttempts});


            console.log(`Received: ${event.data}`);
        });

        // Event listener for when the WebSocket connection is closed
        socket.addEventListener('close', () => {
            console.log('WebSocket connection closed');
        });

        // Clean up the WebSocket connection when the component unmounts
        // return () => {
        //     socket.close();
        // };
    }, []);


    useEffect(() => {
        // Simulating an asynchronous operation (e.g., fetching data)
        const getCheckout = async () => {
            if (rMessage) {
                const checkoutId = rMessage.checkoutId;
                try {
                    const response = await fetch(`/api/checkouts/${checkoutId}?context=${encodedContext}`, {
                        method: 'GET',
                    });

                    const datass = await response.json();
                    // const { email } = datass.data.cart;

                    const {id, cart, billing_address, grand_total} = datass.data;
                    const {currency} = cart;
                    const {first_name, last_name, email, phone} = billing_address;

                    const chec = {id, first_name, last_name, email, phone, grand_total};

                    setMyResponse(chec);

                    setRMessage(null);

                } catch (error) {
                    const {message} = error;
                    setMyResponse({message});
                    setRMessage(null);

                    console.error('Error fetching data:', error);
                }
            }
        };
        // Call the fetchData function
        getCheckout();
    }, [rMessage]); // Empty dependency array to run the effect once


    useEffect(() => {
        // Simulating an asynchronous operation (e.g., fetching data)
        const socket = new WebSocket('ws://localhost:8080');

        const getAuthorizationurl = async () => {
            if (myResponse) {
                try {
                    const response = await fetch('/api/getAuthorizationurl', {
                        method: 'POST',
                        // headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(myResponse),

                    });

                    const datass = await response.json();
                    const {authorization_url} = datass;

                    setMyUrl({authorization_url});

                    setMyResponse(null);

                    socket.send(
                        `{"orderAttempts": "${orderAttempts.orderAttempts}", "authorization_url": "${authorization_url}"}`
                    );

                } catch (error) {
                    const {message} = error;
                    setMyUrl({message});
                    setMyResponse(null);

                    console.error('Error fetching data:', error);
                }
            }
        };

        // Call the fetchData function
        getAuthorizationurl();
    }, [myResponse]); // Empty dependency array to run the effect once


    return {
        messagess: yess.data,
        first_name: myResponse?.first_name,
        last_name: myResponse?.last_name,
        email: myResponse?.email,
        phone_number: myResponse?.phone,
        amount: myResponse?.grand_total,
        authurl: myUrl?.authorization_url,
    }
}

export default wsc;


