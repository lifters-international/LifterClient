import React, { useState, useRef } from "react";

import { shortenNumber, WatchTrainerVideoV401Comments } from "../../utils";
import { Comment } from "./Comment";

export type Props = {
    comments: WatchTrainerVideoV401Comments[];

    profilePicture: string;

    postComment: (comment: string, parentId?: string) => void;

    askForChildren: ( originalAncestor: string ) => void;

    removeChildren: ( originalAncestor: string ) => void;

    allowComments: boolean;
}

export const CommentsContainer: React.FC<Props> = ({ comments, profilePicture, postComment, allowComments, askForChildren, removeChildren }) => {
    const [text, setText] = useState("");
    const textRef = useRef<HTMLTextAreaElement>(null);
    const [showAll, setShowAll] = useState(false);

    return (
        <div className="comments">
            <div className="comment-count">{
                shortenNumber(
                    comments.map(( v ) => v.childrenCount + 1 ).reduce( (a, b) => a + b ) 
                ) 
            } Comments</div>

            {
                allowComments && (
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
                                onClick={
                                    () => {
                                        setText("");
                                        textRef.current!.value = ""
                                    }
                                }
                            >Cancel</button>
                            <button type="button" className="comment" onClick={
                                () => {
                                    if (text.length > 0) {
                                        postComment(text);
                                        setText("");
                                        textRef.current!.value = "";
                                    }
                                }
                            }>Comment</button>
                        </div>
                    </div>
                )
            }

            <div className="comments-container">
                {
                    (showAll || comments.length < 20 ? comments : comments.slice(0, 20)).map((comment, index) => {
                        return <Comment {...comment} profilePicture={profilePicture} allowComments={allowComments} askForChildren={askForChildren} removeChildren={removeChildren} key={`comment-${index}`} postComment={postComment}/>;
                    })
                }

                {
                    comments.length > 20 ?
                        showAll ? <div className='showmore' onClick={() => setShowAll(false)}>Show Less</div>
                            : <div className='showmore' onClick={() => setShowAll(true)}>Show {comments.length - 20} more</div>
                        : null
                }
            </div>
        </div>
    )
}
