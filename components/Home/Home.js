import styles from "./Home.module.scss";
import Card from "../Card/Card";
import HoverCard from "../HoverCard/HoverCard";
import WalletConnect from "../WalletConnect/WalletConnect";
import { useAccount } from "wagmi";
import SignInAuthButton from "../SignInAuthButton";
import { useEffect, useState } from "react";
import PublicationApi from "../../graphql/PublicationApi";
import CreatePost from "../CreatePost/CreatePost";
import { ethers } from "ethers";

export default function Home() {
  const { isConnected } = useAccount();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log({ a: window?.sessionStorage?.getItem("accessToken") });
    setIsLoggedIn(!!window?.sessionStorage?.getItem("accessToken"));
  }, []);

  function logout() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    setIsLoggedIn(false);

    // console.log(ethers.utils.defaultAbiCoder.encode(["uint64", "uint32", "uint32", "uint256", "uint256", "uint16", "address", "address", "bool"], [1669709370, 86400, 3600, 10, 100, 0, "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F", "0x0904fD076C4C879adf9044027bc0f60c190e0FF1", false]))
  }

  return (
    <div className={styles.container}>
      <WalletConnect />
      {isConnected && !isLoggedIn && (
        <SignInAuthButton setIsLoggedIn={setIsLoggedIn} />
      )}
      {isLoggedIn && (
        <div className={styles.btnContainer}>
          <button type="submit" onClick={logout} title="Logout">Logout</button>
          <CreatePost />
        </div>
      )}
      <Card />
      <HoverCard />
    </div>
  );
}
