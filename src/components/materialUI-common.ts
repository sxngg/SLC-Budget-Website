import { Box, ListItemButton, styled} from '@mui/material';
import { TableCell, TableRow, createTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';

// Define your ListItemButton variant
export const MyListItemButton = styled(ListItemButton)(({ theme }) => ({
  mt: 4,
  mb: 4,
  color: "white",
  backgroundColor: "#000",
  border: '3px solid',
  borderImage: 'linear-gradient(to right, #77EBEB, #9A40E0)',
  borderImageSlice: 1,
  padding: '10px 20px 10px 20px',
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0px 4px 61px 0px rgba(77, 71, 195, 0.60)",
  '&:hover': {
    backgroundColor: "#211f42"
  },
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const getStyles = (theme: Theme) => ({
  MuiListItemButton: {
    styleOverrides: {
      root: {
        // No need to add anything here
      },
    },
  },

  MuiTableCell: {
    styleOverrides: {
      root: {
        '&.MuiTableCell-head': {
          backgroundColor: theme.palette.secondary.dark,
          whiteSpace: 'nowrap',
          color: theme.palette.common.white,
          textAlign: 'center',
        },
        '&.MuiTableCell-body': {
          maxWidth: '180px', 
          wordWrap: 'break-word',
          fontSize: 14,
          textAlign: 'center',
        },
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      },
    },
  },
});


export const theme = createTheme({
  components: getStyles(createTheme()),
  typography: {
    fontFamily: 'Nunito, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#77EBEB',
      light: '#FFFFFF',
      dark: '#060606',
    },
    secondary: {
      main: '#9A40E0',
      light: '#F5EBFF',
      dark: '#0F3E3C',
    },
    background: {
      default: '#060606',
    },
  },
});




export const Root = styled(Box)({
  minHeight: '100vh',
  minWidth: '100vw',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
});

export const Footer = styled('footer')({
  backgroundColor: 'whitesmoke',
  color: 'black',
  padding: 2,
  textAlign: 'center',
  marginTop: 4,
});
