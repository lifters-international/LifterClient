import React from 'react';
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

import { BiSearchAlt } from "react-icons/bi";

export type SearchBarProps = {
    onChange?: (event: any) => void;
    onSubmit?: (value: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    placeholder?: string;
    className?: string;
    iconClass?: string;
    searchInputClass?: string;
    showIcon?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
    const ref = React.useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const onSub = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (props.onSubmit) return props.onSubmit(ref.current?.value!, event)

        if (ref.current?.value.length! > 0) {
            navigate(`/search/${ref.current?.value!}`);
        }
    }

    return (
        <div className={`SearchBar ${props.className || ""}`}>
            <input type="text" placeholder={props.placeholder || "Search Lifters"} ref={ref} onChange={props.onChange || undefined} className={"SearchBarInput " + (props.searchInputClass || "")} />

            {
                !props.showIcon ? null : (
                    <div onClick={onSub}>
                        <BiSearchAlt color="#afadad" size={60} className={"SearchBarIcon" + (props.iconClass ? " " + props.iconClass : "")} />
                    </div>
                )
            }
        </div>
    );

}

SearchBar.defaultProps = {
    showIcon: true
}

export default SearchBar;