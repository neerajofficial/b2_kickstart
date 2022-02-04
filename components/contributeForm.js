import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Input, Message } from "semantic-ui-react";
import Campaign from './../ethereum/campaign';
import web3 from './../ethereum/web3';

const ContributeForm = ({ address }) => {

	const router = useRouter();
	const [amount, setAmount] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();
		setMessage('');
		setLoading(true);
		const campaign = Campaign(address);
		try {

			const accounts = await web3.eth.getAccounts();

			await campaign.methods.contribute().send({ 
				from: accounts[0], 
				value: web3.utils.toWei(amount, 'ether')
			});
			setAmount('');
			router.replace(`/campaigns/${address}`);

		} catch(error) {
			setMessage(error.message);
		}
		setLoading(false);
	};

	return (
		<Form onSubmit={submitHandler} error={!!message}>
			
			<Form.Field>
				<label htmlFor="contribute">Amount to Contribute</label>
				<Input
					label="ether"
					labelPosition="right"
					value={amount}
					onChange={e => setAmount(e.target.value)}
				/>
			</Form.Field>
			<Message error header="Error!" content={message} />
			<Button
				loading={loading}
				disabled={loading}
				primary
				content="Create"
			/>
		</Form>
	);
};

export default ContributeForm;
