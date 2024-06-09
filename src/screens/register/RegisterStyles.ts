export const useStyles = {

    bodyContainer: {
        height: '100vh',
        width: '95%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        margin: "0",
        padding: "0",
    },
    leftContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
    },
    logo: {
        width: "30rem",
        minWidth: "300px",
    },
    textContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pb: "20px",
    },
    bodyH1: {
        color: "white",
        padding: "20px",
        fontSize: "1.2rem",
        fontWeight: 100,
        textAlign: "center",
        lineHeight: "1.7"
    },
    bodyH2: {
        color: "white",
        padding: "5px",
        fontSize: "1.3rem",
        fontWeight: "700",
        textAlign: "center",
        marginTop: "8px",
        lineHeight: "1.5"
    },
    bodyH3: {
        color: "white",
        padding: "5px",
        fontSize: "1rem",
        fontWeight: 50,
        textAlign: "center",
        marginTop: "8px",
    },

    paper: {
        display: "flex",
        borderRadius: "10px",
        background: "rgba(217, 217, 217, 0.10)",
        justifyContent: "center",
        alignItems: "center",  
        padding: "40px",
     },
    boxPaper: {
        color: "white",
        display: "flex",
        maxWidth: "420px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "40px",
    },
    textField: {
        borderRadius: "10px",
        border: "1px solid #8e8adb",
        background: "white ",
    },
    button: {
        mt: 5,
        mb: 2,
        color: "white",
        backgroundColor: "#000",
        border: '2px solid',
        borderImage: 'linear-gradient(to right, #77EBEB, #9A40E0)',
        borderImageSlice: 1,
        borderImageSource: 'linear-gradient(to right, #77EBEB, #9A40E0)',
        padding: '10px',
        boxShadow: "0px 4px 61px 0px rgba(77, 71, 195, 0.60)",
        '&:hover': {
            backgroundColor: "#211f42"
        }
    },
    profileImage: {
        width: 100, 
        height: 100, 
        borderRadius: '50%'
    },
    profileButton: {
        mt: 2,
        '&:hover': {
            backgroundColor: "#211f42",
            color: "white",
        }
    },
};