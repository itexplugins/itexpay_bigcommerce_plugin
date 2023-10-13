import { NextApiRequest, NextApiResponse } from 'next';
import { getItexpayApiKeys, getSession, setItexpayApiKeys} from '../../lib/auth';
// import {SessionProps} from "@types";

export default async function sample(req: NextApiRequest, res: NextApiResponse) {
    const {
        body,
        // query: { pid },
        method,
    } = req;

    switch (method) {
        case 'GET':
            try {
                const session = await getSession(req);

                const itexpay_api_keys = await getItexpayApiKeys( session );

                // res.redirect(302, `/?context=${encodedContext}`);
                // const sampleData = {
                //     message: 'Hello, BigCommerce storefront!',
                //     timestamp: new Date(),
                //     // itexkeys,
                // };

                // Respond with the sample data as JSON
                res.status(200).json(itexpay_api_keys);
            } catch (error) {
                const { message, response } = error;
                res.status(response?.status || 500).json({ message });
            }
            break;

        case 'PUT':
            try {
                const session = await getSession(req);

                const isset = await setItexpayApiKeys( session, body //{ public_key: "frvv", private_key: "pkey", encryption_key: "enkey" }
                );

                // Respond with the sample data as JSON
                res.status(200).json(isset);
            } catch (error) {
                const { message, response } = error;
                res.status(response?.status || 500).json({ message });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }

    // try {
    //     const session = await getSession(req);
    //
    //     // Authenticate the app on install
    //     // const session = await getBCAuth(req.query);
    //     // const encodedContext = encodePayload(session); // Signed JWT to validate/ prevent tampering
    //     // await setSession(session);
    //     // const pk = JSON.stringify(body);
    //     // const itexkeys = body;
    //     // const itexkeys = req.body;
    //
    //     setItexpayApiKeys( session, body );
    //
    //     // res.redirect(302, `/?context=${encodedContext}`);
    //     const sampleData = {
    //         message: 'Hello, BigCommerce storefront!',
    //         timestamp: new Date(),
    //         // itexkeys,
    //     };
    //
    //     // Respond with the sample data as JSON
    //     res.status(200).json(sampleData);
    //
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

