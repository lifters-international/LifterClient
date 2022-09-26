import React from 'react';
import Lottie from 'react-lottie-player';
import SearchIcon from "./search.json";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

export type SearchBarProps = {
    onChange?: (event: any) => void;
    onSubmit?: (value: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    placeholder?: string;
    className?: string;
    iconClass?: string;
    searchInputClass?: string;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
    const ref = React.useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const onSub = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (props.onSubmit) return props.onSubmit(ref.current?.value!, event) 

        if ( ref.current?.value.length! > 0 ) {
            navigate(`/search/${ref.current?.value!}`);
        }
    }

    return (
        <div className={`SearchBar ${props.className || ""}`}>
            <input type="text" placeholder={ props.placeholder || "Search Lifters" } ref={ref} onChange={props.onChange || undefined} className={ "SearchBarInput " + (props.searchInputClass || "") }/>
            <Lottie
                animationData={SearchIcon}
                loop
                speed={1}
                play
                className={"SearchBarIcon" + (props.iconClass ? " " + props.iconClass : "")}
                onClick={onSub}
            />
        </div>
    );

}

export default SearchBar;