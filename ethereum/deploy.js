const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const campaignFactory = require("./build/CampaignFactory.json");

const mnemonicPhrase = "mnemonic";

const url = "https://rinkeby.infura.io/<key>";

const provider = new HDWalletProvider({
	mnemonic: {
		phrase: mnemonicPhrase,
	},
	providerOrUrl: url,
});

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log("Attempting to deploy from account: ", accounts[0]);

	try {
		const response = await new web3.eth.Contract(
			JSON.parse(campaignFactory.interface)
		)
			.deploy({ data: campaignFactory.bytecode })
			.send({ from: accounts[0], gas: "1000000" });

		console.log("Contract deployed to: ", response.options.address);
	} catch (error) {
		console.log(error);
	}
};

deploy();

provider.engine.stop();
