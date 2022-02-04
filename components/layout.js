import Head from 'next/head';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Header from './header';

export default ({children}) => {
	return (
		<Container>
			<Head>
				<title>CrowdCoin</title>
			</Head>
			<Header />
			{children}
		</Container>
	)
}