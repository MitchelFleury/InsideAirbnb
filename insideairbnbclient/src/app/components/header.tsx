import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [profileOpen, setProfileOpen] = useState(false);

  const nameCheck = (user: any) => {
    //check if name or nickname is not a email or empty
    if (user.name && user.name !== user.email) {
      return user.name;
    } else if (user.nickname && user.nickname !== user.email) {
      return user.nickname;
    } else {
      return "User";
    }
  };

  return (
    <header className="w-full p-4 bg-blue-600 text-white flex justify-between items-center">
      <h2 className="text-xl">InsideAriBnB</h2>

      <div>
        {!isAuthenticated ? (
          <button
            className="bg-white text-blue-600 px-4 py-2 rounded"
            onClick={() => loginWithRedirect()}
          >
            Login
          </button>
        ) : (
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex text-sm p-1 bg-gray-800 rounded-full md:me-0 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src={user?.picture}
                alt=""
              />
            </button>

            {profileOpen && (
              <div
                className="z-50 right-1 top-10 absolute my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {nameCheck(user)}
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  {user && (
                    <li>
                      <button
                        onClick={() =>
                          logout({
                            logoutParams: {
                              returnTo: window.location.origin,
                            },
                          })
                        }
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
