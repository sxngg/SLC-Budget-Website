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
        fontSize: "1.4rem",
        fontWeight: "700",
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
    profileButton: {
        mt: 2,
        '&:hover': {
            backgroundColor: "#211f42",
            color: "white",
        }
    },
    textField: {
        backgroundColor: "white", 
        borderRadius: "10px" 
        
    },
    textFieldEmail: {
        borderRadius: "10px",
        background: "#BFBFBF",
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