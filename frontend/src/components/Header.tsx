import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/context-hooks/useAuth";
import { AuthContextType } from "../types/user.types";

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useLogout();
  const { auth }: AuthContextType = useAuth();

  const handleHomePage = () => {
    navigate("/homepage");
  };

  const handleProfile = () => {
    console.log(auth);
    navigate(`/view-profile/${auth!.id}`);
  };
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleLogOut = async () => {
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="flex items-center justify-start w-full px-4 py-4">
      <div className="flex items-center font-syke w-full justify-between">
        {/* Logo Section */}
        <div className="flex items-center w-[12rem] mr-[150px]">
          <button
            onClick={handleHomePage}
            className="flex text-left items-center gap-4 group overflow-hidden rounded-md pr-20 py-2 text-white font-medium text-lg">
            <img
              src="../assets/5.png"
              alt="Logo"
              className="w-10 h-5 object-contain md:w-[4rem] md:h-[4rem] transition-transform duration-300 hover:scale-105"
            />
            <h1 className="text-lg md:text-xl font-syke-medium transition-colors hover:text-buttongreen">
              CodeGreen Gateway
            </h1>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-20 text-white font-syke-medium text-lg">
          <Link
            to="/homepagedriver"
            className="hover:text-textgreen font-syke-medium transition-colors">
            Inbox
          </Link>
          <Link
            to="/about"
            className="hover:text-textgreen transition-colors">
            About
          </Link>
          <Link
            to="/policies"
            className="hover:text-textgreen font-syke-medium transition-colors">
            Policies
          </Link>
          <div
            className="relative"
            ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="text-white hover:text-textgreen transition-colors">
              Account
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-4 w-48 bg-hoverbutton text-white rounded-md shadow-lg z-10">
                <span
                  onClick={handleProfile}
                  className="block font-syke-medium rounded-t-lg text-sm px-4 py-2 hover:bg-buttongreen cursor-pointer">
                  Profile
                </span>
                <span
                  // THIS SHOULD BE FOR RESETTING PASSWORD NOT LOG OUT
                  onClick={handleLogOut}
                  className="block font-syke-medium text-sm px-4 py-2 hover:bg-buttongreen cursor-pointer">
                  Reset Password
                </span>
                <span
                  onClick={handleLogOut}
                  className="block font-syke-medium text-sm rounded-b-lg px-4 py-2 hover:bg-buttongreen cursor-pointer">
                  Log Out
                </span>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
