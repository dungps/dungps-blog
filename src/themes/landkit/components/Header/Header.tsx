import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Link } from '@core/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { isMap } from '@core/utils/common';

export const menus = [
    {
        to: '/blog',
        label: 'Blog',
        map: ['blog', 'post'],
    },
    {
        to: '/about',
        label: 'About me',
        map: ['about'],
    },
];

const Header = () => {
    const [show, setShow] = useState<boolean>(false);

    const router = useRouter();

    return (
        <header className='navbar navbar-expand-lg navbar-light bg-white'>
            <div className='container'>
                <Link href='/' className='navbar-brand fade-page'>Kevin Pham</Link>
                <button className='navbar-toggler' onClick={() => setShow(!show)}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <nav className={`collapse navbar-collapse ${show ? 'show' : ''}`}>
                    <button className='navbar-toggler' onClick={() => setShow(false)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <ul className='ml-auto navbar-nav'>
                        {menus.map((m, k) => (
                            <li className={`nav-item ${isMap(router.asPath, m.map) ? 'active' : ''}`} key={k}>
                                <Link href={m.to} className='nav-link'>{m.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;