import { useAccount, useSignMessage } from "wagmi";
import AuthApi from "../../graphql/AuthApi";

export default function SignInAuthButton({setIsLoggedIn}) {
  const { address } = useAccount();
  const {signMessageAsync} = useSignMessage();
  const signIn = async () => {
    const challengeText = (await AuthApi.queryChallengeText(address)).data.challenge.text;
    console.log({challengeText})
    const signature = await signMessageAsync({message: challengeText})
    console.log({signature})
    AuthApi.verifySignature(address, signature).then((res) => console.log(res)).catch((res) => console.log(res))
    const {accessToken, refreshToken} = (await AuthApi.verifySignature(address, signature)).data.authenticate
    console.log({accessToken, refreshToken})
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
    setIsLoggedIn(true);
  }
  return (
    <button type="submit" onClick={signIn}>
      Sign-In
    </button>
  );
}
