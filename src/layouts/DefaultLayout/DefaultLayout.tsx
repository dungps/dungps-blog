import React, { PropsWithChildren } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

const menus = [
    {
        to: '/blog',
        label: 'Blog',
    },
];

const DefaultLayout = ({ children, match }: PropsWithChildren<RouteComponentProps>) => {
    return (
        <>
            <header className='navbar navbar-expand-lg navbar-light bg-white'>
                <div className='container'>
                    <Link to='/' className='navbar-brand fade-page'>Kevin Pham</Link>
                    <button type='button' className='navbar-toggler'>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <nav id='site-navigation' className='collapse navbar-collapse'>
                        <button className='navbar-toggler'>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <ul className='ml-auto navbar-nav'>
                            {menus.map((m, k) => {
                                return (
                                    <li className={`nav-item ${m.to === match.path ? 'active' : ''}`} key={k}>
                                        <Link className='nav-link' to={m.to}>{m.label}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </header>
            <div className='main-content bg-gray-200'>
                {children}
            </div>
            <footer className='py-4 py-md-6 text-center'>
                <div className='container'>
                    <Link to="/" className="d-block mb-6">
                        Kevin Pham
                    </Link>
                    <p className="small text-gray-700 mb-2">Copyright © 2021 by Kevin Pham. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default DefaultLayout;