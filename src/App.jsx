import { useState } from "react";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { useRef } from "react";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase.config";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState();

  const userSignOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  const roomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {room ? (
        <div>
          <Chat room={room} />
        </div>
      ) : (
        <div className="flex flex-col max-w-[500px] items-center gap-3">
          <label className="text-lg ">Enter room name</label>
          <input
            type="text"
            ref={roomInputRef}
            className="w-full border-2 rounded-md outline-none px-3 py-2"
          />
          <button
            className="bg-blue-600 text-md text-white py-1 px-2 rounded-md hover:bg-blue-500"
            onClick={() => setRoom(roomInputRef.current.value)}
          >
            Enter Chat Room
          </button>
        </div>
      )}

      <div>
        <button className="px-2 py-1 bg-red-600 text-white rounded-md" onClick={userSignOut}>Sign out</button>
      </div>
    </div>
  );
}

export default App;
