import { useRouter } from 'next/router';
import ErrorMessage from '../components/error';
import FormSettings from '../components/formSettings';
import Loading from '../components/loading';
import { useSession } from '../context/session';
import {useItexpaySettings, useWebSocketClientAuth} from '../lib/hooks';
import { ItexpayProps} from '../types';
import {isAdmin} from "@firebase/util";


const ItexpaySettings = () => {
    const router = useRouter();
    const encodedContext = useSession()?.context;
    // const pid = Number(router.query?.pid);
    const { isActive: isActive, current_mode: current_mode, test_public_key, test_private_key, test_encryption_key, live_public_key, live_private_key, live_encryption_key, error, isLoading, mutateList } = useItexpaySettings();
    // const { isLoading: isInfoLoading, product } = useProductInfo(pid, list);
    // const { description, public_key, private_key, encryption_key, type } = product ?? {};
    const formData = { isActive, current_mode, test_public_key, test_private_key, test_encryption_key, live_public_key, live_private_key, live_encryption_key };

    // const { first_name, last_name, email, phone_number, amount, authurl } = useWebSocketClientAuth();

    const handleCancel = () => router.push('/settings');
    // const handleCancel = () => router.reload;

    const handleSubmit = async (data: ItexpayProps) => {
        try {
            // const filteredList = list.filter(item => item.id !== pid);
            const {  isActive, current_mode, test_public_key, test_private_key, test_encryption_key, live_public_key, live_private_key, live_encryption_key } = data;
            const apiFormattedData = { isActive: isActive, current_mode: current_mode, test_public_key, test_private_key, test_encryption_key, live_public_key, live_private_key, live_encryption_key };

            // Update local data immediately (reduce latency to user)
            // mutateList([...filteredList, { ...product, ...data }], false);

            // Update product details
            await fetch(`/api/sample?context=${encodedContext}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(apiFormattedData),
                // body: JSON.stringify(apiFormattedData),
            });

            // Refetch to validate local data
            // mutateList();

            router.push('/settings');
        } catch (error) {
            console.error('Error updating the product: ', error);
        }
    };

    if (isLoading
        // || isInfoLoading
    ) return <Loading />;
    if (error) return <ErrorMessage error={error} />;

    return (
        <FormSettings formData={formData} onCancel={handleCancel} onSubmit={handleSubmit} />
    );
};
//     return (
//         // <StyledForm>
//
//             <StyledForm onSubmit={handleSubmit}>
//                 <Panel header="ItexPay Settings">
//                     <Panel header="Advanced Settings">
//                         <FormGroup>
//                             <Flex>
//                                 <FlexItem padding="small"
//                                           alignSelf="auto"
//                                           flexBasis="auto"
//                                           flexGrow={0}
//                                           flexOrder={0}
//                                           flexShrink={1}>
//                                         <Checkbox
//                                             name="isVisible"
//                                             // checked={true}//"{form.isVisible}"
//                                             checked={true}
//                                             onChange={handleCheckboxChange}
//                                             label="Visible on storefront"
//                                         />
//                                 </FlexItem>
//                             </Flex>
//                         </FormGroup>
//                         <FormGroup  //style={{ display: 'inline-block', flexDirection: 'row' }}
//                         >
//                             <Flex>
//                                 <FlexItem padding="small"
//                                           alignSelf="auto"
//                                           flexBasis="auto"
//                                           flexGrow={0}
//                                           flexOrder={0}
//                                           flexShrink={1}>
//                                         <Radio
//                                             name = "current_mode"
//                                             checked={selected === 'test'}
//                                             label="Test Mode"
//                                             onChange={handleChangebut}
//                                             value="test"
//                                         />
//                                 </FlexItem>
//                                 <FlexItem padding="small"
//                                           alignSelf="auto"
//                                           flexBasis="auto"
//                                           flexGrow={0}
//                                           flexOrder={0}
//                                           flexShrink={1}>
//                                         <Radio
//                                             name = "current_mode"
//                                             checked={selected === 'live'}
//                                             label="Live Mode"
//                                             onChange={handleChangebut}
//                                             value="live"
//                                         />
//                                 </FlexItem>
//                             </Flex>
//                         </FormGroup>
//                         {/*<Flex justifyContent="flex-end">*/}
//                         {/*    <Button*/}
//                         {/*        marginRight="medium"*/}
//                         {/*        type="button"*/}
//                         {/*        variant="subtle"*/}
//                         {/*        onClick={onCancel}*/}
//                         {/*    >*/}
//                         {/*        Cancel*/}
//                         {/*    </Button>*/}
//                         {/*    <Button type="submit">Save</Button>*/}
//                         {/*</Flex>*/}
//                     </Panel>
//                     <Panel header="Test API Keys">
//                         <FormGroup>
//                             <Input
//                                 // error={errors?.name}
//                                 label="Public Key"
//                                 name="public_key"
//                                 required
//                                 // value={form.name}
//                                 value={form.public_key}
//                                 // onChange={handleChange}
//                             />
//                         </FormGroup>
//                         <FormGroup>
//                             <Input
//                                 // error={errors?.name}
//                                 label="Private Key"
//                                 name="private_key"
//                                 required
//                                 // value={form.name}
//                                 value={form.private_key}
//                                 // onChange={handleChange}
//                             />
//                         </FormGroup>
//                         <FormGroup>
//                             <Input
//                                 // error={errors?.name}
//                                 label="Encryption Key"
//                                 name="encryption_key"
//                                 required
//                                 // value={form.name}
//                                 value={form.encryption_key}
//                                 // onChange={handleChange}
//                             />
//                         </FormGroup>
//                         <Flex justifyContent="flex-end">
//                             <Button
//                                 marginRight="medium"
//                                 type="button"
//                                 variant="subtle"
//                                 onClick={onCancel}
//                             >
//                                 Cancel
//                             </Button>
//                             <Button type="submit">Save</Button>
//                         </Flex>
//                     </Panel>
//                     <Panel header="Charges Settings">
//                         <FormGroup>
//                             {/* Using description for demo purposes. Consider using a wysiwig instead (e.g. TinyMCE) */}
//                             <Textarea
//                                 label="Description"
//                                 name="description"
//                                 placeholder="Product info"
//                                 value="value"
//                                 // onChange={handleChange}
//                             />
//                         </FormGroup>
//                         <Flex justifyContent="flex-end">
//                             <Button
//                                 marginRight="medium"
//                                 type="button"
//                                 variant="subtle"
//                                 onClick={onCancel}
//                             >
//                                 Cancel
//                             </Button>
//                             <Button type="submit">Save</Button>
//                         </Flex>
//                     </Panel>
//                     <Flex justifyContent="flex-start" padding="small">
//                         {/*<Button*/}
//                         {/*    marginRight="medium"*/}
//                         {/*    type="button"*/}
//                         {/*    variant="subtle"*/}
//                         {/*    onClick={onCancel}*/}
//                         {/*>*/}
//                         {/*    Cancel*/}
//                         {/*</Button>*/}
//                         <Button type="submit">Save Changes</Button>
//                     </Flex>
//                 </Panel>
//             </StyledForm>
//     );
// };

export default ItexpaySettings;
