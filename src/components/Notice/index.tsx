import React from 'react';
import "./Notice.css";

export type NoticeProps = {
    message: string;
    onClose: () => void;
}

const Notice: React.FC<NoticeProps> = (props: NoticeProps) => {
    const ref = React.useRef<HTMLDivElement>(null);  
    return (
        <div ref={ref} className="notice">
            <button className="notice-close" type="button" onClick={() => {
                ref.current?.remove();
                props.onClose()
            }}>X</button>
            <div className="notice-content">{props.message}</div>
        </div>
    )
}

export default Notice;