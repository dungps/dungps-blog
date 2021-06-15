import React, { PropsWithChildren, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from '../components';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';

const menus = [
    {
        to: '/blog',
        label: 'Blog',
        map: ['blog', 'post'],
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

interface Props {
    title?: string
}

const BrandLink = React.forwardRef<any, any>(({ children, ...rest }: any, ref: any) => {
    return (
        <a ref={ref} className='navbar-brand fade-page' {...rest}>
            {children}
        </a>
    );
});

const DefaultLayout = ({ children, title = 'Kevin Pham' }: PropsWithChildren<Props>) => {
    const [show, setShow] = useState<boolean>(false);

    const router = useRouter();

    const isMap = (data: string | Array<string>) => {
        if (Array.isArray(data)) {
            for (const mapData of data) {
                if (router.pathname.includes(mapData)) {
                    return true;
                }
            }

            return false;
        }

        return router.pathname.includes(data);
    };

    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <link rel='icon' href='/favicon.ico' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <meta
                    name='description'
                    content="A Kevin's website"
                />
                <title>{title}</title>
                <meta property='og:url' content='https://www.dungps.com' />
                <meta property='og:locale' content='vi_VN' />
                <meta property='og:type' content='website' />
                <meta property='og:description' content="A Kevin's website" />
                <meta
                    property='og:image'
                    content='og-img.jpg'
                />
                <meta property='og:site_name' content='Kevin Pham' />
            </Head>
            <header className='navbar navbar-expand-lg navbar-light bg-white'>
                <div className='container'>
                    <Link href='/' passHref>
                        <BrandLink>
                            Kevin Pham
                        </BrandLink>
                    </Link>
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
                                    <li className={`nav-item ${isMap(m.map) ? 'active' : ''}`} key={k}>
                                        <Link href={m.to} passHref>
                                            <NavLink>{m.label}</NavLink>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </header>
            <div className='main-content'>
                {children}
            </div>
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
        </>
    );
};

DefaultLayout.getInitialProps = async (ctx: NextPageContext) => {
    console.log(ctx);
    return {};
};

export default DefaultLayout;