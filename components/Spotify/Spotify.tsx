import React, { useState } from 'react';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../../styles/modules/Spotify.module.css';

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

    return (
        <>
            <div className={style.spotifyIcon} onClick={onClick}>
                <FontAwesomeIcon icon={faSpotify} size='3x' color='#23cf5f' width={52} height={52} />
            </div>
            <div style={{ display: show ? 'block' : 'none' }} className={style.spotifyBox}>
                <div>
                    <iframe src={spotify} frameBorder='0' width={300} height={400}
                            title='Spotify' />
                </div>
            </div>
        </>
    );
};

export default Spotify;