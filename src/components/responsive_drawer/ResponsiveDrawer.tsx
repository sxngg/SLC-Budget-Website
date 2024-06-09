import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { theme } from "../materialUI-common";
import {
  Avatar,
  Badge,
  Button,
  Link,
  Paper,
  Stack,
  TableContainer,
  Popover,
} from "@mui/material";
import CircleNotificationsRoundedIcon from "@mui/icons-material/CircleNotificationsRounded";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MainListItems } from "./MainListItems";
import { useStyles } from "./ResponsiveDrawerStyles";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthActions } from "../../store/auth/useAuthActions";
import { useUserActions } from "../../store/user/useUserActions";
import {
  IUserResponse,
  InvitationsEventPaginationResponse,
  TInvitationEventInfoResponse,
} from "../../types";
import { getUserByEmail } from "../../services/user/UserService";
import { DEFAULT_USER_STATE } from "../../store/user/Userslice";
import LoadingScreen from "../loading_screen/LoadingScreen";
import { useAppSelector } from "../../hooks/store";
import CONSTANTS from "../../constants";
import {
  getInvitationsByUserId,
  updateInvitation,
} from "../../services/invitation/InvitationService";
import { toast } from "sonner";
import { startLoading, stopLoading } from "../../store/loading/loadingSlice";
import { useDispatch } from "react-redux";
import { NotificationInvTable } from "../invitations_table/NotificationInvTable";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.youtube.com/watch?v=_6XzJPyAJDI">
        SLC Budget
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const navigate = useNavigate();

  // #region Estados
  const [loading, setLoading] = useState<boolean>(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  // #endregion

  // #region Store
  const { logoutUser } = useAuthActions();
  // Actions
  const { updateUser } = useUserActions();
  // #endregion

  //Slice
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  // #region Fetch inicial para cargar el usuario
  const fetchUserData = async () => {
    try {
      const email = localStorage.getItem("email");
      const userResponse: IUserResponse = email
        ? await getUserByEmail(email)
        : DEFAULT_USER_STATE;
      updateUser(userResponse);
      setLoading(false);
    } catch (err) {
      console.error(
        "Error al obtener los datos de usuario desde servidor",
        err
      );
      setLoading(false);
    }
    dispatch(startLoading());
    try {
      const invitationsResponse = await getInvitationsByUserId(user.id);
      if (invitationsResponse) {
        if (invitationsResponse.content) {
          const updateInvitations = invitationsResponse.content.map(
            (invitation) => ({
              ...invitation,
              viewed: false,
            })
          );
          setInvitations(updateInvitations);
        }
      }
    } catch (err) {
      console.error("Error al obtener los eventos propios", err);
    } finally {
      dispatch(stopLoading());
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  // #endregion

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const drawer = (
    <div>
      <Toolbar sx={useStyles.toolbarDrawer}>
        <img
          src="/logo-slc.svg"
          alt="SLC Logo"
          style={useStyles.logo}
        />
        <IconButton onClick={handleDrawerToggle} sx={{ color: "#FFF" }}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <MainListItems />
        <Divider sx={{ my: 1 }} />
        {/* <SecondaryListItems />*/}
      </List>
    </div>
  );

  //Notification
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
    const updatedInvitations = invitations.map((invitation) => ({
      ...invitation,
      viewed: true,
    }));
    setInvitations(updatedInvitations);
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  // #enregion

  //Avatar and logout button
  const [anchorElLogout, setAnchorElLogout] = useState<null | HTMLElement>(
    null
  );

  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElLogout(event.currentTarget);
  };

  const handleLogoutClose = () => {
    setAnchorElLogout(null);
  };

  //Table Notifications
  const [invitations, setInvitations] = useState<
    TInvitationEventInfoResponse[]
  >([]);

  const handleAcceptInvitation = async (invitationId: number) => {
    try {
      await updateInvitation(invitationId, "ACCEPTED");
      const updatedInvitations = invitations.filter(
        (invitation) => invitation.invitation_id !== invitationId
      );
      setInvitations(updatedInvitations);
      toast.success("Invitación aceptada, mira tus eventos");
    } catch (e) {
      console.error("Error aceptando la invitación", e);
      toast.error("Error aceptando la invitación");
    }
  };
  // #enregion

  const getInvitations = async () => {
    try {
      const invitationsResponse: InvitationsEventPaginationResponse | null =
        await getInvitationsByUserId(user.id);
      console.log("invitation rEPSEOS", invitationsResponse?.content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInvitations();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          color: theme.palette.primary.light,
          backgroundColor: theme.palette.secondary.dark,
        }}
      >
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Página de Inicio
          </Typography>
          <Stack direction="row" spacing={3}>
            <IconButton color="inherit" onClick={handleNotificationsClick}>
              <Badge
                badgeContent={
                  invitations.filter((invitation) => !invitation.viewed).length
                }
                color="secondary"
              >
                <CircleNotificationsRoundedIcon
                  sx={{ color: theme.palette.primary.main, fontSize: "2.5rem" }}
                />
              </Badge>
            </IconButton>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleNotificationsClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box p={2}>
                <TableContainer component={Paper}>
                  <NotificationInvTable
                    invitations={invitations}
                    handleAcceptInvitation={handleAcceptInvitation}
                  />
                </TableContainer>
              </Box>
            </Popover>
            <IconButton onClick={handleAvatarClick}>
              <Avatar
                sx={useStyles.profileImage}
                src={
                  user.profileImage
                    ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${user.profileImage}`
                    : ""
                }
                alt={"Imagen del usuario"}
              />
            </IconButton>
            <Popover
              open={Boolean(anchorElLogout)}
              anchorEl={anchorElLogout}
              onClose={handleLogoutClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Button
                variant="outlined"
                sx={useStyles.logoutButton}
                onClick={handleLogout}
              >
                Cerrar sesión
              </Button>
            </Popover>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/**Drawer mobile */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Paper sx={{ backgroundColor: "black", color: "white" }}>
            {drawer}
          </Paper>
        </Drawer>

        {/**Drawer pc */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            "& .MuiPaper-root": { backgroundColor: "black", color: "white" },
            border: "3px solid black",
          }}
          open
        >
          <Paper sx={{ backgroundColor: "black", color: "white" }}>
            {drawer}
          </Paper>
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {loading ? <LoadingScreen /> : <Outlet />}
        <Copyright sx={{ pt: 4, color: "white" }} />
      </Box>
    </Box>
  );
}
