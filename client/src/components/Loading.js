import React from 'react';

import propeller from '../static/client/propeller.png';

const Loading = () => {
    return (
        <div>
            <img src={propeller} alt="loading" className="loadingAnimation" />
        </div>
    )
}

export default Loading;
