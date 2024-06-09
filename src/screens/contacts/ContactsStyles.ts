export const useStyles = {
  logo: {
    padding: "18px",
    width: "30rem",
    minWidth: "300px",
  },

  bodyH2: {
    color: "white",
    padding: "5px",
    mb: 1,
    fontSize: "1.4rem",
    fontWeight: "700",
    textAlign: "center",
  },

  bodyH3: {
    color: "black",
    padding: "5px",
    mb: 1,
    fontSize: "1.4rem",
    fontWeight: "700",
    textAlign: "center",
  },

  tableTitle: {
    color: "black",
    padding: "5px",
    mb: 1,
    fontSize: "1.6rem",
    fontWeight: "700",
    textAlign: "center",
  }, 
  bodyP: {
    color: "white",
    padding: "5px",
    mb: 2,
    fontSize: "1rem",
    fontWeight: 100,
    textAlign: "center",
  },

  paperLeft: {
    display: "flex",
    borderRadius: "10px",
    background: "rgba(217, 217, 217, 0.10)",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    margin: " 0 auto",
    mt: 2,

  },
  paperRight: {
    display: "flex",
    borderRadius: "10px",
    background: "rgba(217, 217, 217, 0.10)",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    margin: " 0 auto",
    mt: 2,

  },

  boxPaperLeft: {
    color: "white",
    display: "flex",
    maxWidth: "250px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px",
  },
  boxPaperRight: {
    color: "white",
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px",
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: "50%",
  },
  textField: {
    borderRadius: "10px",
    border: "1px solid #8e8adb",
    background: "white ",
    padding: "5px",
  },
  button: {
    mt: 3,
    color: "white",
    backgroundColor: "#000",
    border: "2px solid",
    borderImage: "linear-gradient(to right, #77EBEB, #9A40E0)",
    borderImageSlice: 1,
    borderImageSource: "linear-gradient(to right, #77EBEB, #9A40E0)",
    padding: "10px 20px 10px 20px",
    boxShadow: "0px 4px 61px 0px rgba(77, 71, 195, 0.60)",
    "&:hover": {
      backgroundColor: "#211f42",
    },
  },
};
