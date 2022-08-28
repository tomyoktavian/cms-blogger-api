import React from 'react'
import Link from "next/link";

type Props = {}

const Navbar = (props: Props) => {
  return (
    <>
      <div className="px-3 max-w-screen-xl py-3 mx-auto min-h-[250px]">
        <nav className="relative flex flex-wrap items-center justify-between py-6 mx-auto lg:justify-between">
          <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
            Logo
            <button aria-label="Toggle Menu" className="px-2 py-1 ml-auto text-gray-700 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-50 focus:outline-none " id="headlessui-disclosure-button-123" type="button" aria-expanded="false">
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              </svg>
            </button>
          </div>
          <div className="hidden text-center lg:flex lg:items-center">
            <ul className="items-center justify-end flex-1 pt-6 lg:pt-0 list-reset lg:flex">
              <div>
                <Link href="/">
                  <a className="text-gray-700 dark:text-gray-300 rounded-md outline-none hover:text-indigo-500 focus:text-indigo-500  transition-all focus-visible:ring-1 ring-indigo-300 dark:focus-visible:bg-gray-800 focus:outline-none inline-block px-4 py-2">
                    Home
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/post">
                  <a className="text-gray-700 dark:text-gray-300 rounded-md outline-none hover:text-indigo-500 focus:text-indigo-500  transition-all focus-visible:ring-1 ring-indigo-300 dark:focus-visible:bg-gray-800 focus:outline-none inline-block px-4 py-2">
                    post
                  </a>
                </Link>
              </div>
              <div>
                <div className="relative text-left">
                  <button className="flex items-center gap-x-1 transition-all rounded-md outline-none focus:outline-none focus-visible:ring-1  focus-visible:text-indigo-500 dark:focus-visible:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-indigo-500 inline-block px-4 py-2" id="headlessui-menu-button-125" type="button" aria-haspopup="true" aria-expanded="false">
                    <span>Dropdown</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-4 h-4">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </ul>
            <div className="hidden mx-3 gap-3 lg:flex">
              <a className="px-5 py-1.5 text-gray-500 border border-gray-400 rounded-md font-medium hover:border-gray-700" href="/#">Login</a>
              <a className="px-5 py-1.5 text-white bg-indigo-900 rounded-md font-medium" href="/#">Register</a>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar