import { useRouter } from 'next/router';
import Link from 'next/link';
import factory from './../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from './../components/layout';

const CampaignIndex = ({campaigns}) => {
	const router = useRouter();

	const renderCampaigns = () => {
		const items = campaigns.map(address => {
			return {
				header: address,
				description: <Link href={`/campaigns/${address}`} >
					View Campaign
				</Link>,
				fluid: true
			}
		});
		return <Card.Group items={items} />
	}

	return (
		<Layout>
			<h3>Open Campaigns</h3>
			<Button 
				floated='right'
				content="Create Campaign"
				icon="add circle"
				primary
				onClick={() => router.push('/campaigns/new')}
			/>
			{renderCampaigns()}
		</Layout>
	)
}

CampaignIndex.getInitialProps = async () => {
	const campaigns = await factory.methods.getDeployedCampaigns().call();
	return {campaigns};
}

export default CampaignIndex;