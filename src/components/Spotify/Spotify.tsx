import React, { useContext, useState } from 'react';
import { AppContext } from 'core/context/context';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.module.scss';

const Spotify = () => {
    const { state } = useContext(AppContext);
    const [show, setShow] = useState<boolean>(false);

    if (!state.bootstrap.data?.spotify) {
        return null;
    }

    const onClick = (e: any) => {
        e.preventDefault();
        setShow(!show);
    };

    return (
        <>
            <div className={style.spotifyIcon} onClick={onClick}>
                <FontAwesomeIcon icon={faSpotify} size='3x' color="#23cf5f" />
            </div>
            <div style={{ display: show ? 'block' : 'none' }} className={style.spotifyBox}>
                <div>
                    <iframe src={state.bootstrap.data.spotify} frameBorder='0' width={300} height={400}
                            title='Spotify' />
                </div>
            </div>
        </>
    );
};

export default Spotify;