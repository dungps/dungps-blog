import React, { useEffect, useState } from 'react';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './Spotify.module.css';

interface Props {
    spotify?: string | null
}

const Spotify = ({ spotify }: Props) => {
    const [show, setShow] = useState<boolean>(false);

    if (!spotify) {
        return null;
    }

    const onClick = (e: any) => {
        e.preventDefault();
        setShow(!show);
    };

    const close = () => {
        if (show) setShow(false)
    }

    useEffect(() => {
        document.body.addEventListener('click', close)

        return () => {
            document.body.removeEventListener('click', close)
        }
    })

    return (
        <>
            <div className={style.spotifyIcon} onClick={onClick}>
                <FontAwesomeIcon icon={faSpotify} size='3x' color='#23cf5f' width={52} height={52} />
            </div>
            <div style={{ display: show ? 'block' : 'none' }} className={style.spotifyBox}>
                <div>
                    <iframe src={spotify} frameBorder='0' width={300} height={400}
                            title='Spotify' allow='encrypted-media' />
                </div>
            </div>
        </>
    );
};

export default Spotify;