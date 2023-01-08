import React from "react";
import { GraphqlError } from "../../utils";
import "./Error.css";

type ErrorProps = {
    reload?: boolean;
} & GraphqlError | {
    message: string;
    reload?: boolean;
};

const Error: React.FC<ErrorProps> = (props: ErrorProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    return (
        <div ref={ref} className="error">
            <button className="error-close" type="button" onClick={() => {
                ref.current?.remove();
                if (props.reload) window.location.reload();
            }}>X</button>
            <div className="error-content">{props.message}</div>
        </div>
    )
}

Error.defaultProps = {
    reload: true
}

export default Error;