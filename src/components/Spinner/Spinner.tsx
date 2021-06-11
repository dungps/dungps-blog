import React from 'react';
import * as Spin from 'react-spinners';

type LoaderType = 'BounceLoader' | 'ClimbingBoxLoader' | 'DotLoader' | 'HashLoader' | 'PropagateLoader' | 'PuffLoader' |
    'RingLoader'

interface Props {
    style?: React.CSSProperties
    type?: LoaderType
    size?: number
}

const Spinner = ({ style, type, size = 60 }: Props) => {
    let Component = Spin.BounceLoader;

    if (type) {
        Component = Spin[type];
    }

    return (
        <div style={style}>
            <Component size={size} loading color='#152e4d' />
        </div>
    );
};

export default Spinner;