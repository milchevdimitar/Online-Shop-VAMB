import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("darkMode")) || false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("darkMode", JSON.stringify(darkMode));
        }
        document.body.className = darkMode ? "dark" : "light";
    }, [darkMode]);

    const getAsset = (assetName) => (darkMode ? assets[assetName].dark : assets[assetName].light);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    };

    return (
        <div className={`flex items-center justify-between py-5 font-medium ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}>
            {/* Лого */}
            <Link to='/'>
                <img src={getAsset('logo')} className='w-36' alt="Logo" />
            </Link>

            <ul className='hidden sm:flex gap-5 text-sm'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>НАЧАЛО</p>
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>ПРОДУКТИ</p>
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ЗА НАС</p>
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>КОНТАКТИ</p>
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                {/* Смяна на тема */}
                <button 
                    onClick={() => {
                        setDarkMode(!darkMode);
                        window.location.reload(); 
                    }} 
                    className='p-2 bg-gray-200 rounded-full dark:bg-gray-700'
                    >
                    {darkMode ? "☀️" : "🌙"} 
                </button>

                {/* Икона за търсене */}
                <img onClick={() => { setShowSearch(true); navigate('/collection'); }} 
                    src={getAsset('search_icon')} className='w-5 cursor-pointer' alt="Search" />

                {/* Икона за профил */}
                <div className='group relative'>
                    <img onClick={() => token ? null : navigate('/login')} className='w-5 cursor-pointer' 
                        src={getAsset('profile_icon')} alt="Profile" />
                    {token && (
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>ПОРЪЧКИ</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>ИЗХОД</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Икона за количка */}
                <Link to='/cart' className='relative'>
                    <img src={getAsset('cart_icon')} className='w-5 min-w-5' alt="Cart" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </Link>

                {/* Меню */}
                <img onClick={() => setVisible(true)} src={getAsset('menu_icon')} className='w-5 cursor-pointer sm:hidden' alt="Menu" />
            </div>

            {/* Скрито меню */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={getAsset('dropdown_icon')} alt="Back" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>НАЧАЛО</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>ПРОДУКТИ</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ЗА НАС</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>КОНТАКТИ</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
