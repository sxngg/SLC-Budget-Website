import { useEffect, useState } from "react";
import { useStyles } from "./NotificationsStyle";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../components/materialUI-common";
import {
  CssBaseline,
} from "@mui/material";
import { Grid } from "@mui/material";
import LoadingScreen from "../../components/loading_screen/LoadingScreen";
import { TInvitationEventInfoResponse } from "../../types";
import { useAppSelector } from "../../hooks/store";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/loading/loadingSlice";
import { InvitationsTable } from "../../components/invitations_table/InvitationsTable";
import { getInvitationsByUserId, updateInvitation } from "../../services/invitation/InvitationService";
import { toast } from "sonner";

const Notifications: React.FC = () => {

  // #region Estados
  const [invitations, setInvitations] = useState<TInvitationEventInfoResponse[]>([]);
  
  // #endregion

  // #region Store
  // Slice
  const user = useAppSelector((state) => state.user);
  const isLoading = useAppSelector((state) => state.loading);

  // Actions
  const dispatch = useDispatch();
  // #endregion

  // #region useEffect inicial

  const fetchUserData = async () => {
    dispatch(startLoading());
    try {
      const invitationsResponse = await getInvitationsByUserId(user.id);
      if (invitationsResponse) {
        if (invitationsResponse.content) {
          setInvitations(invitationsResponse.content);
        }
      }
     
    } catch (err) {
      console.error("Error al obtener los eventos propios", err);
    } 
    finally {
      dispatch(stopLoading());
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  // #endregion

  // #region handleAcceptInvitation
  const handleAcceptInvitation = async (invitationId: number) => {
    try {
      await updateInvitation(invitationId, "ACCEPTED");
      const updatedInvitations = invitations.filter(invitation => invitation.invitation_id !== invitationId);
      setInvitations(updatedInvitations)
      toast.success('Invitación aceptada, mira tus eventos');
    } catch (e) {
      console.error('Error aceptando la invitación', e);
      toast.error('Error aceptando la invitación');
    }
  } 
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
              md={6}
              component={Paper}
              elevation={1}
              sx={useStyles.paper}
            >
              <InvitationsTable
                invitations={invitations}
                handleAcceptInvitation={handleAcceptInvitation}
              />
            </Grid>

          </Grid>
        </ThemeProvider>
      )}
    </>
  );
};

export default Notifications;
