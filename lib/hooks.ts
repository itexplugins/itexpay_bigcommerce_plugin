import useSWR from 'swr';
import { useSession } from '../context/session';
import { ErrorProps, ListItem, Order, QueryParams, ShippingAndProductsInfo } from '../types';
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

async function fetcher(url: string, query: string) {
    const res = await fetch(`${url}?${query}`);

    // If the status code is not in the range 200-299, throw an error
    if (!res.ok) {
        const { message } = await res.json();
        const error: ErrorProps = new Error(message || 'An error occurred while fetching the data.');
        error.status = res.status; // e.g. 500
        throw error;
    }

    return res.json();
}

// Reusable SWR hooks
// https://swr.vercel.app/
export function useProducts() {
    const { context } = useSession();
    const params = new URLSearchParams({ context }).toString();
    // Request is deduped and cached; Can be shared across components
    const { data, error } = useSWR(context ? ['/api/products', params] : null, fetcher);
    // const { error } = useSWR(context ? ['/api/products', params] : null, fetcher);
    //
    // const data = {
    //     inventory_count: 5,
    //     variant_count: 'var',
    //     primary_category_name: 'cat',
    //
    // }

    return {
        summary: data,
        isLoading: !data && !error,
        error,
    };
}

export function useProductList(query?: QueryParams) {
    const { context } = useSession();
    const params = new URLSearchParams({ ...query, context }).toString();

    // Use an array to send multiple arguments to fetcher
    const { data, error, mutate: mutateList } = useSWR(context ? ['/api/products/list', params] : null, fetcher);

    return {
        list: data?.data,
        meta: data?.meta,
        isLoading: !data && !error,
        error,
        mutateList,
    };
}

export function useTest() {
    // const { context } = useSession();
    // const params = new URLSearchParams({ ...query, context }).toString();
    // const { data, error, mutate: mutateList } = useSWR(context ? ['/api/sample', params] : null, fetcher);

    return {
        data: "useme",
        isActive: "isActive",
        current_mode: "current_mode",
    }
}

export function useItexpaySettings(query?: QueryParams) {
    const { context } = useSession();
    const params = new URLSearchParams({ ...query, context }).toString();

    // Use an array to send multiple arguments to fetcher
    const { data, error, mutate: mutateList } = useSWR(context ? ['/api/sample', params] : null, fetcher);

    return {
        data,
        isActive: data?.isActive,
        current_mode: data?.current_mode,
        test_public_key: data?.test_public_key,
        test_private_key: data?.test_private_key,
        test_encryption_key: data?.test_encryption_key,
        live_public_key: data?.live_public_key,
        live_private_key: data?.live_private_key,
        live_encryption_key: data?.live_encryption_key,
        meta: data?.meta,
        isLoading: !data && !error,
        error,
        mutateList,
    };
}

// export function useItexpaySettings(pid: number, list?:ListItem[]) {
//     const { context } = useSession();
//     const params = new URLSearchParams({ context }).toString();
//
//     let product: ListItem;
//
//     if (list?.length) {
//         product = list.find(item => item.id === pid);
//     }
//
//     // Conditionally fetch product if it doesn't exist in the list (e.g. deep linking)
//     const { data, error } = useSWR(!product && context ? ['/api/sample', params] : null, fetcher);
//
//     return {
//         product: product ?? data,
//         isLoading: product ? false : (!data && !error),
//         error,
//     };
// }

export function useProductInfo(pid: number, list?:ListItem[]) {
    const { context } = useSession();
    const params = new URLSearchParams({ context }).toString();

    let product: ListItem;

    if (list?.length) {
       product = list.find(item => item.id === pid);
    }

    // Conditionally fetch product if it doesn't exist in the list (e.g. deep linking)
    const { data, error } = useSWR(!product && context ? [`/api/products/${pid}`, params] : null, fetcher);

    return {
        product: product ?? data,
        isLoading: product ? false : (!data && !error),
        error,
    };
}

export const useOrder = (orderId: number) => {
    const { context } = useSession();
    const params = new URLSearchParams({ context }).toString();
    const shouldFetch = context && orderId !== undefined;

    // Conditionally fetch orderId is defined
    const { data, error } = useSWR<Order, ErrorProps>(shouldFetch ? [`/api/orders/${orderId}`, params] : null, fetcher);

    return {
        order: data,
        isLoading: !data && !error,
        error,
    };
}

export const useShippingAndProductsInfo = (orderId: number) => {
    const { context } = useSession();
    const params = new URLSearchParams({ context }).toString();
    const shouldFetch = context && orderId !== undefined;

    // Shipping addresses and products are not included in the order data and need to be fetched separately
    const { data, error } = useSWR<ShippingAndProductsInfo, ErrorProps>(
        shouldFetch ? [`/api/orders/${orderId}/shipping_products`, params] : null, fetcher
    );

    return {
        order: data,
        isLoading: !data && !error,
        error,
    };
}

