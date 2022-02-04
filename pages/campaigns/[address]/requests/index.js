import { useRouter } from 'next/router';
import { Button, Table } from 'semantic-ui-react';
import Layout from './../../../../components/layout'
import Campaign from './../../../../ethereum/campaign';
import web3 from './../../../../ethereum/web3';
import RequestRow from './../../../../components/requestRow';

const RequestIndex = ({ address, requests, requestCount, approversCount }) => {
	const router = useRouter();

	const { Header, Row, HeaderCell, Body } = Table;

	const renderRows = () => {
		return requests.map((request, index) => {
			return <RequestRow
				key={index}
				id={index}
				request={request}
				address={address}
				approversCount={approversCount}
			/>
		});
	}

	return (
		<Layout>
			All Requests
			<Button 
				primary 
				floated="right"
				style={{ marginBottom: 10 }}
				content="Create Request" 
				onClick={() => router.push(`/campaigns/${address}/requests/new`)}
			/>
			<Table>
				<Header>
					<Row>
						<HeaderCell>ID</HeaderCell>
						<HeaderCell>Description</HeaderCell>
						<HeaderCell>Amount (ether)</HeaderCell>
						<HeaderCell>Recipient</HeaderCell>
						<HeaderCell>Approval Count</HeaderCell>
						<HeaderCell>Approve</HeaderCell>
						<HeaderCell>Finalize</HeaderCell>
					</Row>
				</Header>
				<Body>
					{renderRows()}	
				</Body>
			</Table>
			<div>Found {requestCount} requests.</div>
		</Layout>
	)
}

RequestIndex.getInitialProps = async (props) => {
	const { address } = props.query;
	const campaign = Campaign(address);
	const requestCount = await campaign.methods.getRequestsCount().call();
	const approversCount = await campaign.methods.approversCount().call();
	
	const requests = await Promise.all(
		Array(parseInt(requestCount)).fill().map((element, index) => {
				return campaign.methods.requests(index).call();
			})
	);

	return { address, requests, requestCount, approversCount };
}

export default RequestIndex;