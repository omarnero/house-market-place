import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatch = (route) => {
    if (location.pathname === route) {
      return true;
    }
  };
  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem" onClick={() => navigate("/")}>
            <ExploreIcon
              width="36px"
              height="36px"
              fill={pathMatch("/") ? "#2c2c2c" : "#8f8f8f"}
            />
            <p
              className={
                pathMatch("/")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Explore
            </p>
          </li>
          <li className="navbarListItem" onClick={() => navigate("/offers")}>
            <OfferIcon
              width="36px"
              height="36px"
              fill={pathMatch("/offers") ? "#2c2c2c" : "#8f8f8f"}
            />
            <p
              className={
                pathMatch("/offers")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Offer
            </p>
          </li>
          <li className="navbarListItem" onClick={() => navigate("/profile")}>
            <PersonOutlineIcon
              width="36px"
              height="36px"
              fill={pathMatch("/profile") ? "#2c2c2c" : "#8f8f8f"}
            />
            <p
              className={
                pathMatch("/profile")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
