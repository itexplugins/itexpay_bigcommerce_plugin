import { NextApiRequest, NextApiResponse } from 'next';
const fetch = require('node-fetch');

export default async function orderNow(req: NextApiRequest, res: NextApiResponse) {

    const {
        query: { paymentid, publickey, id, linkingreference, code, message },
        method,
    } = req;

    try {

        const fetch = require('node-fetch');

        if(!paymentid) {
            res.redirect(`https://my-bigc.mybigcommerce.com/checkout`)
        };

        const response0 = await fetch(`https://staging.itexpay.com/api/v1/transaction/charge/status?publickey=${publickey}&paymentid=${paymentid}`);
        const data0 = await response0.json();

        if (data0.code == "00") {
            


            const url = `https://api.bigcommerce.com/stores/kqw14s7hk2/v3/checkouts/${id}/orders`;

            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'gdk5cbgxsevvah9669ib22s25x90dc0'
                }
            };

            const response = await fetch(url, options);

            const data = await response.json();
            const orderId = data.data.id;


            // update order status
            const url2 = `https://api.bigcommerce.com/stores/kqw14s7hk2/v2/orders/${orderId}`;
            const options2 = {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'gdk5cbgxsevvah9669ib22s25x90dc0'
                },
                body: '{"status_id":11}',
            };

            const response2 = await fetch(url2, options2);
            const data2 = await response2.json();


            res.redirect(`https://my-bigc.mybigcommerce.com/checkout/order-confirmation/${orderId}`);

        } else {
            res.redirect(`https://my-bigc.mybigcommerce.com/checkout`)
        }

    } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json({ message });
    }

}
