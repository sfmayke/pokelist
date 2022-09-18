import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from './../../../redux/hooks';
import { changeSearchTerm } from './../../../redux/search-slice';
import "./NavBar.scss";

export default function NavBar() {
  
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(changeSearchTerm(e.target.value));
    ;
  }

  return (
    <div className="navbar-root">
      <input type="text" value={searchTerm} placeholder="Search..." onChange={(e) => handleInputChange(e)} />
    </div>
  );
}
