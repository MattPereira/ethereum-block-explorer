import { Alchemy, Network } from "alchemy-sdk";

//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface

// TODO: move this to serverless functions on vercel
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);
