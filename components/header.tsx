import {Box, Flex, FlexItem, Tabs} from '@bigcommerce/big-design';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InnerHeader from './innerHeader';

export const TabIds = {
    HOME: 'home',
    PRODUCTS: 'products',
    SETTINGS: 'settings',
    HOMES: 'homes',
    TRANSACTIONS: 'transactions',
    pSETTINGS: 'psettings',
    WEBS: 'webs',
};

export const TabRoutes = {
    [TabIds.HOME]: '/settings',
    [TabIds.PRODUCTS]: '/products',
    [TabIds.SETTINGS]: '/products/settings',
    [TabIds.HOMES]: '/homes',
    [TabIds.TRANSACTIONS]: '/transactions',
    [TabIds.pSETTINGS]: '/settings',
    [TabIds.WEBS]: '/webs',
};

const HeaderlessRoutes = [
    '/orders/[orderId]',
    '/orders/[orderId]/labels',
    '/orders/[orderId]/modal',
    '/productAppExtension/[productId]',
];

const InnerRoutes = [
    '/products/[pid]',
];

const HeaderTypes = {
    GLOBAL: 'global',
    INNER: 'inner',
    HEADERLESS: 'headerless',
};

const Header = () => {
    const [activeTab, setActiveTab] = useState<string>('');
    const [headerType, setHeaderType] = useState<string>(HeaderTypes.GLOBAL);
    const router = useRouter();
    const { pathname } = router;

    useEffect(() => {
        if (InnerRoutes.includes(pathname)) {
            // Use InnerHeader if route matches inner routes
            setHeaderType(HeaderTypes.INNER);
        } else if (HeaderlessRoutes.includes(pathname)) {
            setHeaderType(HeaderTypes.HEADERLESS);
        } else {
            // Check if new route matches TabRoutes
            const tabKey = Object.keys(TabRoutes).find(key => TabRoutes[key] === pathname);

            // Set the active tab to tabKey or set no active tab if route doesn't match (404)
            setActiveTab(tabKey ?? '');
            setHeaderType(HeaderTypes.GLOBAL);
        }

    }, [pathname]);

    useEffect(() => {
        // Prefetch products page to reduce latency (doesn't prefetch in dev)
        router.prefetch('/products');
    });

    const items = [
        { ariaControls: 'home', id: TabIds.HOME, title: 'Set Up' },
        // { ariaControls: 'products', id: TabIds.PRODUCTS, title: 'Products' },
        // { ariaControls: 'settings', id: TabIds.SETTINGS, title: 'Settings' },
        // { ariaControls: 'homes', id: TabIds.HOMES, title: 'Home' },
        // { ariaControls: 'psettings', id: TabIds.pSETTINGS, title: 'Settings' },
        // { ariaControls: 'transactions', id: TabIds.TRANSACTIONS, title: 'Transactions' },
        // { ariaControls: 'webs', id: TabIds.WEBS, title: 'Webs' },
    ];


    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);

        return router.push(TabRoutes[tabId]);
    };

    if (headerType === HeaderTypes.HEADERLESS) return null;
    if (headerType === HeaderTypes.INNER) return <InnerHeader />;

    return (
        <Flex>

            <FlexItem marginRight="xxxLarge">
                <img src="https://itexpay.com/static/media/itex-logo.1baf8606981157aaed0e7d7fc246e321.svg" alt="Image Description" />
                {/*<Box   backgroundColor="secondary20">ItexPay</Box>*/}
            </FlexItem>

            <FlexItem>
                <Box marginBottom="xxLarge">
                    <Tabs
                        activeTab={activeTab}
                        items={items}
                        onTabClick={handleTabClick}
                    />
                </Box>
            </FlexItem>

        </Flex>

        // <Box marginBottom="xxLarge">
        //     <Tabs
        //         activeTab={activeTab}
        //         items={items}
        //         onTabClick={handleTabClick}
        //     />
        // </Box>
    );
};

export default Header;
