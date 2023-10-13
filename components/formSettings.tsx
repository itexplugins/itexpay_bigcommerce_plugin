import {
    Box,
    Button,
    Checkbox,
    Flex,
    FlexItem,
    FormGroup,
    Input,
    InputProps,
    Link,
    Panel,
    Radio,
    Form as StyledForm, Textarea,

} from '@bigcommerce/big-design';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ItexpayProps, StringKeyValue} from '../types';

interface FormProps {
    formData: ItexpayProps;
    onCancel(): void;
    onSubmit(form: ItexpayProps): void;
}

const FormErrors = {
    name: 'Private key is required',
    price: 'Public key is required',
};

const FormSettings = ({ formData, onCancel, onSubmit }: FormProps) => {
    const { isActive, current_mode, test_public_key, test_private_key, test_encryption_key, live_public_key, live_private_key, live_encryption_key} = formData;
    const [form, setForm] = useState<ItexpayProps>({ isActive, current_mode, test_public_key, test_private_key, test_encryption_key, live_public_key, live_private_key, live_encryption_key });
    const [errors, setErrors] = useState<StringKeyValue>({});

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name: formName, value } = event.target || {};
        setForm(prevForm => ({ ...prevForm, [formName]: value }));

        // Add error if it exists in FormErrors and the input is empty, otherwise remove from errors
        !value && FormErrors[formName]
            ? setErrors(prevErrors => ({ ...prevErrors, [formName]: FormErrors[formName] }))
            : setErrors(({ [formName]: removed, ...prevErrors }) => ({ ...prevErrors }));
    };

    const handleSelectChange = (value: string) => {
        setForm(prevForm => ({ ...prevForm, type: value }));
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked, name: formName } = event.target || {};
        setForm(prevForm => ({ ...prevForm, [formName]: checked }));
    };

    const handleSubmit = (event: FormEvent<EventTarget>) => {
        event.preventDefault();

        // If there are errors, do not submit the form
        const hasErrors = Object.keys(errors).length > 0;
        if (hasErrors) return;

        onSubmit(form);
    };
    const [selected, setSelected] = useState(current_mode);

    const handleChangebut: InputProps['onChange'] = (event) => {
        setSelected(event.target.value)
    };

    // const handleChangebut = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { checked, name: formName } = event.target || {};
    //     setFormSettings(prevForm => ({ ...prevForm, [formName]: checked }));
    // };


    return (
        <StyledForm onSubmit={handleSubmit}>
            <Panel header="ItexPay Settings">
                <Panel header="Advanced Settings">
                    <FormGroup>
                        <Flex>
                            <FlexItem padding="small"
                                      alignSelf="auto"
                                      flexBasis="auto"
                                      flexGrow={0}
                                      flexOrder={0}
                                      flexShrink={1}>
                                <Checkbox
                                    name="isActive"
                                    // checked={true}//"{form.isVisible}"
                                    checked={form.isActive}
                                    onChange={handleCheckboxChange}
                                    label="Visible on storefront"
                                />
                            </FlexItem>
                        </Flex>
                    </FormGroup>
                    <FormGroup>
                        <Flex>
                            <FlexItem padding="small"
                                      alignSelf="auto"
                                      flexBasis="auto"
                                      flexGrow={0}
                                      flexOrder={0}
                                      flexShrink={1}>
                                <Radio
                                    name = "current_mode"
                                    checked={selected === 'test' //&& true//|| form.current_mode === 'test'
                                    }
                                    // checked={selected === 'test'}
                                    label="Test Mode"
                                    onChange={handleChangebut}
                                    value="test"
                                />
                            </FlexItem>
                            <FlexItem padding="small"
                                      alignSelf="auto"
                                      flexBasis="auto"
                                      flexGrow={0}
                                      flexOrder={0}
                                      flexShrink={1}>
                                <Radio
                                    name = "current_mode"
                                    checked={selected === 'live'}
                                    label="Live Mode"
                                    onChange={handleChangebut}
                                    value="live"
                                />
                            </FlexItem>
                        </Flex>
                    </FormGroup>
                </Panel>


                {/*<Loading />*/}
                {/*{ form.current_mode === "live" && <Modes/> }*/}


                { selected === "test" &&  <Panel header="Test API Keys"
                                                 description="Don't have API Keys? Visit itexpay.com"
                >
                    <FormGroup>
                        <Input
                            error={errors?.name}
                            label="Public Key"
                            name="test_public_key"
                            // required
                            // value={form.name}
                            value={form.test_public_key}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            error={errors?.name}
                            label="Private Key"
                            name="test_private_key"
                            // required
                            // value={form.name}
                            value={form.test_private_key}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            error={errors?.name}
                            label="Encryption Key"
                            name="test_encryption_key"
                            // required
                            // value={form.name}
                            value={form.test_encryption_key}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Box display="none">
                            <Input
                                name="current_mode"
                                value={form.current_mode = "test"}
                            />
                        </Box>
                    </FormGroup>
                </Panel> }

                { selected === "live" &&  <Panel header="Live API Keys"
                                                 description="Don't have API Keys? Visit itexpay.com"
                    //header={selected} //
                >
                    <FormGroup>
                        <Input
                            error={errors?.name}
                            label="Public Key"
                            name="live_public_key"
                            // required
                            // value={form.name}
                            value={form.live_public_key}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            error={errors?.name}
                            label="Live Private Key"
                            name="live_private_key"
                            // required
                            // value={form.name}
                            value={form.live_private_key}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            error={errors?.name}
                            label="Live Encryption Key"
                            name="live_encryption_key"
                            // required
                            // value={form.name}
                            value={form.live_encryption_key}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Box display="none">
                            <Input
                                   name="current_mode"
                                   value={form.current_mode = "live"}
                            />
                        </Box>
                    </FormGroup>
                </Panel> }

                <Flex justifyContent="flex-start">
                    <Button
                        marginRight="medium"
                        type="button"
                        variant="subtle"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                </Flex>
            </Panel>
        </StyledForm>
    );

    //     return (
    //     // <StyledForm>
    //
    //         <StyledForm onSubmit={handleSubmit}>
    //             <Panel header="ItexPay Settings">
    //                 <Panel header="Advanced Settings">
    //                     <FormGroup>
    //                         <Flex>
    //                             <FlexItem padding="small"
    //                                       alignSelf="auto"
    //                                       flexBasis="auto"
    //                                       flexGrow={0}
    //                                       flexOrder={0}
    //                                       flexShrink={1}>
    //                                     <Checkbox
    //                                         name="isActive"
    //                                         // checked={true}//"{form.isVisible}"
    //                                         checked={form.isActive}
    //                                         onChange={handleCheckboxChange}
    //                                         label="Visible on storefront"
    //                                     />
    //                             </FlexItem>
    //                         </Flex>
    //                     </FormGroup>
    //                     <FormGroup  //style={{ display: 'inline-block', flexDirection: 'row' }}
    //                     >
    //                         <Flex>
    //                             <FlexItem padding="small"
    //                                       alignSelf="auto"
    //                                       flexBasis="auto"
    //                                       flexGrow={0}
    //                                       flexOrder={0}
    //                                       flexShrink={1}>
    //                                     <Radio
    //                                         name = "current_mode"
    //                                         checked={selected === 'test' //&& true//|| form.current_mode === 'test'
    //                                     }
    //                                         // checked={selected === 'test'}
    //                                         label="Test Mode"
    //                                         onChange={handleChangebut}
    //                                         value="test"
    //                                     />
    //                             </FlexItem>
    //                             <FlexItem padding="small"
    //                                       alignSelf="auto"
    //                                       flexBasis="auto"
    //                                       flexGrow={0}
    //                                       flexOrder={0}
    //                                       flexShrink={1}>
    //                                     <Radio
    //                                         name = "current_mode"
    //                                         checked={selected === 'live'}
    //                                         label="Live Mode"
    //                                         onChange={handleChangebut}
    //                                         value="live"
    //                                     />
    //                             </FlexItem>
    //                         </Flex>
    //                     </FormGroup>
    //                     {/*<Flex justifyContent="flex-end">*/}
    //                     {/*    <Button*/}
    //                     {/*        marginRight="medium"*/}
    //                     {/*        type="button"*/}
    //                     {/*        variant="subtle"*/}
    //                     {/*        onClick={onCancel}*/}
    //                     {/*    >*/}
    //                     {/*        Cancel*/}
    //                     {/*    </Button>*/}
    //                     {/*    <Button type="submit">Save</Button>*/}
    //                     {/*</Flex>*/}
    //                 </Panel>
    //                 <Panel header="Test API Keys">
    //                     <FormGroup>
    //                         <Input
    //                             // error={errors?.name}
    //                             label="Public Key"
    //                             name="public_key"
    //                             required
    //                             // value={form.name}
    //                             value={form.public_key}
    //                             // onChange={handleChange}
    //                         />
    //                     </FormGroup>
    //                     <FormGroup>
    //                         <Input
    //                             // error={errors?.name}
    //                             label="Private Key"
    //                             name="private_key"
    //                             required
    //                             // value={form.name}
    //                             value={form.private_key}
    //                             // onChange={handleChange}
    //                         />
    //                     </FormGroup>
    //                     <FormGroup>
    //                         <Input
    //                             // error={errors?.name}
    //                             label="Encryption Key"
    //                             name="encryption_key"
    //                             required
    //                             // value={form.name}
    //                             value={form.encryption_key}
    //                             // onChange={handleChange}
    //                         />
    //                     </FormGroup>
    //                     <Flex justifyContent="flex-end">
    //                         <Button
    //                             marginRight="medium"
    //                             type="button"
    //                             variant="subtle"
    //                             onClick={onCancel}
    //                         >
    //                             Cancel
    //                         </Button>
    //                         <Button type="submit">Save</Button>
    //                     </Flex>
    //                 </Panel>
    //                 <Panel header="Charges Settings">
    //                     <FormGroup>
    //                         {/* Using description for demo purposes. Consider using a wysiwig instead (e.g. TinyMCE) */}
    //                         <Textarea
    //                             label="Description"
    //                             name="description"
    //                             placeholder="Product info"
    //                             value="value"
    //                             // onChange={handleChange}
    //                         />
    //                     </FormGroup>
    //                     <Flex justifyContent="flex-end">
    //                         <Button
    //                             marginRight="medium"
    //                             type="button"
    //                             variant="subtle"
    //                             onClick={onCancel}
    //                         >
    //                             Cancel
    //                         </Button>
    //                         <Button type="submit">Save</Button>
    //                     </Flex>
    //                 </Panel>
    //                 <Flex justifyContent="flex-start" padding="small">
    //                     {/*<Button*/}
    //                     {/*    marginRight="medium"*/}
    //                     {/*    type="button"*/}
    //                     {/*    variant="subtle"*/}
    //                     {/*    onClick={onCancel}*/}
    //                     {/*>*/}
    //                     {/*    Cancel*/}
    //                     {/*</Button>*/}
    //                     <Button type="submit">Save Changes</Button>
    //                 </Flex>
    //             </Panel>
    //         </StyledForm>
    // )

};

export default FormSettings;

