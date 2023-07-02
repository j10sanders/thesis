import { OpenAIApi, Configuration } from "openai";
import Web3 from "web3";
import { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// TODO: switch to a testnet
export const web3 = new Web3("http://localhost:8545");

export async function accountsToDisplay() {
  const accounts = await web3.eth.getAccounts();
  const accountsWithBalances: Record<string, string>[] = [];

  await Promise.all(
    accounts.map(async (account) => {
      const balance = await web3.eth.getBalance(account);
      accountsWithBalances[accounts.indexOf(account)] = {
        [account]: balance.toString(),
      };
    })
  );

  return accountsWithBalances;
}

export async function web3Transaction(account: string, value: string) {
  console.log("CHECK");
  console.log(web3.eth.accounts);
  const accounts = await web3.eth.getAccounts();

  await web3.eth.sendTransaction({
    from: accounts[0],
    to: account,
    value,
  });

  return accountsToDisplay();
}

export const chat = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body, "BOTDY");
  console.log(process.env.OPENAI_API_KEY);
  if (req.body !== undefined) {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      messages: [
        {
          role: "system",
          content:
            "You are a bot that facilitates web3 transactions for users who just want to tell you what to do in natural language.",
        },
        {
          role: "user",
          content: req.body,
        },
      ],
      functions: [
        {
          name: "web3Transaction",
          description: "Send a transaction to a web3 account.",
          parameters: {
            type: "object",
            properties: {
              account: {
                type: "string",
                description: "The account to send the transaction to.",
              },
              value: {
                type: "string",
                description:
                  "The value to send in the web3 transaction, in wei.",
              },
            },
            required: ["account", "value"],
          },
        },
      ],
    });

    const { message } = completion.data.choices[0];

    if (message?.function_call?.arguments) {
      const { account, value } = JSON.parse(message.function_call.arguments);
      // TODO: use other transaction types for functions

      console.log(account, value);
      const balances = await web3Transaction(account, value);
      res.status(200).json({ balances });
    }
  } else {
    res.status(400).json({ text: "No prompt provided." });
  }
};

export default chat;
