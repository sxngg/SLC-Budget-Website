import { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  Table,
  TablePagination,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "../../hooks/store";
import { useContactsActions } from "../../store/contacts/useContactsActions";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { TContactState, IUserWithId } from "../../types";
import {
  getContactsByUserId,
  getUserByEmail,
} from "../../services/user/UserService";
import CONSTANTS from "../../constants";
import LoadingScreen from "../../components/loading_screen/LoadingScreen";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Paper } from "@mui/material";
import { useStyles } from "./ContactsStyles";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../components/materialUI-common";
import { Toaster, toast } from "sonner";
import { startLoading, stopLoading } from "../../store/loading/loadingSlice";
import { useDispatch } from "react-redux";

function Contacts() {
  // #region Estados
  //Configuración de paginación para las tablas
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 2,
  });

  // State para gestionar todo el componente
  const [contactState, setContactState] = useState<TContactState>({
    email: "",
    contactInfo: null,
    modalOpen: false,
  });

  // #endregion

  // #region Store
  // Slices
  const contacts = useAppSelector((state) => state.contacts);
  const user = useAppSelector((state) => state.user);
  const isLoading = useAppSelector((state) => state.loading);

  // Actions
  const { addContact, refreshContacts } = useContactsActions();
  const dispatch = useDispatch();

  // #endregion

  // #region Fetch inicial
  const fetchUserData = async () => {
    dispatch(startLoading());
    try {
      const contactsData = await getContactsByUserId(user.id);
      const contactsToRefresh: IUserWithId[] | null | undefined =
        contactsData?.contacts;
      refreshContacts(contactsToRefresh);
    } catch (err) {
      console.error("Error al obetener los datos del servidor", err);
    } finally {
      dispatch(stopLoading());
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  // #endregion

  // #region search y addContact

  const handleSearch = async () => {
    try {
      const foundContact: IUserWithId = await getUserByEmail(
        contactState.email
      );
      const foundEmail = contacts.find(
        (contact) => contact.email === contactState.email
      );
      if (foundEmail) {
        toast.error("Este usuario ya está en tu lista de contactos");
      } else {
        setContactState({
          ...contactState,
          contactInfo: foundContact,
          modalOpen: !!foundContact,
        });
      }
    } catch (error) {
      setContactState({
        ...contactState,
        contactInfo: null,
        modalOpen: false,
      });
      toast.error("Este usuario no existe");
    }
  };

  const handleAddContact = (contactState: TContactState) => {
    dispatch(startLoading());
    setContactState({
      ...contactState,
      modalOpen: false,
    });
    addContact(contactState.contactInfo);
  };

  // #endregion

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg">
            <Grid container component="main" sx={{ width: "sm", height: "md" }}>
              <Grid
                item
                xs={10}
                sm={4}
                md={4}
                component={Paper}
                elevation={1}
                sx={useStyles.paperLeft}
              >
                <Box sx={useStyles.boxPaperLeft}>
                  <Typography variant="h6" component="h2" sx={useStyles.bodyH2}>
                    Nuevo contacto
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={useStyles.bodyP}
                  >
                    Ingresa el correo electrónico de tu amigo para agregarlo a
                    tu lista de contactos
                  </Typography>

                  <TextField
                    sx={{
                      ...useStyles.textField,
                      "& .MuiInputBase-input": { paddingLeft: "10px" },
                    }}
                    fullWidth
                    variant="standard"
                    label=". Correo electrónico a buscar"
                    value={contactState.email}
                    onChange={(e) =>
                      setContactState({
                        ...contactState,
                        email: e.target.value,
                      })
                    }
                  />

                  <Button
                    variant="contained"
                    sx={useStyles.button}
                    fullWidth
                    onClick={handleSearch}
                  >
                    Buscar contacto
                  </Button>

                  <Modal
                    open={contactState.modalOpen}
                    onClose={() =>
                      setContactState({
                        ...contactState,
                        modalOpen: false,
                      })
                    }
                  >
                    <Card
                      style={{
                        width: 400,
                        margin: "auto",
                        marginTop: 100,
                        padding: 16,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h5" sx={useStyles.bodyH3}>
                        Información del contacto
                      </Typography>
                      {contactState.contactInfo && (
                        <CardContent>
                          <Avatar
                            sx={{
                              width: 70,
                              height: 70,
                              borderRadius: "50%",
                              marginRight: 2,
                              margin: "auto",
                            }}
                            src={
                              contactState.contactInfo.profileImage
                                ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${contactState.contactInfo.profileImage}`
                                : ""
                            }
                            alt={contactState.contactInfo.name}
                          />
                          <p>Nombre: {contactState.contactInfo.name}</p>
                          <p>Apellido: {contactState.contactInfo.lastName}</p>
                          <p>
                            Correo electrónico: {contactState.contactInfo.email}
                          </p>
                          <Stack
                            direction="row"
                            spacing={2}
                            justifyContent={"center"}
                          >
                            <Button
                              variant="contained"
                              onClick={() => handleAddContact(contactState)}
                            >
                              <PersonAddIcon />
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() =>
                                setContactState({
                                  ...contactState,
                                  modalOpen: false,
                                })
                              }
                            >
                              <CloseIcon />
                            </Button>
                          </Stack>
                        </CardContent>
                      )}
                    </Card>
                  </Modal>
                </Box>
              </Grid>

              <Grid
                item
                xs={11}
                sm={7}
                md={7}
                component={Paper}
                elevation={1}
                sx={useStyles.paperRight}
              >
                <Box sx={useStyles.boxPaperRight}>
                  <Card>
                    <Typography variant="h5" sx={useStyles.tableTitle}>
                      Contactos
                      <Badge
                        badgeContent={contacts.length}
                        color="secondary"
                        sx={{ ml: 2 }}
                      ></Badge>
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Eliminar</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {contacts
                            .slice(
                              pagination.page * pagination.rowsPerPage,
                              pagination.page * pagination.rowsPerPage +
                                pagination.rowsPerPage
                            )
                            .map((contact, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Avatar
                                      sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: "50%",
                                        marginRight: 1,
                                      }}
                                      src={
                                        contact.profileImage
                                          ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${contact.profileImage}`
                                          : ""
                                      }
                                      alt={contact.name}
                                    />
                                    {contact.name}
                                  </div>
                                </TableCell>
                                <TableCell>{contact.lastName}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>
                                  <Button
                                    variant="outlined"
                                    onClick={() => null}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                      <TablePagination
                        component="div"
                        count={contacts.length}
                        page={pagination.page}
                        onPageChange={(_, newPage) =>
                          setPagination({
                            ...pagination,
                            page: newPage,
                          })
                        }
                        rowsPerPage={pagination.rowsPerPage}
                        onRowsPerPageChange={(e) => {
                          setPagination({
                            ...pagination,
                            rowsPerPage: parseInt(e.target.value, 10),
                            page: 0,
                          });
                        }}
                      />
                    </TableContainer>
                  </Card>
                </Box>
              </Grid>
              <Toaster />
            </Grid>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}

export default Contacts;
