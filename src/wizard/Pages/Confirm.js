const React = require("react");
const { Box, Text, useApp } = require("ink");
const WizardContext = require("../WizardContext");
const { useContext, useEffect, useState } = require("react");
const { default: TextInput } = require("ink-text-input");
const chalk = require("chalk");
const { createConfigFile, verifyConfig } = require("../../utils");

const Confirm = () => {
	const { exit } = useApp();
	const {
		config: {
			network: { value: network },
			rpc: { value: rpc },
			strategy: { value: strategy },
			tokens: { value: tokens },
			slippage: { value: slippage },
			advanced: { value: advanced },
		},
		config,
	} = useContext(WizardContext);
	const [isConfigOk, setIsConfigOk] = useState({
		result: false,
		badConfig: [],
	});

	useEffect(() => {
		setIsConfigOk(verifyConfig(config));
	}, []);

	return (
		<Box flexDirection="column">
			<Text>Confirm your settings:</Text>
			<Box margin={1} flexDirection="column">
				<Text>Network: {chalk.greenBright(network)}</Text>
				<Text>RPC: {chalk.greenBright(rpc)}</Text>
				<Text>Strategy: {chalk.bold.greenBright(strategy)}</Text>
				<Text>
					Tokens: {chalk.bold.blueBright(tokens.tokenA.symbol)} /{" "}
					{chalk.bold.blueBright(tokens.tokenB.symbol)}
				</Text>
				<Text>Slippage: {chalk.bold.greenBright(slippage)}</Text>
				<Text color="gray"></Text>
				<Text>
					Min Interval: {chalk.bold.greenBright(advanced.minInterval)}
				</Text>
			</Box>
			{isConfigOk.result ? (
				<TextInput
					value={`${chalk.bold.greenBright("[ CONFIRM ]")}`}
					showCursor={false}
					onSubmit={async () => {
						createConfigFile(config);
						exit();
					}}
				/>
			) : (
				<Text>
					Error on step:{" "}
					{<Text color="red">{isConfigOk.badConfig.join(", ")}</Text>}
				</Text>
			)}
		</Box>
	);
};

module.exports = Confirm;
