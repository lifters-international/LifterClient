import React from "react";
import { Card } from "antd";
import "./Modal.css";

export type ModalProps = {
    title: string;
    visible: boolean;
    onCancel: () => void;
    onOk: () => void;
    children?: React.ReactNode;
    className?: string;
}

const Modal: React.FC<ModalProps> = ( props: ModalProps) => {
    return (
        <Card 
            className={"Modal " + (props.visible ? "Modalvisible" : "Modalhidden")} 
            onClick={ (event: any) => {
                if (event.target.classList.length > 1 && event.target.classList.contains("Modal")) {
                    props.onCancel();
                }
            }} 
        >
            <div className="ModalContainer">
                <div className="ModalTitleContainer">
                    <div className="ModalTitleContainerTitle">{props.title}</div>
                    <div className="ModalTitleContainerClose" onClick={props.onCancel}>X</div>
                </div>
                <div className={`ModalContentContainer ${props.className || ""}`}>
                    {props.children}
                </div>
                <div className="ModalButtonsContainer">
                    <div className="ModalButtonContainerCancel" onClick={props.onCancel}>Cancel</div>
                    <div className="ModalButtonContainerOk" onClick={props.onOk}>Ok</div>
                </div>
            </div>
        </Card>   
    );
}

export default Modal;