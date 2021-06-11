import React, { PropsWithChildren, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Spotify } from 'components';

const menus = [
    {
        to: '/blog',
        label: 'Blog',
    },
];

const socialLinks = [
    {
        to: 'https://www.facebook.com/oryc9x',
        icon: faFacebook,
    },
    {
        to: 'https://www.linkedin.com/in/kevinpham93',
        icon: faLinkedin,
    },
    {
        to: 'https://www.instagram.com/write.something.for.me',
        icon: faInstagram,
    },
    {
        to: 'mailto:hi@dungps.com',
        icon: faEnvelope,
    },
];

const DefaultLayout = ({ children, match }: PropsWithChildren<RouteComponentProps>) => {
    const [show, setShow] = useState<boolean>(false)

    return (
        <>
            <header className='navbar navbar-expand-lg navbar-light bg-white'>
                <div className='container'>
                    <Link to='/' className='navbar-brand fade-page'>Kevin Pham</Link>
                    <button type='button' className='navbar-toggler' onClick={() => setShow(!show)}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <nav id='site-navigation' className={`collapse navbar-collapse ${show ? 'show' : ''}`}>
                        <button className='navbar-toggler' onClick={() => setShow(!show)}>
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
                    <div className='d-flex justify-content-between'>
                        <p className='small text-gray-700 mb-2'>© 2021 by Kevin Pham</p>
                        <ul className='list-inline'>
                            {socialLinks.map((m, k) => {
                                return (
                                    <li className={`list-inline-item`} key={k}>
                                        <a className='nav-link text-dark' href={m.to} target='_blank' rel='noreferrer'>
                                            <FontAwesomeIcon icon={m.icon} size="lg" />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </footer>
            <Spotify />
        </>
    );
};

export default DefaultLayout;