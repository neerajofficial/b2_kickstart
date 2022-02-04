// import { useEffect } from 'react';
import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	// We are in the browser and metamask is running.
	const { ethereum } = window;
	ethereum.request({ method: 'eth_requestAccounts' });
	web3 = new Web3(ethereum);
	// console.log(web3);
} else {
	// We are on the server *OR* the user is not running metamask
	const provider = new Web3.providers.HttpProvider(
		'https://rinkeby.infura.io/<key>'
	)
	web3 = new Web3(provider);
	// console.log(web3);
}

export default web3;