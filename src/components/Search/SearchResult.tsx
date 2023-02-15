import React from 'react';
import { useSearchQuery, useAcceptDeclineMatch } from '../../hooks';
import { HeartFilled } from '@ant-design/icons';
import Loading from '../Loading';
import ProfilePicture from "../ProfilePicture";
import TrainersDetails from '../TrainersDetails';
import TrainersCard from '../TrainersCard';

export type SearchResultProps = {
    query: string;
    token: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ query, token }: SearchResultProps) => {
    const queryResult = useSearchQuery(query, token);
    const acceptDecline = useAcceptDeclineMatch();

    const acceptMatch = async (accept: boolean, id: string) => {
        acceptDecline.acceptDecline(token, id, accept)
    }

    if (queryResult.loading) return <Loading />;

    const shortText = (text: string, length = 60) => {
        return text.slice(0, length) + ((text.length) >= length ? "..." : "");
    }

    let showDiv = queryResult.result ? true : false;

    if (showDiv) showDiv = queryResult.result!.length > 0 ? true : false;

    return (
        <div>
            <h1>Search Result</h1>
            {
                showDiv ?
                    (
                        <div className="SearchResultVisualDiv">
                            {
                                queryResult.result?.map((result, index) => {
                                    return (
                                        <>
                                            {
                                                result.type === "lifters" ? (
                                                    <div key={`user-search-result-${index}`} className={`UserSearchResult`}>
                                                        <ProfilePicture image={result.lifters?.profilePicture} alt={`${result.lifters?.username}-profilePicture`} imageClass="ProfilePicture" />
                                                        <div className="name center">{result.lifters?.username}</div>
                                                        <div className="bio center" title={result.lifters?.bio}>{shortText(result.lifters?.bio || "")}</div>
                                                        <div className="homeGym center">{result.lifters?.homeGymLocation}</div>
                                                        <div className="X centerB" onClick={() => acceptMatch(false, result.lifters?.id || "" )} >X</div>
                                                        <div className="Heart centerB" onClick={() => acceptMatch(true, result.lifters?.id || "")} >
                                                            <HeartFilled twoToneColor="#eb2f96" style={
                                                                {
                                                                    verticalAlign: 'middle'
                                                                }
                                                            } />
                                                        </div>
                                                    </div>
                                                ) : <TrainersCard {...result.trianer!} />
                                            }
                                        </>
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <div className="SearchResultVisualDiv">
                            <div className="NoSearchResult">No Users Found</div>
                        </div>
                    )
            }
        </div>
    );

};

export default SearchResult;