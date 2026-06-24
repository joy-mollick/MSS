// ========================= Before return =========================

import React, { useEffect, useState } from "react";
import { Menu, Plus, UserCircle, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { title: "HOME", path: "/" },
  { title: "FAVOURITE", path: "/favourites" },
  { title: "LEARN", path: "/news" },
  { title: "JOIN", path: "/login", authHidden: true },
  { title: "CONTACT US", path: "/contact" },
];

const Header = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      setLoggedIn(localStorage.getItem("nwlb_logged_in") === "true");
    };

    checkLogin();

    window.addEventListener("storage", checkLogin);
    window.addEventListener("nwlb_auth_change", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("nwlb_auth_change", checkLogin);
    };
  }, []);

  const goAddListing = () => {
    setOpen(false);

    if (loggedIn) {
      navigate("/add-listing");
      return;
    }

    navigate("/signup");
  };

  const goProfile = () => {
    setOpen(false);
    navigate("/account");
  };

  const visibleNavItems = navItems.filter((item) => {
    if (loggedIn && item.authHidden) return false;
    return true;
  });

  return (
    // ========================= Inside return =========================

    <header className="siteHeader">
      <div className="headerInner">
        <button
          className="logoButton"
          onClick={() => {
            setOpen(false);
            navigate("/");
          }}
        >
          <img src="/assets/logo-blue.png" alt="NWLB" />
        </button>

        <nav className="desktopNav">
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "navItem navItemActive" : "navItem"
              }
            >
              {item.title}
            </NavLink>
          ))}

          {loggedIn && (
            <NavLink
              to="/account"
              className={({ isActive }) =>
                isActive ? "navItem navItemActive" : "navItem"
              }
            >
              PROFILE
            </NavLink>
          )}
        </nav>

        <div className="headerActions">
          {loggedIn && (
            <button className="profileHeaderBtn" onClick={goProfile}>
              <UserCircle size={18} />
              PROFILE
            </button>
          )}

          <button className="addListingBtn" onClick={goAddListing}>
            <Plus size={16} />
            ADD LISTING
          </button>

          <button className="mobileMenuBtn" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobileMenu">
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "mobileNavItem mobileNavItemActive" : "mobileNavItem"
              }
            >
              {item.title}
            </NavLink>
          ))}

          {loggedIn && (
            <button className="mobilePlainBtn" onClick={goProfile}>
              <UserCircle size={17} />
              PROFILE
            </button>
          )}

          <button className="mobileAddListingBtn" onClick={goAddListing}>
            <Plus size={16} />
            ADD LISTING
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;