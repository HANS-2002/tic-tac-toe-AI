import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div
        className="header text-center h-10 text-4xl p-4 mb-4 "
        style={{ fontFamily: "Bloomberg" }}
      >
        <Link to={"/"} style={{ fontFamily: "Bloomberg" }}>TIC TAC TOE</Link>
      </div>
    </>
  );
}
