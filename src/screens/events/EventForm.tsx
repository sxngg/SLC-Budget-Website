import { useEffect, useState } from "react";
import { useStyles } from "./EventsStyles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../components/materialUI-common";
import {
  Avatar,
  CssBaseline,
} from "@mui/material";
import { Grid, TextField, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import LoadingScreen from "../../components/loading_screen/LoadingScreen";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IEvent, IEventWithId } from "../../types";
import { useAppSelector } from "../../hooks/store";
import { useEventActions } from "../../store/event/useEventActions";
import { SubmitHandler, useForm } from "react-hook-form";
import { createEvent } from "../../services/event/EventService";
import { useNavigate } from "react-router-dom";
import { SelectEventType } from "../../components/select_event_type/SelectEventType";
import useImageUploader from "../../hooks/useImageUploader";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/loading/loadingSlice";
import { Toaster, toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

const EventForm: React.FC = () => {
  const navigate = useNavigate();
  
  // #region Estados
  // Imagen
  const { selectedFile, previewImage, handleImageChange } = useImageUploader();

  // Selección de evento
  const [selectedEvent, setSelectedEvent] = useState("");
  
  // #endregion
  
  // #region Store
  // Slice
  const user = useAppSelector((state) => state.user);
  const isLoading = useAppSelector((state) => state.loading);

  // Actions
  const dispatch = useDispatch();
  const { updateEvent } = useEventActions();
  // #endregion
  
  // #region React-hook-form con su onSubmit
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<IEvent>();

  // botón Guardar Cambios, se edita en la bd y se actualiza el event en la store
  const onSubmit: SubmitHandler<IEvent> = async (data) => {
    const { name, description } = data;
    try {
      if (data) {
        //Renombrando la imagen
        let renamedFile = null;
        if (selectedFile) {
          const fileExtension = selectedFile.name.split(".").pop();
          const uniqueId = uuidv4();
          const newFileName = `${uniqueId}.${fileExtension}`;
          renamedFile = new File([selectedFile], newFileName);
        }

        const eventForm: IEvent = {
          name,
          description,
          type: selectedEvent,
          owner_id: user.id,
        };

        try {
          const response: IEventWithId = await createEvent(eventForm, renamedFile);
          updateEvent(response);
          toast.success("Creación de evento satisfactoria.");
          reset();
          setTimeout(() => {
            navigate(`/event-details/${true}`)
          }, 1000)
        } catch (e) {
          console.error(e);
          toast.error("Error en la creación del evento.");
          console.error("Error en la creación del evento: ", e);
        }

      }
    } catch (e) {
      toast.success("Error en la creación del evento.");

    }
  };
  // #endregion
  
  // #region useEffect inicial
  useEffect(() => {
    dispatch(startLoading());
    const timer = setTimeout(() => {
      dispatch(stopLoading());
    }, 1400); // 1.4 segundos

    return () => clearTimeout(timer);
  }, []);
  // #endregion 
  return (
    <>
      <CssBaseline />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ThemeProvider theme={theme}>
          <Grid
            container
            component="main"
            flexDirection="row"
            sx={{ width: "sm", height: "md" }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              component={Paper}
              elevation={1}
              sx={useStyles.paper}
            >
              <Box sx={useStyles.boxPaper}>
                <Typography variant="h4" sx={useStyles.bodyH2}>
                  Crear evento
                </Typography>

                <Divider variant="middle" />
                <Avatar
                  sx={useStyles.profileImage}
                  src={previewImage || ""}
                  alt={"Imagen del evento"}
                />
                <Grid item xs={12}>
                  <label htmlFor="image-upload">
                    <Button
                      component="span"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      sx={useStyles.profileButton}
                    >
                      {selectedFile ? 'Subir de nuevo' : 'Seleccionar imagen'}
                    </Button>
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </Grid>

                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        Nombre del evento{" "}
                      </Typography>
                      <TextField
                        sx={{
                          ...useStyles.textField,
                          "& .MuiInputBase-input": { paddingLeft: "10px" },
                        }}
                        required
                        fullWidth
                        variant="standard"
                        id="event-name"
                        label=""
                        autoComplete=""
                        {...register("name", { required: true, minLength: 4 })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        Descripción del evento{" "}
                      </Typography>
                      <TextField
                        sx={{
                          ...useStyles.textField,
                          "& .MuiInputBase-input": { paddingLeft: "10px" },
                        }}
                        required
                        fullWidth
                        multiline
                        rows={3}
                        variant="standard"
                        id="description"
                        label=""
                        autoComplete=""
                        {...register("description", {
                          required: true,
                          minLength: 3,
                        })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        {" "}
                        Tipo de evento{" "}
                      </Typography>
                      <SelectEventType
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                        isEnableEditForm={true}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={useStyles.button}
                    disabled={!isValid || (selectedEvent === "")}
                  >
                    Crear evento
                  </Button>
                </Box>
                <Toaster />
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
};

export default EventForm;
