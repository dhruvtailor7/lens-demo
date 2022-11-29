import { Provider } from "react-redux";
import store from "../store/store";
import "../styles/globals.scss";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

function MyApp({ Component, pageProps }) {
  const { chains, provider } = configureChains(
    [chain.polygon, chain.polygonMumbai],
    [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "Hot or Not",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
