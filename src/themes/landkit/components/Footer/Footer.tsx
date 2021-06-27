import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

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

const Footer = () => {
    return (
        <footer className='py-4 py-md-6 text-center'>
            <div className='container'>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='small text-gray-700 mb-2'>© 2021 by Kevin Pham</p>
                    <ul className='list-inline'>
                        {socialLinks.map((m, k) => {
                            return (
                                <li className={`list-inline-item`} key={k}>
                                    <a className='nav-link text-dark' href={m.to} target='_blank' rel='noreferrer'>
                                        <FontAwesomeIcon icon={m.icon} size='lg' width={18} height={18}
                                                         color='#000000' />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
