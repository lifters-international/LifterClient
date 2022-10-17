import React, { useState } from 'react';

import { useIsMobile } from '../../hooks';

import "./index.css"

const MobileWarning: React.FC = () => {
    const isMobile = useIsMobile();
    const [isDismissed, setIsDismissed] = useState(false);

    if (!isMobile) return <></>;

    else return (
        <>
            {
                !isDismissed ? (
                    <div className="MobileWarning" onClick={() => setIsDismissed(true)}>
                        <div className="MobileWarning-div">
                            Our Site Is Not Mobile Friendly, Please Switch To A Desktop Device To View Our Site.
                        </div>
                    </div>
                ) : null
            }
        </>
    );
};

export default MobileWarning;
