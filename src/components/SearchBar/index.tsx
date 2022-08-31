import React from 'react';
import Lottie from 'react-lottie-player';
import SearchIcon from "./search.json";
import "./SearchBar.css";

export type SearchBarProps = {
    onChange?: (event: any) => void;
    onSubmit?: (value: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    placeholder?: string;
    className?: string
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
    const ref = React.useRef<HTMLInputElement>(null);

    const onSub = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (props.onSubmit) props.onSubmit(ref.current?.value!, event) 
    }

    return (
        <div className={`SearchBar ${props.className || ""}`}>
            <input type="text" placeholder="Search Lifters" ref={ref} onChange={props.onChange || undefined} className="SearchBarInput"/>
            <Lottie
                animationData={SearchIcon}
                loop
                speed={1}
                play
                className={"SearchBarIcon"}
                onClick={onSub}
            />
        </div>
    );

}

export default SearchBar;