import { NextApiRequest, NextApiResponse } from 'next';
import { bigcommerceClient, getSession } from '../../../../lib/auth';

export default async function orderId(req: NextApiRequest, res: NextApiResponse) {
    POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/orders
        X-Auth-Token: {{ACCESS_TOKEN}}
    Content-Type: application/json
    Accept: application/json

    {
        "billing_address": {
        "first_name": "Jane",
            "last_name": "Doe",
            "street_1": "123 Main Street",
            "city": "Austin",
            "state": "Texas",
            "zip": "78751",
            "country": "United States",
            "country_iso2": "US",
            "email": "janedoe@email.com"
    },
        "products": [
        {
            "name": "BigCommerce Coffee Mug",
            "quantity": 1,
            "price_inc_tax": 50,
            "price_ex_tax": 45
        }
    ]
    }
}
