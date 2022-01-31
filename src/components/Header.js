import { NavLink } from "react-router-dom";

const Header = () => {
  return(
    <div className="main-header">
      <div className="main-header-title">
        <h2>Monthly Grocery</h2>
      </div>
      <div className="ui inverted segment">
        <div className="ui inverted secondary menu">
          <NavLink to="/" className={({isActive}) => "item home icon" + (isActive ? " active" : "")}><i aria-hidden="true" className="home icon large"/></NavLink>
          <NavLink to="/newgrocery" className={({isActive}) => "item" + (isActive ? " active" : "")}>Add Grocery</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
