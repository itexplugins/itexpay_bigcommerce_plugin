import { NextApiRequest, NextApiResponse } from 'next';
import {bigcommerceClient, getSession, setItexpayApiKeys} from '../../lib/auth';
// import {SessionProps} from "@types";

export default async function getAuthorizationUrl(req: NextApiRequest, res: NextApiResponse) {
    try {

        //https://api.bigcommerce.com/stores/{store_hash}/v3/checkouts/{checkoutId}

        // const options = {
        //     method: 'GET',
        //     headers: {'Content-Type': 'application/json'}
        // };
        //
        // const response = await fetch('https://store-kqw14s7hk2.mybigcommerce.com/api/storefront/carts', options)
        // const data = await response.json();

        const fetch = require('node-fetch');

        let url = 'https://api.bigcommerce.com/stores/kqw14s7hk2/v3/checkouts/f8240f1f-b85b-479c-8b9d-5645c124ea6f';
        // let url = 'https://api.bigcommerce.com/stores/kqw14s7hk2/v3/checkouts/[checkoutId]';

        let options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': 'gdk5cbgxsevvah9669ib22s25x90dc0'
            }
        };

        const response = await fetch(url, options);
            // .then(res => res.json())
            // .then(json => console.log(json))
            // .catch(err => console.error('error:' + err));
        const data = await response.json();
        const datadata = data.data;

        // const options = {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: '{"lineItems":[{"quantity":2,"productId":230,"optionSelections":[{"optionId":10,"optionValue":"Some Text Value"}]}],"locale":"en"}'
        // };  create thankyou page after order create_order paymen
        //
        // const response = await fetch('https://my-bigc.mybigcommerce.com/api/storefront/carts', options)
        // const data = await response.json();


        const itexkeys = req.body;
        // await setItexpayApiKeys(session, itexkeys)

        // res.redirect(302, `/?context=${encodedContext}`);
        const sampleData = {
            message: 'Hello, BigCommerce storefront!',
            timestamp: new Date(),
            itexkeys,
        };

        // Respond with the sample data as JSON
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

