import React from 'react';
import Loading from "../Loading";
import NavBar from "../NavBar";
import { useSessionHandler, useSignInUserData, useSaveUserProfileChanges } from '../../hooks';
import { fetchGraphQl, userInformationToSave, userPasswordUpdateProps, getImageUploadApi, getServerUrl } from '../../utils';
import { updateUserInformationMutation } from "../../graphQlQuieries";
import { updateUserPassword } from "../../graphQlQuieries";
import { Navigate, useNavigate } from 'react-router-dom';
import Notify, { NotifyStateManager, NotifyStateManagerType } from "../Notify";
import Error from '../Error';
import Modal from '../Modal';
import "./Profile.css";

const Profile: React.FC = () => {
    const authentication = useSessionHandler();
    const signedInUser = useSignInUserData(authentication.token!);
    const saveUserData = useSaveUserProfileChanges();
    const [userData, setUserData] = React.useState<userInformationToSave>();
    const [showChangePassword, setShowChangePassword] = React.useState(false);
    const [ passwords, setPasswords ] = React.useState<userPasswordUpdateProps>();
    const [ notify, setNotify ] = React.useState<NotifyStateManager>({ show: false, message: "", type: "success" });
    const imageInputRef = React.useRef<HTMLInputElement>(null);
    const imageContainerRef = React.useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleChangePasswordShow = () => {
        setShowChangePassword(true);
    }

    const handleChangePasswordOk = () => {
        fetchGraphQl(updateUserPassword, {
            token: authentication.token!,
            ...passwords
        }).then( response => {
            let type: NotifyStateManagerType = "success";
            let message = "";

            if ( response.data ) {
                message = "Your password has been updated successfully";
            } else {
                type = "error";
                message = "An error occurred while updating your password, please try again.";
            }

            setNotify({ type, show: true, message });
            setShowChangePassword(false);
        })
    };

    const saveProfileImage = async (newImage: string) => {
        await fetchGraphQl(updateUserInformationMutation, { 
            token: authentication.token!,
            userInfor: {
                profilePicture: newImage
            }
        });
    }

    const handleChangePasswordCancel = () => {
        setShowChangePassword(false);
    }

    const handleInputImageChange = async () => {
        if ( imageInputRef.current ) {
            const form = new FormData();
            const image = imageInputRef.current.files![0];

            if (image) {
                form.append("image", image);
                form.append("token", authentication.token!);
                const req = await fetch(getImageUploadApi(), {
                    method: "POST",
                    body: form
                });

                let result = await req.json();

                let type: NotifyStateManagerType = "success";
                let message = "";

                if ( result.error ) {
                    type = "error";
                    message = "There was a problem uploading a new profile image please try again later.";
                }

                if ( result.url ) {
                    message = "Your profile image has been updated successfully";
                }

                setNotify({ type, show: true, message });
                if (imageContainerRef.current && result.url ) {
                    imageContainerRef.current.style.backgroundImage = result.url;
                    await saveProfileImage(result.url);
                }
            }
        }
    }

    if ( authentication.loading ) return <Loading />;

    if (authentication.error) {
        if (
            authentication.error[0].message === "jwt malformed"
            || 
            authentication.error[0].extensions.code === "BAD_USER_INPUT"
            || 
            authentication.error[0].message === "jwt expired"
        ) return <Navigate to="/logIn" />;
        else return <Error {...authentication.error[0]} reload={true} />;
    }

    if ( signedInUser.loading ) return <Loading />;
    
    if (signedInUser.error) return <Error {...signedInUser.error[0]} reload={true} />;

    return (
        <>
            <NavBar token={authentication.token!} />
            <div>
                <div className="EditProfilePicture" style={{ backgroundImage: `url(${signedInUser.data!.profilePicture})` }} ref={imageContainerRef}>
                    <button className="EditProfilePictureButton" type="button" onClick={ () => imageInputRef.current?.click() }>
                        Upload New Profile Picture
                        <input type="file" accept=".png, .jpeg, .jpg, .svg" ref={imageInputRef} name="image" style={{display: "none" }} onChange={handleInputImageChange} title="imageInput"/>
                    </button>
                </div>

                <div className="EditProfile">
                    <div className="EditProfileTitle"> Edit Profile: </div>

                    <div className="EditProfileButtons">
                        <button className="EditProfileButton"
                            type="button"
                            onClick={
                                () => {
                                    saveUserData.save({
                                        token: authentication.token!,
                                        userInfor: userData || {}
                                    })
                                }
                            }
                        >
                            {
                                saveUserData.isSaving ? "Saving..." : saveUserData.saveSuccessfully ? "Saved Succesfully" : "Save Changes"
                            }
                        </button>
                        <button className="EditProfileButton" type="button" onClick={handleChangePasswordShow}>Change Password</button>
                        <button className="EditProfileButton" type="button" onClick={ () => navigate("/preview") }>Preview</button>
                        <button className="EditProfileButton" type="button" onClick={ () => {
                            localStorage.removeItem("token");
                            navigate("/logIn");
                        } }>
                            Log Out
                        </button>
                    </div>

                    <div className="EditProfileInputJoin">
                        <div className="EditProfileInput">
                            <label className="EditProfileInputTitle" htmlFor="name"> Name </label>
                            <input className="EditProfileInputField" type="text" title="name" defaultValue={signedInUser.data!.username} onChange={
                                (e) => {
                                    setUserData({
                                        ...userData,
                                        username: e.target.value
                                    })
                                }
                            }
                            />
                        </div>

                        <div className="EditProfileInput">
                            <label className="EditProfileInputTitle" htmlFor="email"> Email Address </label>
                            <input className="EditProfileInputField" type="text" title="email" defaultValue={signedInUser.data!.email} onChange={
                                (e) => {
                                    setUserData({
                                        ...userData,
                                        email: e.target.value
                                    })
                                }
                            }
                            />
                        </div>
                    </div>

                    <div className="EditProfileInputJoin">
                        <div className="EditProfileInput">
                            <label className="EditProfileInputTitle" htmlFor="gender"> Gender </label>
                            <input className="EditProfileInputField" type="text" title="gender" defaultValue={signedInUser.data!.gender} onChange={
                                (e) => {
                                    setUserData({
                                        ...userData,
                                        gender: e.target.value
                                    })
                                }
                            }
                            />
                        </div>

                        <div className="EditProfileInput">
                            <label className="EditProfileInputTitle" htmlFor="genderP"> Gender Of Preference </label>
                            <input className="EditProfileInputField" type="text" title="genderP" defaultValue={signedInUser.data!.genderOfPrefense} onChange={
                                (e) => {
                                    setUserData({
                                        ...userData,
                                        genderOfPrefense: e.target.value
                                    })
                                }
                            }
                            />
                        </div>
                    </div>

                    <div className="EditProfileInputJoin">
                        <div className="EditProfileInput">
                            <label className="EditProfileInputTitle" htmlFor="age"> Age </label>
                            <input className="EditProfileInputField" type="number" title="age" defaultValue={signedInUser.data!.age} onChange={
                                (e) => {
                                    setUserData({
                                        ...userData,
                                        age: parseInt(e.target.value)
                                    })
                                }
                            }
                            />
                        </div>

                        <div className="EditProfileInput">
                            <label className="EditProfileInputTitle" htmlFor="homeGym"> Home Gym Location </label>
                            <input className="EditProfileInputField" type="text" title="homeGym" defaultValue={signedInUser.data!.homeGymLocation} onChange={
                                (e) => {
                                    setUserData({
                                        ...userData,
                                        homeGymLocation: e.target.value
                                    })
                                }
                            }
                            />
                        </div>
                    </div>

                    <div className="EditProfileBio">
                        <label className="EditProfileInputTitle" htmlFor="bio"> Bio </label>
                        <input className="EditProfileInputBio" type="text" title="bio" defaultValue={signedInUser.data!.bio} onChange={
                            (e) => {
                                setUserData({
                                    ...userData,
                                    bio: e.target.value
                                })
                            }
                        }
                        />
                    </div>
                </div>
            </div>
            <Modal title="Change Password" visible={showChangePassword} onOk={handleChangePasswordOk} onCancel={handleChangePasswordCancel} >
                <div className="EditProfileInputJoin ChangePasswordModal">
                    <div className="EditProfileInput">
                        <label className="EditProfileInputTitle" htmlFor="cPassword"> Current Password </label>
                        <input className="EditProfileInputField" type="password" title="cPassword" placeholder="Current Password"
                            onChange={
                                (e) => {
                                    setPasswords({
                                        ...passwords,
                                        oldPassword: e.target.value
                                    })
                                }
                            }
                        />
                    </div>

                    <div className="EditProfileInput">
                        <label className="EditProfileInputTitle" htmlFor="nPassword"> New Password </label>
                        <input className="EditProfileInputField" type="password" title="nPassword" placeholder="New Password"
                            onChange={
                                (e) => {
                                    setPasswords({
                                        ...passwords,
                                        newPassword: e.target.value
                                    })
                                }
                            }
                        />
                    </div>
                </div>
            </Modal>
            <Notify 
                {...notify} 
                hideNotify={ () => setNotify({...notify, show: false}) }
            />
        </>
    )
}

export default Profile;
