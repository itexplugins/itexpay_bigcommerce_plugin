import { NextApiRequest, NextApiResponse } from 'next';
import { bigcommerceClient, getSession } from '../../../lib/auth';

export default async function checkoutId(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { checkoutId },
        method,
    } = req;

    try {
        const { accessToken, storeHash } = await getSession(req);
        const bigcommerce = bigcommerceClient(accessToken, storeHash, 'v3');

        switch (method) {
            case 'GET': {
                // const data = await bigcommerce.get(`/checkouts/2f473a22-b55d-4678-a863-ffa8da77fbfe`);
                const data = await bigcommerce.get(`/checkouts/${checkoutId}`);

                res.status(200).json(data);

                break;
            }

            default: {
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${method} Not Allowed`);
            }
        }

    } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json({ message });
    }

    // try {
    //     const fetch = require('node-fetch');
    //
    //     let url = 'https://api.bigcommerce.com/stores/kqw14s7hk2/v3/checkouts/690ef76b-954f-4206-be4d-39b6fb863508';
    //
    //     let options = {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             'X-Auth-Token': 'gdk5cbgxsevvah9669ib22s25x90dc0'
    //         }
    //     };
    //
    //     const response = await fetch(url, options);
    //     const data = await response.json();
    //
    //
    //     const itexkeys = req.body;
    //     // await setItexpayApiKeys(session, itexkeys)
    //
    //     // res.redirect(302, `/?context=${encodedContext}`);
    //     const sampleData = {
    //         message: 'Hello, BigCommerce storefront!',
    //         timestamp: new Date(),
    //         itexkeys,
    //     };
    //
    //     // Respond with the sample data as JSON
    //     res.status(200).json(data);
    //
    // } catch (error) {
    //     const { message, response } = error;
    //     res.status(response?.status || 500).json({ message });
    // }


}
