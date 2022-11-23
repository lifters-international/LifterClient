const ProgressBar = ( props : { bgColor: string, completed: number } ) => {
    const { bgColor, completed } = props;
    const containerStyles = {
        height: 20,
        width: '95%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50
    }
    
    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgColor,
        borderRadius: 'inherit',
        "text-align": 'right'
    }
    
    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }
    
    return (
        <div style={containerStyles}>
        <div style={fillerStyles}>
            <span style={labelStyles}>{`${completed}%`}</span>
        </div>
        </div>
    );
}

export default ProgressBar;
