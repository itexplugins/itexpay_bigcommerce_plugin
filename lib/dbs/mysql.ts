import * as mysql from 'mysql';
import { promisify } from 'util';
import {ItexpayProps, ItexpayTransactionsProps, SessionContextProps, SessionProps, StoreData} from '../../types';

const MYSQL_CONFIG = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    ...(process.env.MYSQL_PORT && { port: process.env.MYSQL_PORT }),
};

// For use with Heroku ClearDB
// Other mysql: https://www.npmjs.com/package/mysql#pooling-connections
const pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL ? process.env.CLEARDB_DATABASE_URL : MYSQL_CONFIG);
const query = promisify(pool.query.bind(pool));

// Use setUser for storing global user data (persists between installs)
export async function setUser({ user }: SessionProps) {
    if (!user) return null;

    const { email, id, username } = user;
    const userData = { email, userId: id, username };
    const itexData = { email, userId: id, username, isActive: true, current_mode: "test" };

    const results = await query('SELECT * FROM users WHERE email = ?', email);

    if (results.length > 0) return null;
    // return results.length ? results[0].accessToken : null;
    // await query('REPLACE INTO users SET ?', userData);
    await query('INSERT INTO users SET ?', userData);
    await query('INSERT INTO itexpay SET ?', itexData);
}

//xxxxxxxxxxxxxx
// Use setItexpay for storing global user data (persists between installs)
export async function setItexpay({ user }: SessionContextProps, itexkeys: ItexpayProps) {
    if (!user) return null;

    // const { public_key, private_key, encryption_key } = itexkeys;

    const { email, id, username } = user;

    // const userData = { email, userId: id, username, public_key, private_key, encryption_key };

    // await query('UPDATE itexpay SET username="meee" WHERE userId = ? AND email = ?', User);
    // await query('UPDATE storeUsers SET isAdmin=1 WHERE userId = ? AND storeHash = ?', values);
    // await query('UPDATE itexpay SET username=?, public_key=? WHERE email = "toosoft36@gmail.com"', [ "usern", "myname"],);
    await query('UPDATE itexpay SET ? WHERE userId = ? AND email = ?', [ itexkeys, id, email ]);
    // await query('INSERT INTO storeUsers , SET ?', { isAdmin: owner.id === userId, storeHashuserId });

}

export async function getItexpay({ user }: SessionContextProps) {
    if (!user) return null;

    const { email } = user;
    const results = await query('SELECT * FROM itexpay WHERE email = ?', email);

    return results.length ?
        results[0]
       // { public_key: results[0].public_key, private_key: results[0].private_key, encryption_key: results[0].encryption_key }
        : null;

}

export async function setItexpayTransaction({ user }: SessionContextProps, itexkeys: ItexpayTransactionsProps) {
    if (!user) return null;

    const { email, id, username } = user;

    const itexpayTrans = { email, userId: id, description, status, amount, date, transactionRef };
    await query('INSERT INTO itexpayTransactions SET ?', itexpayTrans);

}

export async function getItexpayTransactions({ user }: SessionContextProps) {
    if (!user) return null;

    const { email, id, username } = user;

    const values = [id, email];
    const results = await query('SELECT * FROM itexpayTransactions WHERE userId = ? AND email = ? LIMIT 1', values);

    return results.length ? results[0] : null;

}

export async function setStore(session: SessionProps) {
    const { access_token: accessToken, context, scope } = session;
    // Only set on app install or update
    if (!accessToken || !scope) return null;

    const storeHash = context?.split('/')[1] || '';
    const storeData: StoreData = { accessToken, scope, storeHash };

    await query('REPLACE INTO stores SET ?', storeData);
}

// Use setStoreUser for storing store specific variables
export async function setStoreUser(session: SessionProps) {
    const { access_token: accessToken, context, owner, sub, user: { id: userId } } = session;
    if (!userId) return null;

    const contextString = context ?? sub;
    const storeHash = contextString?.split('/')[1] || '';
    const sql = 'SELECT * FROM storeUsers WHERE userId = ? AND storeHash = ?';
    const values = [String(userId), storeHash];
    const storeUser = await query(sql, values);

    // Set admin (store owner) if installing/ updating the app
    // https://developer.bigcommerce.com/api-docs/apps/guide/users
    if (accessToken) {
        // Create a new admin user if none exists
        if (!storeUser.length) {
            await query('INSERT INTO storeUsers SET ?', { isAdmin: true, storeHash, userId });
        } else if (!storeUser[0]?.isAdmin) {
            await query('UPDATE storeUsers SET isAdmin=1 WHERE userId = ? AND storeHash = ?', values);
        }
    } else {
        // Create a new user if it doesn't exist (non-store owners added here for multi-user apps)
        if (!storeUser.length) {
            await query('INSERT INTO storeUsers SET ?', { isAdmin: owner.id === userId, storeHash, userId });
        }
    }
}


// // Use setItexpay for storing itex specific variables
// export async function setItexpaySettings(session: SessionProps) {
//     const { access_token: accessToken, context, owner, sub, user: { id: userId } } = session;
//     if (!userId) return null;
//
//     const contextString = context ?? sub;
//     const storeHash = contextString?.split('/')[1] || '';
//     const sql = 'SELECT * FROM storeUsers WHERE userId = ? AND storeHash = ?';
//     const values = [String(userId), storeHash];
//     const storeUser = await query(sql, values);
//
//     // Set admin (store owner) if installing/ updating the app
//     // https://developer.bigcommerce.com/api-docs/apps/guide/users
//     if (accessToken) {
//         // Create a new admin user if none exists
//         if (!storeUser.length) {
//             await query('INSERT INTO storeUsers SET ?', { isAdmin: true, storeHash, userId });
//         } else if (!storeUser[0]?.isAdmin) {
//             await query('UPDATE storeUsers SET isAdmin=1 WHERE userId = ? AND storeHash = ?', values);
//         }
//     } else {
//         // Create a new user if it doesn't exist (non-store owners added here for multi-user apps)
//         if (!storeUser.length) {
//             await query('INSERT INTO storeUsers SET ?', { isAdmin: owner.id === userId, storeHash, userId });
//         }
//     }
// }

export async function deleteUser({ context, user, sub }: SessionProps) {
    const contextString = context ?? sub;
    const storeHash = contextString?.split('/')[1] || '';
    const values = [String(user?.id), storeHash];
    await query('DELETE FROM storeUsers WHERE userId = ? AND storeHash = ?', values);
}

export async function hasStoreUser(storeHash: string, userId: string) {
    if (!storeHash || !userId) return false;

    const values = [userId, storeHash];
    const results = await query('SELECT * FROM storeUsers WHERE userId = ? AND storeHash = ? LIMIT 1', values);

    return results.length > 0;
}

export async function getStoreToken(storeHash: string) {
    if (!storeHash) return null;

    const results = await query('SELECT accessToken FROM stores WHERE storeHash = ?', storeHash);

    return results.length ? results[0].accessToken : null;
}

export async function deleteStore({ store_hash: storeHash }: SessionProps) {
    await query('DELETE FROM stores WHERE storeHash = ?', storeHash);
}
