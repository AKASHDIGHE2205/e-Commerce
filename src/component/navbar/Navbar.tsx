import { FaSun, FaMoon } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/Store';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'default');
  const { isAuthenticated } = useSelector((state: RootState) => state.authslice);

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === 'night' ? 'light' : 'night'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const str1 = 'akash';

  const countDuplicates = (str: string) => {
    const charCount: any = {};

    for (let char of str) {
      charCount[char] = (charCount[char] || 0) + 1;
    }

    for (let char in charCount) {
      if (charCount[char] > 1) {
        console.log(`${char}: ${charCount[char]}`);
      }
    }
  };

  countDuplicates(str1);














  // supriya777msa @gmail.com














  return (
    <>
      {isAuthenticated && (
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <a className="btn btn-ghost text-xl">daisyUI</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><Link to='employee'>Employee</Link></li>
              <li>
                <details>
                  <summary>Parent</summary>
                  <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                  </ul>
                </details>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <div className="navbar-end flex items-center space-x-4">
            {/* Theme Toggle */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={theme === 'night'}
                onChange={handleThemeToggle}
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 dark:bg-gray-700 peer-checked:bg-blue-600 relative">
                <FaSun
                  className={`absolute left-1 top-1 text-yellow-500 transition-opacity duration-300 ${theme === 'night' ? 'opacity-0' : 'opacity-100'}`}
                  size={14}
                />
                <FaMoon
                  className={`absolute right-1 top-1 text-white transition-opacity duration-300 ${theme === 'night' ? 'opacity-100' : 'opacity-0'}`}
                  size={14}
                />
              </div>
            </label>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li><Link to='/log-out'>Logout</Link></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
