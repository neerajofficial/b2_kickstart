import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Message, Button, Input } from 'semantic-ui-react';
import Layout from './../../../../components/layout';
import Campaign from './../../../../ethereum/campaign';
import web3 from './../../../../ethereum/web3';

const RequestNew = ({address}) => {
	const router = useRouter();	
	const [value, setValue] = useState('');
	const [description, setDescription] = useState('');
	const [recipient, setRecipient] = useState('');
	const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

	const submitHandler = async e => {
		e.preventDefault();
		setMessage('');
    setLoading(true);

		const campaign = Campaign(address);

		try {
			const accounts = await web3.eth.getAccounts();
			await campaign.methods.createRequest(
				description, 
				web3.utils.toWei(value, 'ether'), 
				recipient
			).send({ from: accounts[0] });
			router.replace(`/campaigns/${address}/requests`);
		} catch (error) {
			setMessage(error.message);
		}
		setLoading(false);
	}

	return (
		<Layout>
			<Button
				primary
				content="Back"
				onClick={()=> router.replace(`/campaigns/${address}/requests`)}
			/>
			<h3>Create a Request</h3>
			<Form onSubmit={submitHandler} error={!!message}>
				<Form.Field>
					<label htmlFor="description">Description</label>
					<Input 
						value={description} 
						onChange={e => setDescription(e.target.value)} 
					/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="value">Value in Ether</label>
					<Input 
						value={value} 
						onChange={e => setValue(e.target.value)} 
					/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="description">Recipient Address </label>
					<Input 
						value={recipient} 
						onChange={e => setRecipient(e.target.value)} 
					/>
				</Form.Field>
				<Message error header="Error!" content={message} />
				<Button
					loading={loading}
          disabled={loading}
					primary
					content="Submit"
				/>
			</Form>
		</Layout>
	)
}

RequestNew.getInitialProps = (props) => {
	const { address } = props.query;
	return { address };
}

export default RequestNew;