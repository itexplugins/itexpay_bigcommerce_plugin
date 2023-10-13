import {Flex, Form, FormGroup, Input, H3, Panel, ProgressCircle, Box, Button} from '@bigcommerce/big-design';

const Loading = () => (
    <Panel>
        <H3>Loading ItexPlugin...</H3>
        <Flex justifyContent="center" alignItems="center">
            <ProgressCircle size="large" />
        </Flex>
    </Panel>
);

export default Loading;
