import React, { useState } from "react";
import { Link } from "react-router-dom";
import Image from "./img.png";

const Header = () => {
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleClickCat = () => setShowCatMenu(!showCatMenu);
  const handleClickUser = () => setShowUserMenu(!showUserMenu);

  return (
    <div>
      <nav className="z-10 bg-white dark:bg-gray-800 antialiased shadow-md h-[15%] w-full fixed">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center lg:space-x-2 relative">
              <button
                id="catDropdown"
                type="button"
                className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-900 dark:text-white"
                onMouseOver={handleClickCat}
                onMouseOut={handleClickCat}
              >
                <span className="sr-only">Categorias</span>
                <svg
                  className="w-5 h-5 lg:me-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                  />
                </svg>
                <span className="hidden sm:flex">Categorias</span>
              </button>

              {showCatMenu && (
                <div
                  id="catDropdown"
                  className="absolute top-full left-0 z-10 mt-2 w-48 rounded-lg bg-white shadow-lg dark:bg-gray-800"
                >
                  {/* Dropdown Content */}
                  <div className="grid grid-cols-1 gap-4 p-4">
                    <div>
                      <a
                        href="#"
                        className="text-sm font-semibold hover:underline text-gray-900 dark:text-white"
                      >
                        Eletronicos
                      </a>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="text-sm font-semibold hover:underline text-gray-900 dark:text-white"
                      >
                        Roupas
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Center Section */}
            <div className="absolute top-0 left-[30%] items-center justify-center w-40 h-full lg:mx-auto">
              <img
                src={Image}
                alt="Logo"
                className="object-contain w-full h-full"
              />
            </div>

            {/* Right Section */}
            <div className="flex items-center lg:space-x-2 relative">
              <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
                <li>
                  <Link
                    to="/"
                    className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                  >
                    Home
                  </Link>
                </li>
                <li className="shrink-0">
                  <Link
                    to="/bestsellers"
                    className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                  >
                    Mais vendidos
                  </Link>
                </li>
                <li className="shrink-0">
                  <Link
                    to="/gift-ideas"
                    className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                  >
                    Gift Ideas
                  </Link>
                </li>
                <li className="shrink-0">
                  <Link
                    to="/todays-deals"
                    className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                  >
                    Today's Deals
                  </Link>
                </li>
                <li className="shrink-0">
                  <Link
                    to="/sell"
                    className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                  >
                    Sell
                  </Link>
                </li>
              </ul>

              <button
                id="userDropdown"
                type="button"
                className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-900 dark:text-white"
                onMouseOver={handleClickUser}
                onMouseOut={handleClickUser}
              >
                <span className="sr-only">Usuário</span>
                <svg
                  className="w-5 h-5 lg:me-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                  />
                </svg>
                <span className="hidden sm:flex">Usuário</span>
              </button>

              {showUserMenu && (
                <div
                  id="userDropdown"
                  className="absolute top-full right-0 z-10 mt-2 w-48 rounded-lg bg-white shadow-lg dark:bg-gray-800"
                >
                  {/* Dropdown Content */}
                  <div className="grid grid-cols-1 gap-4 p-4">
                    <div>
                      <Link
                        to="/orders"
                        className="text-sm font-semibold hover:underline text-gray-900 dark:text-white"
                      >
                        Meus Pedidos
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/account"
                        className="text-sm font-semibold hover:underline text-gray-900 dark:text-white"
                      >
                        Minha Conta
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
