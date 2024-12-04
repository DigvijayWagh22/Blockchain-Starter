import { useState } from "react";
import "./App.css";
import { SolanaWallet } from "./component/SolanaWallet";
import { EthWallet } from "./component/ETHWallet";
import { generateMnemonic } from "bip39";

//next part start
import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";
import { SendTokens } from "./componentSol/SendTokens";
import { SignMessage } from "./componentSol/SignMessage";
import { ShowSolBalance } from "./componentSol/ShowSolBalance";

//next part end

// third part start
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./config/WalletConfig";
import { WalletConnector } from "./componentETH/WalletConnector";
import { UserBalance } from "./componentETH/UserBalance";
import { SendTransaction } from "./componentETH/SendTransaction";

const queryClient = new QueryClient();
//third part end

function App() {
  const [mnemonic, setMnemonic] = useState("");
  //next part start
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  // next part end

  {
    /* third part start */
  }
  {
    /* third part end */
  }

  return (
    <>
      <button
        onClick={async function () {
          try {
            const mn = await generateMnemonic();
            setMnemonic(mn);
          } catch (error) {
            console.error("Error generating mnemonic:", error);
          }
        }}
      >
        Generate Mnemonic
      </button>
      <input
        type="text"
        value={mnemonic}
        placeholder="Generated mnemonic will appear here"
        readOnly
      />
      {mnemonic && <SolanaWallet mnemonic={mnemonic} />}
      {mnemonic && <EthWallet mnemonic={mnemonic} />}

      {/* next part start */}
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            {/* <RequestAirdrop />*/}
            <ShowSolBalance />
            {/* <Tokens /> */}
            <SignMessage />
            <SendTokens />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
      {/* next part end */}
      {/* third part start */}
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <div className="flex justify-center items-center w-[100%] h-screen">
            <WalletConnector />
            <UserBalance />
            <SendTransaction />
          </div>
        </QueryClientProvider>
      </WagmiProvider>
      {/* third part end */}
    </>
  );
}

export default App;
