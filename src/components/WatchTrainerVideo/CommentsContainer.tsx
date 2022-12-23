import React, { useState, useRef } from "react";

import { shortenNumber, getDiff } from "../../utils";

export type Props = {
    comments: {
        id: string;
        comment: string;
        whoCreatedId: string;
        whoCreatedType: "lifters" | "trainers";
        whoCreatedName: string;
        whoCreatedProfilePicture: string;
        updatedAt: number;
    }[];

    profilePicture: string;

    postComment: (comment: string) => void;
}

export const CommentsContainer: React.FC<Props> = ({ comments, profilePicture, postComment }) => {
    const [text, setText] = useState("");
    const textRef = useRef<HTMLTextAreaElement>(null);
    const [showAll, setShowAll] = useState(false);

    return (
        <div className="comments">
            <div className="comment-count">{shortenNumber(comments.length)} Comments</div>

            <div className="post-comment">
                <div className="comment-input">
                    <img className="profile-pic" alt="profile" src={"/defaultPicture.png"} />
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
                            console.log(text, text.length)
                            if (text.length > 0) {
                                postComment(text);
                                setText("");
                                textRef.current!.value = "";
                            }
                        }
                    }>Comment</button>
                </div>
            </div>

            <div className="comments-container">
                {
                    ( showAll || comments.length < 20 ? comments : comments.slice(0, 20) ).map((comment, index) => {
                        let date = new Date(new Date(comment.updatedAt!).toLocaleString());

                        return (
                            <div className="comment" key={index}>
                                <img alt="profile" className="profile-pic" src={"/defaultPicture.png"}/>

                                <div className="det">
                                    <div className="name-date">
                                        <div className="name">{comment.whoCreatedName}</div>
                                        <div className="date">&nbsp; {getDiff(date, new Date(new Date().toLocaleString()))} ago </div>
                                    </div>

                                    <div className="com">{comment.comment}</div>
                                </div>
                            </div>
                        )
                    })
                }

                {
                    comments.length > 20 ? 
                        showAll ? <div className='showmore' onClick={ () => setShowAll(false) }>Show Less</div>
                        : <div className='showmore' onClick={ () => setShowAll(true) }>Show {comments.length - 20} more</div>
                    : null
                }
            </div>
        </div>
    )
}
