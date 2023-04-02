import React,{useState} from 'react'
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from "next/dynamic";
import CreateProduct from "../components/CreateProduct";
import styles from "../styles/Product.module.css";

const Navbar = () => {
  // Dynamic import `WalletMultiButton` to prevent hydration error
  const { publicKey } = useWallet();
  const [creating, setCreating] = useState(false);
 // const isOwner = ( publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false );


const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

// This will fetch the users' public key (wallet address) from any wallet we support


const renderNotConnectedContainer = () => (

    <div className="button-container" >
      <WalletMultiButtonDynamic className="cta-button connect-wallet-button" />
    </div>    
);

  return (
    <>
    <header class="text-gray-600 body-font bg-gradient-to-b from-purple-500 to-green-500  " >
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <div class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
      <div class="text-navblue text-2xl ml-2 font-black">ART CASTLE</div>
      
    </div>
    <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 flex flex-wrap items-center text-base justify-center">
      
    </nav>
    
    <div  class="  flex flex-col items-center text-base justify-center font-black  ">
    {publicKey ? 
            <button  className="create-product-button" onClick={() => setCreating(!creating)}>
              {creating ? "Close ✖" : "+ Share Your Art"}
            </button>
            : ""}
 
    </div>
    
    <div class="bg-gradient-to-b from-purple-400 to-green-400  rounded">
    
  <WalletMultiButton>
{/* We only render the connect button if public key doesn't exist */}

{publicKey ? publicKey.toString().slice(0,4)+"..."+publicKey.toString().slice(-3,) : renderNotConnectedContainer()}

    </WalletMultiButton>
    </div>
  </div>
</header>
{creating && <CreateProduct />}
    </>
    
  )
}

export default Navbar