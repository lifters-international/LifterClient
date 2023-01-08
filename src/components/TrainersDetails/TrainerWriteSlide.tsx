import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import { LabelInputDiv } from "../LabelInputDiv";
import { RegisterButton } from "../RegisterButton";
import Loading from "../Loading";

import ReactStar from "react-rating-stars-component";

import { createTrainerRating } from "../../graphQlQuieries";
import { fetchGraphQl } from "../../utils";

export type Prop = {
    token: string;
    name: string;
    trainerId: string;
}

export const TrainerWriteSlide: React.FC<Prop> = ({ token, name, trainerId }) => {
    const location = useLocation();
    const [state, setState] = useState<{ rating: number, comment: string }>({ rating: 5, comment: '' });
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    if ( loading ) return <Loading />

    return (
        <div className="FormContainer TrainerWriteSlide">
            <h1>Write A Review for {name}</h1>
            <h1>{error}</h1>
            <LabelInputDiv>
                <ReactStar
                    value={5}
                    edit={true}
                    className="stars"
                    onChange={
                        (rate: number) => setState({ ...state, rating: rate })
                    }
                />
                <textarea placeholder="Your Review" name="statement" onChange={
                    (e) => {
                        setState({
                            ...state,
                            comment: e.target.value
                        })
                    }
                } />
            </LabelInputDiv>

            <RegisterButton title="Submit Review" onClick={() => {
                setLoading(true);
                fetchGraphQl(createTrainerRating, { ...state, trainerId, token })
                .then(req => {
                    setLoading(false);

                    if ( req.errors ) setError("Problem Submitting Review");
                    else {
                        if ( location.search === `?&show=reviews` ) navigate(0);
                        else navigate(`/trainer/${trainerId}?&show=reviews`, { replace: true });
                    }
                })
            }} />
        </div>
    )
}
