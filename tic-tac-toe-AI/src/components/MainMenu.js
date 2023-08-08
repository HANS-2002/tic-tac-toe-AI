import { Link } from "react-router-dom";
import MainMenuImg from "../assets/images/menu-tic-tac-toe.png";

export default function MainMenu() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <img src={MainMenuImg} className="mb-10 w-60" alt="mainMenuImage" />
        <Link
          to="/singleplayer"
          className="h-16 text-center w-64 flex mb-4 flex-col justify-center items-center rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out text-black hover:brightness-90"
          style={{ backgroundColor: "orange" }}
        >
          Singleplayer
        </Link>
        <Link
          to="/multiplayerOffline"
          className="h-16 text-center w-64 flex mb-4 flex-col justify-center items-center rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out text-black hover:brightness-90"
          style={{ backgroundColor: "orange" }}
        >
          Multiplayer Offline
        </Link>
        <Link
          to="/multiplayerOnline"
          className="h-16 text-center w-64 flex mb-4 flex-col justify-center items-center rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out text-black hover:brightness-90"
          style={{ backgroundColor: "orange" }}
        >
          Multiplayer Online
        </Link>
      </div>
    </>
  );
}
