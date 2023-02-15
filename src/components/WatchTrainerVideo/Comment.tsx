import React, { useRef, useState } from 'react';
import { getDiff, shortenNumber, WatchTrainerVideoV401Comments } from '../../utils';

type Props = { 
    allowComments: boolean; 
    profilePicture: string; 
    askForChildren?: ( originalAncestor: string ) => void; 
    removeChildren?: ( originalAncestor: string ) => void;
    postComment: ( text: string, parentId?: string ) => void;
} & WatchTrainerVideoV401Comments;

export const Comment: React.FC<Props> = ({ id, comment, updatedAt, allowComments, profilePicture, removeChildren, askForChildren, children, childrenCount, whoCreatedName, whoCreatedProfilePicture, parentId, postComment }) => {
    let date = new Date(new Date(updatedAt).toLocaleString());

    const [replying, setReplying] = useState(false);

    const [text, setText] = useState("");

    const textRef = useRef<HTMLTextAreaElement>(null);

    const [ childOpen, setChildOpen ] = useState(false);

    const toggle = () => {
        if (replying) {
            textRef.current!.value = "";
            setText("");
        }

        setReplying(!replying);
    }

    const toggelChildren = () => {
        if ( childOpen ) {
            removeChildren!(id);
        }else {
            askForChildren!(id)
        }

        setChildOpen(!childOpen);
    }

    return (
        <div className="comment">
            <img alt="profile" className="profile-pic" src={whoCreatedProfilePicture} />

            <div className="det">
                <div className="name-date">
                    <div className="name">{whoCreatedName}</div>
                    <div className="date">&nbsp; {getDiff(date, new Date(new Date().toLocaleString()))} ago </div>
                </div>

                <div className="com">
                    <div className="main-com">{comment}</div>

                    <div className="comment-children">
                        <div className="childrenDesc">

                            {
                                childrenCount > 0 && <div className="childrenCount button" onClick={toggelChildren}>{shortenNumber(childrenCount)} replies</div>
                            }

                            {
                                !replying && <div onClick={toggle} className="replyToComment button">Reply</div>
                            }
                        </div>

                        <div className="createChild">
                            {
                                (replying && allowComments) && (
                                    (
                                        <div className="post-comment">
                                            <div className="comment-input">
                                                <img className="profile-pic" alt="profile" src={profilePicture} />
                                                <textarea placeholder="Add a comment" defaultValue="" onChange={
                                                    (e) => {
                                                        setText(e.target.value)
                                                    }
                                                } ref={textRef} />
                                            </div>

                                            <div className="comment-buttons">
                                                <button
                                                    type="button"
                                                    className="cancel"
                                                    onClick={toggle}
                                                >Cancel</button>
                                                <button type="button" className="comment" onClick={
                                                    () => {
                                                        if (text.length > 0) {
                                                            postComment(text, parentId || id );
                                                            toggle()
                                                        }
                                                    }
                                                }>Comment</button>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>

                        <div className="children-container">
                            {
                                children?.map( (child, index) => ( <Comment {...child} allowComments={allowComments} profilePicture={profilePicture} childrenCount={0} children={[]} postComment={postComment} key={`com-child${index}`}/> ))
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
