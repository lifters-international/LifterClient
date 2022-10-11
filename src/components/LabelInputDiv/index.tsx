import React from 'react';

import "./index.css"

type Props = {
    children?: React.ReactNode | React.ReactNode[];
}

export const LabelInputDiv: React.FC<Props> = ({ children }) => {
    return (
        <div className="Label-Input-Div">
            {children}
        </div>
    )
}