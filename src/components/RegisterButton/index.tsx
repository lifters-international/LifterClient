import React from 'react';

import "./index.css";

type Props = {
    title: string;
    onClick?: () => void;
}

export const RegisterButton: React.FC<Props> = ({ title, onClick }) => {
    return (
        <div>
            <button type="button" className="register-button" onClick={onClick}>{title}</button>
        </div>
    )
}