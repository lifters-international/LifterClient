import React from "react";
import { CheckCircleFilled, CloseCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import "./Notify.css";

export type NotifyStateManagerType = "success" | "error" | "info";

export type NotifyStateManager = {
    show: boolean;
    message: string;
    type: NotifyStateManagerType;
}

type NotifyProps = {
    show: boolean;
    message: string;
    type: NotifyStateManagerType;
    hideNotify: () => void;
}

const Notify: React.FC<NotifyProps> = ( { show, message, type, hideNotify }: NotifyProps ) => {
    const [seconds, setSeconds] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (seconds >= 4) {
                setSeconds(0);
                
                hideNotify();
            }
            else if (show) {
                setSeconds(seconds + 1);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        }

    });

    return (
        <>
            {
                show ?
                (
                    <div className="Notify">
                        {
                            type === "success" ? <CheckCircleFilled style={{color:"#52c41a"}}/>
                            : type === "error" ? <CloseCircleOutlined style={{color:"#f5222d"}}/>
                            : <ExclamationCircleOutlined style={{color:"#1890ff"}}/>
                        }
                        <div className="NotifyMessage">{message}</div>
                    </div>

                ) : null
            }
        </>
    )
}


export default Notify;