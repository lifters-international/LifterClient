import React from 'react';
import "./ProfilePicture.css";

export type ProfilePictureType = {
    image?: string;
    alt?: string;
    imageClass?: string;
    containerClass?: string;
    onClick?: (event: any) => void;
}

export default class ProfilePicture extends React.Component<ProfilePictureType> {

    render() {
        return (
            <div className={`ProfilePicture ${this.props.containerClass || ""}`}
                onClick={this.props.onClick}
            >
                <img src={this.props.image} alt={ this.props.alt || "Profile"} className={`ProfilePictureImage ${this.props.imageClass || "" }`}/>
            </div>
        )
    }
}