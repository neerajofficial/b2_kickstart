import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from './../../ethereum/factory';
import web3 from './../../ethereum/web3';
import Layout from './../../components/layout';

const CampaignNew = props => {
  const router = useRouter();
  const [min, setMin] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async e => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(min).send({ 
        from: accounts[0]
      });
      router.replace('/');
    } catch (error) {
      setMessage(error.message);
    }
    setLoading(false);
  }

  return (
    <Layout>
      <h3>Create Campaign</h3>
      <Form onSubmit={submitHandler} error={!!message}>
        <Form.Field>
          <label htmlFor="min">Minimum Contribution</label>
          <Input 
            label="wei" 
            labelPosition="right"
            value={min}
            onChange={e => setMin(e.target.value)} />
        </Form.Field>
        <Message error header="Error!" content={message} />
        <Button 
          loading={loading}
          disabled={loading}
          primary 
          content="Create"
        />
      </Form>
    </Layout>
  )
}

export default CampaignNew;