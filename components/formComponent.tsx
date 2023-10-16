// import {useState} from 'react';
import {Box, Button, Form, FormGroup, Input} from "@bigcommerce/big-design";

export default function  FormComponent()  {


    return  (

        <Form>
            <FormGroup>
                <Box marginTop="xxLarge" marginLeft="xxLarge">
                <Input
                    // description="Please provide your Api Keys."
                    label="Test Public Key"
                    placeholder="Test Public Key"
                    required
                    type="text"
                />
                </Box>
            </FormGroup>
            <FormGroup>
                <Box marginTop="large" marginLeft="xxLarge">
                <Input
                    label="Test Private Key"
                    placeholder="Test Private Key"
                    required
                    type="text" />
                </Box>
            </FormGroup>
            <FormGroup>
                <Box marginTop="large" marginLeft="xxLarge">
                <Input
                    label="Live Public Key"
                    placeholder="Test Private Key"
                    required
                    type="text" />
                </Box>
            </FormGroup>
            <FormGroup>
                <Box marginTop="large" marginLeft="xxLarge">
                <Input
                    label="Live Private Key"
                    placeholder="Test Private Key"
                    required
                    type="text" />
                </Box>
            </FormGroup>
            <Box marginTop="xxLarge" marginLeft="xxLarge">
                <Button type="submit">Save</Button>
            </Box>
        </Form>
    )}
