import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="main-header">
      <div className="main-header-title">
        <h2>MONTHLY GROCERY</h2>
      </div>
      <div className="ui inverted segment">
        <div className="ui inverted secondary menu">
          <NavLink
            to="/newgrocery"
            style={{ marginRight: "2px!important" }}
            className={({ isActive }) => "item" + (isActive ? " active" : "")}
          >
            <i aria-hidden="true" className="shopping bag icon large" />
          </NavLink>
          <NavLink
            to="/selectgrocerytype"
            className={({ isActive }) => "item" + (isActive ? " active" : "")}
          >
            <i aria-hidden="true" className="group icon large" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
