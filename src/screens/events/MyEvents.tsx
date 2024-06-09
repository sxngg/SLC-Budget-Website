import { useEffect, useState } from "react";
import { useStyles } from "./EventsStyles";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../components/materialUI-common";
import { Container, CssBaseline } from "@mui/material";
import { Grid } from "@mui/material";
import LoadingScreen from "../../components/loading_screen/LoadingScreen";
import { IEventWithId, IParticipantEvents } from "../../types";
import { useAppSelector } from "../../hooks/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/loading/loadingSlice";
import { useEventActions } from "../../store/event/useEventActions";
import { getEventsByOwner } from "../../services/user/UserService";
import { getEventsByUserId } from "../../services/event/EventService";
import { EventsTable } from "../../components/events_table/EventsTable";

const MyEvents: React.FC = () => {
  const navigate = useNavigate();

  // #region Estados
  const [ownEvents, setOwnEvents] = useState<IEventWithId[] | null>(null);
  const [participantEvents, setParticipantEvents] = useState<
    IParticipantEvents[] | null
  >(null);

  // #endregion

  // #region Store
  // Slice
  const user = useAppSelector((state) => state.user);
  const isLoading = useAppSelector((state) => state.loading);

  // Actions
  const { updateEvent } = useEventActions();
  const dispatch = useDispatch();
  // #endregion

  // #region useEffect inicial

  const fetchUserData = async () => {
    dispatch(startLoading());
    try {
      const responseOwnEvents = await getEventsByOwner(user.id);
      if (responseOwnEvents) {
        const { content } = responseOwnEvents;
        const ownEvents: IEventWithId[] | null = content;
        setOwnEvents(ownEvents);
      }
    } catch (err) {
      console.error("Error al obtener los eventos propios", err);
    }
    try {
      const responseParticipantEvents = await getEventsByUserId(user.id);
      if (responseParticipantEvents) {
        const { content } = responseParticipantEvents;
        const participantEvents: IParticipantEvents[] | null = content;
      
        // Asegurarse de que participantEvents no sea undefined
        const filteredEvents = participantEvents
          ? {
              ownerEvents: participantEvents.filter(event => event.owner_id === user.id),
              participantOnlyEvents: participantEvents.filter(event => event.owner_id !== user.id),
            }
          : { ownerEvents: [], participantOnlyEvents: [] };
      
        setParticipantEvents(filteredEvents.participantOnlyEvents);
      }
      
    } catch (err) {
      console.error(
        "Error al obtener los eventos propios en los que el usuario es participante",
        err
      );
    } finally {
      dispatch(stopLoading());
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  // #endregion

  // #region handleEditEvent
  const handleEditEvent = (event: IEventWithId, isOwner: boolean) => {
    dispatch(startLoading());
    updateEvent(event);
    navigate(`/event-details/${isOwner}`);
    dispatch(stopLoading());
  };
  // #endregion

  return (
    <>
      <CssBaseline />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg">
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
                md={6}
                component={Paper}
                elevation={1}
                sx={useStyles.paper}
              >
                <EventsTable
                  events={ownEvents ?? []}
                  handleEditEvent={handleEditEvent}
                  ownOrParticipant="own"
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                component={Paper}
                elevation={1}
                sx={useStyles.paper}
              >
                <EventsTable
                  events={participantEvents ?? []}
                  handleEditEvent={handleEditEvent}
                  ownOrParticipant="participant"
                />
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
};

export default MyEvents;
