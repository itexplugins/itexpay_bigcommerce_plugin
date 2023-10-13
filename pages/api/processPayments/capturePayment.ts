import { NextApiRequest, NextApiResponse } from 'next';
import {bigcommerceClient, getSession, setItexpayApiKeys} from '../../lib/auth';
// import {SessionProps} from "@types";

export default async function capturePayment(req: NextApiRequest, res: NextApiResponse) {
    try {
        //https://staging.itexpay.com/api/v1/transaction/charge/status?publickey='.$publickey.'&paymentid='.$paymentid.
        const response = await fetch('https://staging.itexpay.com/api/v1/transaction/charge/status?publickey=ITXPUB_STAGING_4MLOLINTPIZL9D1SBIUGOR5JM3CEJ0REBZGJBNBO-7623000009-L0GST0KPJXTH0UV&paymentid=TEST_IBK_813600921695098386211');
        const data = await response.json();

        // Respond with the sample data as JSON
        res.status(200).json(data);

    } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json({ message });
    }

}
