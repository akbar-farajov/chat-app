import { auth, provider } from "../firebase.config";
import { signInWithPopup } from "firebase/auth";
import google from "../assets/google.svg";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="max-w-[500px] border px-5 py-10 rounded-lg">
      <p className="text-md font-bold mb-3">Sign in with google to continue</p>
      <button
        className=" bg-blue-600 rounded-lg flex items-center gap-2 w-full box-border p-0.5"
        onClick={signInWithGoogle}
      >
        <div className="p-1  roun bg-white rounded-lg">
          <img src={google} className="w-7 h-7" />
        </div>
        <span className="text-white">Sign in with Google</span>
      </button>
    </div>
  );
};