// export const useWebSocketClientCap = () => {
//
//     const [rMessage, setRMessage] = useState(null ); // State to store received messages
//     const [orderAttempts, setOrderAttempts] = useState(null ); // State to store received messages
//     // const [datass, setData] = useState(null);
//     const [myResponse, setMyResponse] = useState(null ); // Initialize with null or an initial value
//     const [myUrl, setMyUrl] = useState(null ); // Initialize with null or an initial value
//
//     const { data } = useTest();
//     //
//     const yess = {data};
//
//     const router = useRouter();
//     const encodedContext = useSession()?.context;
//
//     const {  current_mode: current_mode, test_public_key, live_public_key, error, isLoading, mutateList } = useItexpaySettings();
//
//     useEffect(() => {
//         // WebSocket connection setup
//         // const socket = new WebSocket('ws://localhost:3000/api/sample'); // Replace with your server's address
//         const socket = new WebSocket('ws://localhost:8080'); // Replace with your server's address
//
//         // Event listener for when the WebSocket connection is established
//         socket.addEventListener('open', () => {
//             console.log('WebSocket connection established');
//
//         });
//
//         // Event listener for receiving messages from the server
//         socket.addEventListener('message', (event) => {
//
//             const receivedMessage = event.data;
//
//             const essage = JSON.parse(event.data);
//             // const essage = event.data;
//             const { checkoutId, orderAttempts, paymentid, linkingreference, code } = essage;
//
//             const rMessage = { checkoutId, orderAttempts, paymentid, linkingreference, code };
//             // const order_Attempts = { orderAttempts };
//
//             // setReceivedMessages((prevMessages) => [...prevMessages, receivedMessage]);
//             setRMessage(rMessage);
//             // setOrderAttempts({ orderAttempts });
//
//
//             socket.send(
//                 // rMessage.checkoutId
//
//                 `{"orderAttempts": "${orderAttempts.orderAttempts}", "authorization_url": "authURl"}`
//
//             // 'Prcocessing Checkout'
//             );
//             console.log(`Receivednow: ${event.data}`);
//         });
//
//         // Event listener for when the WebSocket connection is closed
//         socket.addEventListener('close', () => {
//             console.log('WebSocket connection closed');
//         });
//
//         // Clean up the WebSocket connection when the component unmounts
//         return () => {
//             socket.close();
//         };
//     }, []);
//
//     // const checkoutId = '2f473a22-b55d-4678-a863-ffa8da77fbfe';
//
//
//     useEffect(() => {
//         // Simulating an asynchronous operation (e.g., fetching data)
//
//         const getCheckout = async () => {
//
//             if ( rMessage ) {
//                 const checkoutId =  rMessage.checkoutId ;
//                 const id =  checkoutId ;
//
//
//                 const publickey =  'ITXPUB_STAGING_4MLOLINTPIZL9D1SBIUGOR5JM3CEJ0REBZGJBNBO-7623000009-L0GST0KPJXTH0UV';
//                 const paymentids =  'TEST_IBK_688639041696720151798';
//                 try {
//                     const response = await fetch(`/api/${id}/capture?publickey=${publickey}&paymentid=${paymentids}`, {
//                         method: 'GET',
//                     });
//
//                     const data = await response.json();
//
//                     const { transaction, code  } = data;
//                     const { linkingreference, paymentid } = transaction;
//                     const chec = { code, linkingreference, paymentid };
//                     console.log(chec);
//
//
//                     // if( 1==1 ) {
//                     if(code == "00" && linkingreference == rMessage.linkingreference && paymentid == rMessage.paymentid ) {
//                         try {
//                             // 690ef76b-954f-4206-be4d-39b6fb863508
//                             const response = await fetch(`/api/checkouts/${checkoutId}/createOrder?context=${encodedContext}`, {
//                                 method: 'POST',
//                             });
//
//                             const data = await response.json();
//                             console.log(data);
//                             const { id } = data.data;
//                             const order_id = { id };
//                             const orderId = order_id.id;
//                             // const id = 133;
//                             // const orderId = 133;
//                             console.log(`Order Created: ${orderId}`);
//
//                             if( orderId && typeof (orderId) === 'number'){
//                                 console.log("Order Created now now")
//                                 try {
//
//                                     const response = await fetch(`/api/orders/${orderId}/updateOrderStatus?context=${encodedContext}`, {
//                                         // const response = await fetch(`/api/checkouts/${checkoutId}?context=${encodedContext}`, {
//                                         method: 'PUT',
//                                         // body: JSON.stringify(paid_status),
//                                         body: '{"status_id":11}',
//                                         headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//                                         // body: JSON.stringify(apiFormattedData),
//                                         // body: JSON.stringify(apiFormattedData),
//                                     });
//
//                                     const data = await response.json();
//                                     console.log("Order Updated now:", data)
//
//
//                                 } catch (error){
//                                     const {message} = error;
//                                     setMyResponse({message});
//                                     console.error('Error Updating Order Status:', error);
//                                 }
//                             }
//
//                         } catch (error) {
//                             const {message} = error;
//                             setMyResponse({message});
//                             console.error('Error Creating Order:', error);
//
//                         }
//
//                     }
//
//                     setMyResponse(chec);
//
//                     setRMessage(null);
//                     // const response = await fetch('https://example.com/api/data');
//                     // const jsonData = await response.json();
//                     // setData(jsonData); // Update the state with the resolved data
//                 } catch (error) {
//                     const {message} = error;
//                     setMyResponse({message});
//                     setRMessage(null);
//
//                     console.error('Error Verifying ItexPayment:', error);
//                 }
//             }
//
//         };
//         // Call the fetchData function
//         getCheckout();
//     }, [rMessage]); // Empty dependency array to run the effect once
//
//
//     return {
//         messagess:  yess.data ,
//         first_name: myResponse?.code,
//         last_name: myResponse?.paymentid,
//         email: myResponse?.linkingreference,
//         phone_number: myResponse?.phone,
//         amount: myResponse?.grand_total,
//         authurl: myUrl?.authorization_url,
//     }
// }


export const useWebSocketClientAuth = () => {

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

            const receivedMessage = event.data;

            const essage = JSON.parse(event.data);
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
