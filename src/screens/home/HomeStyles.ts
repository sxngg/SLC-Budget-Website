export const useStyles = {

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
     paper2: {
        display: "flex",
        borderRadius: "10px",
        justifyContent: "center",
        alignItems: "center",  
        padding: "10px",
        margin:" 0 auto",
        background: "none",
        flexDirection: "column"
     },
     paper3: {
        width: "100%",
        display: "flex",
        borderRadius: "10px",
        justifyContent: "center",
        alignItems: "center",
        margin: " 0 auto",
        background: "rgba(217, 217, 217, 0.10)",
        mb: 2,
     },
    boxPaper: {
        color: "white",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px",
    },
    profileImage: {
        width: 100, 
        height: 100, 
        borderRadius: '50%',
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
    button: {
        mt: 3,
        color: "white",
        backgroundColor: "#000",
        border: '2px solid',
        borderImage: 'linear-gradient(to right, #77EBEB, #9A40E0)',
        borderImageSlice: 1,
        borderImageSource: 'linear-gradient(to right, #77EBEB, #9A40E0)',
        padding: '8px 10px 8px 10px',
        '&:hover': {
            backgroundColor: "#211f42"
        }
    },
    button2: {
        boxShadow: "0px 4px 61px 0px rgba(180, 101, 241, 0.30)",
    },
    button3: {
        boxShadow: "0px 4px 61px 0px rgba(87, 229, 229, 0.30)",
    },


};