declare module 'react-rating-stars-component' {
    import * as React from "react";

    interface StarRatingComponentProps {
        className?: string,
        edit?: boolean,
        half?: boolean,
        value: number,
        count?: number,
        char?: string,
        size?: number,
        color?: string,
        activeColor?: string,
        a11y?: booean;
        onChange?: ( ( val: number ) => void );
    }

    declare class StarRatingComponent extends React.Component<
        StarRatingComponentProps
    > { }

    export = StarRatingComponent;
}
