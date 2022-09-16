// import { ChangeEvent } from "react";
import useGetPokemons from "../../../services/swr";
import "./NavBar.scss";

export default function NavBar() {

  // function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
  //   console.log(e.target.value)
  //   ;
  // }

  return (
    <div className="navbar-root">
      <input type="text" placeholder="Search..." onChange={(e) => useGetPokemons({name: `${e.target.value}*`})} />
    </div>
  );
}
