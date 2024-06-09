export const useStyles = {
  principalCard: {
    width: 100,
    margin: 1,
    textAlign: 'center',
    transition: 'background-color 0.2s ease-in-out, transform 0.6s ease-in-out',
    '&:hover': {
      backgroundColor: '#3cd590',
      transform: 'scale(1.02)', 
    },
  },
  selectedCard: {
    backgroundColor: '#42b481',
  },
  contactCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 1,
    '& .MuiAvatar-root': {
    width: 30, // Ajusta el tamaño de la imagen del Avatar según tus preferencias
    height: 30, // Puedes ajustar la altura también
  }
  },
};