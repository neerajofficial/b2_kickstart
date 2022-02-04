import { useRouter } from 'next/router';
import { Table, Button } from 'semantic-ui-react';
import Campaign from './../ethereum/campaign';
import web3 from './../ethereum/web3';

const RequestRow = ({ id, request, address, approversCount }) => {
	const router = useRouter();
	const { Row, Cell } = Table;
	const readyToFinalize = request.approvalCount > approversCount / 2;

	const approveHandler = async () => {
		const campaign = Campaign(address);
		const accounts = await web3.eth.getAccounts();
		const approveRequest = await campaign.methods.approveRequest(id).send({
			from: accounts[0]
		});
	}

	const finalizeHandler = async () => {
		const campaign = Campaign(address);
		const accounts = await web3.eth.getAccounts();
		await campaign.methods.finalizeRequest(id).send({
			from: accounts[0]
		});
		router.replace(`/campaigns/${address}/requests`);
	}

	return (
		<Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
			<Cell>{id}</Cell>
			<Cell>{request.description}</Cell>
			<Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
			<Cell>{request.recipient}</Cell>
			<Cell>{request.approvalCount}/{approversCount}</Cell>
			<Cell>
			{ request.complete ||	<Button color="green" basic content="Approve" onClick={approveHandler} />
			}
			</Cell>
			<Cell>
			{ request.complete ||
				<Button color="teal" basic content="Finalize" onClick={finalizeHandler} />
			}
			</Cell>
		</Row>
	)
}

export default RequestRow;