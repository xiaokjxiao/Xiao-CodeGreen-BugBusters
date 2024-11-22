import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleHomePage = () => {
    navigate("/admin");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleSignOut = async () => {
    // Replace with BACKEND APIs
    // try {
    //   const { error } = await supabase.auth.signOut();
    //   if (error) alert(error);
    //   else navigate("/login");
    // } catch (error) {
    //   alert(error);
    // }
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-start w-full px-4 py-4">
      <div className="flex items-center font-syke-regular w-full max-w-[60rem] justify-between">
        {/* Logo Section */}
        <div className="flex items-center ml-[-70px] mr-[150px]">
          <button
            onClick={handleHomePage}
            className="flex text-left items-center gap-4 group overflow-hidden rounded-md pr-20 py-2 text-white font-medium text-lg"
          >
            <img
              src="../assets/5.png"
              alt="Logo"
              className="w-10 h-5 object-contain md:w-[4rem] md:h-[4rem] transition-transform duration-300 hover:scale-105"
            />
            <h1 className="text-lg md:text-xl font-semibold hover:text-buttongreen">CodeGreen Gateway</h1>
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex space-x-20 text-white font-medium text-lg">
          <Link
            to="/encode"
            className="hover:text-textgreen transition-colors"
          >
            Encode
          </Link>
          <Link
            to="/driverslist"
            className="hover:text-textgreen transition-colors"
          >
            Drivers
          </Link>
          <Link
            to="/violatorslist"
            className="hover:text-textgreen transition-colors"
          >
            Violators
          </Link>

          {/* Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="hover:text-buttongreen transition-colors"
            >
              Account
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-4 w-48 bg-hoverbutton text-white rounded-md shadow-lg">
                <span className="block px-4 py-2 hover:bg-buttongreen rounded-t-md cursor-pointer">
                  Profile
                </span>
                <span className="block px-4 py-2 hover:bg-buttongreen cursor-pointer">
                  Reset Password
                </span>
                <span
                  onClick={handleSignOut}
                  className="block px-4 py-2 hover:bg-buttongreen rounded-b-md cursor-pointer"
                >
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

export default AdminHeader;
