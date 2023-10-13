import { NextApiRequest, NextApiResponse } from 'next';
import {bigcommerceClient, getSession, setItexpayApiKeys} from '../../lib/auth';
// import {SessionProps} from "@types";
const fetch = require('node-fetch');

export default async function capture(req: NextApiRequest, res: NextApiResponse) {

    const {
        body,
        query: { paymentid, publickey, checkoutId, linkingreference, code, message },
        method,
    } = req;

    if ( publickey ) {
        try {

            // publickey =  'ITXPUB_STAGING_4MLOLINTPIZL9D1SBIUGOR5JM3CEJ0REBZGJBNBO-7623000009-L0GST0KPJXTH0UV';
            // http://localhost:3000/api/capture?paymentid=TEST_IBK_688639041696720151798&linkingreference=ITX714622171696720159914&code=00&message=approved
            // const response = await fetch(`https://staging.itexpay.com/api/v1/transaction/charge/status?publickey=ITXPUB_STAGING_4MLOLINTPIZL9D1SBIUGOR5JM3CEJ0REBZGJBNBO-7623000009-L0GST0KPJXTH0UV&paymentid=${paymentid}`);
            // const response = await fetch('https://staging.itexpay.com/api/v1/transaction/charge/status?publickey=ITXPUB_STAGING_4MLOLINTPIZL9D1SBIUGOR5JM3CEJ0REBZGJBNBO-7623000009-L0GST0KPJXTH0UV&paymentid=TEST_IBK_813600921695098386211');

            const response = await fetch(`https://staging.itexpay.com/api/v1/transaction/charge/status?publickey=${publickey}&paymentid=${paymentid}`);
            const data = await response.json();

            const sampleData = {
                message: 'Hello, BigCommerce storefront!',
                timestamp: new Date(),
            };

            // Respond with the sample data as JSON
            res.status(200).json(data);

        } catch (error) {
            const { message, response } = error;
            res.status(response?.status || 500).json({ message });
        }
    }

    else {
        try {
            let url = 'http://localhost:8080/send';

            let reference = "2f473a22-b55d-4678-a863-ffa8da77fbfe" + '_' + Math.ceil(Math.random() * 10 ** 8);
            // const checkoutId = "0e4c396b-9df0-423c-8b13-adebbbdc49ea";

            let options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'gdk5cbgxsevvah9669ib22s25x90dc0'
                },
                body: `{"orderAttempts": "${reference}", "checkoutId": "${checkoutId}", "linkingreference": "${linkingreference}", "code": "${code}"}`,
                // body: `{"paymentid": "${paymentid}", "orderAttempts": "${reference}", "checkoutId": "${checkoutId}", "linkingreference": "${linkingreference}", "code": "${code}"}`,
                // body: '{"name":"Bootstrap","description":"Build responsive websites","src":"https://toosoft.com.ng/myscript.js","auto_uninstall":true,"load_method":"default","location":"head","visibility":"all_pages","kind":"src","consent_category":"essential"}'
            };

            const data = await fetch(url, options)
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(err => console.error('error:' + err));

            // Respond with the sample data as JSON
            res.status(200).json(data);

        } catch (error) {
            const { message, response } = error;
            res.status(response?.status || 500).json({ message });
        }

        // localhost:3000/api/fc088d85-4f29-40d4-8f60-d12673bcd480/capture?paymentid=TEST_IBK_782576601696918851987&linkingreference=ITX058084211696918860755&code=00&message=approved

        // } catch (error) {
        //     const { message, response } = error;
        //     res.status(response?.status || 500).json({ message });
        // }

    }

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

