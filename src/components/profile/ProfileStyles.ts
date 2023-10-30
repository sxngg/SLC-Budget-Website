export const useStyles = {

    logo: {
        padding: "18px",
        width: "30rem",
        minWidth: "300px",
    },

    bodyH2: {
        color: "white",
        padding: "5px",
        mb: 2,
        fontSize: "1.2rem",
        fontWeight: 100,
        textAlign: "center",
    },

    paper: {
        display: "flex",
        borderRadius: "10px",
        background: "rgba(217, 217, 217, 0.10)",
        justifyContent: "center",
        alignItems: "center",  
        padding: "10px",
        margin:" 0 auto"
     },
    boxPaper: {
        color: "white",
        display: "flex",
        maxWidth: "380px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px",
    },
    profileImage: {
        width: 100, 
        height: 100, 
        borderRadius: '50%'
    },
    textField: {
        borderRadius: "10px",
        border: "1px solid #8e8adb",
        background: "white ",
        height: "40px",
        
    },
    textFieldEmail: {
        borderRadius: "10px",
        border: "1px solid #8e8adb",
        background: "#BFBFBF",
        height: "40px",
    },
    button: {
        mt: 3,
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



};