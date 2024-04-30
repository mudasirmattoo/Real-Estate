import { useState } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='bg-black sticky top-0 p-2 sm:p-5 opacity-95 mx-auto shadow-lg shadow-violet-600'>
      <div className='flex justify-between items-center relative'>
        <Link to="/">
        <h1 className='text-xl sm:text-5xl font-bold sm:font-extrabold'>
          <span className='text-violet-600'>Urban</span>
          <span className='text-violet-400'>Nest</span>
        </h1>
        </Link>
        <form className='bg-gray-800 rounded-lg p-3 flex items-center'>
          <input type='text' placeholder='Search ...' className='bg-transparent outline-none text-white w-44 sm:w-96' />
          <FaSearch className='text-violet-600' />
        </form>
        <div className="sm:hidden">
          <FaBars className="text-violet-600 font-bold text-2xl cursor-pointer" onClick={toggleMenu} />
          {isMenuOpen && (
            <ul className="absolute bg-black text-violet-600 font-bold py-2 px-4 rounded-b-lg right-0 mt-5 w-full opacity-90">
               <Link to='/'><li className="text-right">Home</li></Link>
              <Link to ='/about'><li className="text-right">About</li></Link>
              <Link to='/sign-in'><li className="text-right">Sign In</li></Link>
            </ul>
          )}
        </div>
        <ul className="hidden sm:flex space-x-10 text-2xl text-violet-600 ">
          <Link to='/'><li className='hover:text-violet-300'>Home</li></Link>
          <Link to='/about'><li className='hover:text-violet-300'>About</li></Link>
          <Link to='/sign-in'><li className='hover:text-violet-300'>Sign In</li></Link>
        </ul>
      </div>
    </header>
  )
}
