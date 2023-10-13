import { NextApiRequest, NextApiResponse } from 'next';
import { bigcommerceClient, getSession } from '@lib/auth';

export default async function updateOrderStatus(req: NextApiRequest, res: NextApiResponse) {
    const {
        body,
        query: { orderId },
        method,
    } = req;

    try {
        const { accessToken, storeHash } = await getSession(req);
        const bigcommerce = bigcommerceClient(accessToken, storeHash, 'v2');

        switch (method) {
            case 'PUT': {
                const data = await bigcommerce.put(`/orders/${orderId}`, body);

                res.status(200).json(data);

                break;
            }

            default: {
                res.setHeader('Allow', ['GET', 'PUT']);
                res.status(405).end(`Method ${method} Not Allowed`);
            }
        }

    } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json({ message });
    }
}
