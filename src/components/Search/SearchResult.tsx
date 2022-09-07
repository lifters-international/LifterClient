import React from 'react';
import { Link } from "react-router-dom";
import { useSearchQuery, useAcceptDeclineMatch } from '../../hooks';
import { SubscriptionType } from "../../utils";
import { HeartFilled } from '@ant-design/icons';
import Loading from '../Loading';
import ProfilePicture from "../ProfilePicture";

export type SearchResultProps = {
    query: string;
    token: string;
}

const SearchResult: React.FC<SearchResultProps> = ( { query, token } : SearchResultProps ) => {
    const queryResult = useSearchQuery( query, token );
    const acceptDecline = useAcceptDeclineMatch();

    const acceptMatch = async ( accept: boolean, id: string ) => {
        acceptDecline.acceptDecline( token, id, accept )
    }

    if ( queryResult.loading ) return <Loading />;

    const shortText = ( text : string, length = 60) => {
        return text.slice(0, length) + ( (text.length) >= length ? "..." : "");
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
                        queryResult.result?.map( ( user, index) => {
                            return (
                                <div key={`user-search-result-${index}`} className="UserSearchResult">
                                    <ProfilePicture image={user.profilePicture} alt={`${user.username}-profilePicture`} imageClass="ProfilePicture" />
                                    <div className="name center">{user.username}</div>
                                    <div className="bio center" title={user.bio}>{shortText(user.bio)}</div>
                                    <div className="homeGym center">{user.homeGymLocation}</div>
                                    <div className="X circle centerB" onClick={ () => acceptMatch(false, user.id) } >X</div>
                                    <div className="Heart circle centerB" onClick={ () => acceptMatch(true, user.id) } >
                                        <HeartFilled twoToneColor="#eb2f96" style={
                                            {   
                                                verticalAlign: 'middle'
                                            }
                                        }/>
                                    </div>
                                    {
                                        queryResult.userSubscription === SubscriptionType.BASIC ? (
                                            <div className="SearchResultBasicSubscriptionBlured">
                                                <Link to="/changeSubscription" className="SearchResultBasicSubscriptionBluredContextLink" target="_blank">Upgrade To Pro</Link>
                                            </div>
                                        ) : null
                                    }
                                </div>
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