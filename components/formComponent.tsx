// import {useState} from 'react';
import {Box, Button, Form, FormGroup, Input} from "@bigcommerce/big-design";

export default function  FormComponent()  {


    // const  [inputValue, setInputValue] =  useState('');
    // const  handleChange = (event) => {
    //     setInputValue(event.target.value);
    // };

    return  (
        // <form>
        //     <label>Input Value:
        //         <input  type="text"  value={inputValue} onChange={handleChange} />
        //     </label>
        //     <p>Input Value: {inputValue}</p>
        // </form>
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
