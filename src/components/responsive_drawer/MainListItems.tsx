import React from "react";
import { MyListItemButton, theme } from "../materialUI-common";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const MainListItems = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <MyListItemButton onClick={() => navigate("/create-event")}>
        <ListItemIcon>
          <ControlPointIcon
            sx={{ color: theme.palette.primary.light, fontSize: "2rem" }}
          />
        </ListItemIcon>
        <ListItemText primary="Crear evento" />
      </MyListItemButton>

      <ListItemButton
        sx={{ "&:hover": { backgroundColor: theme.palette.primary.main } }}
        onClick={() => navigate("/home")}
      >
        <ListItemIcon>
          <DashboardIcon sx={{ color: theme.palette.primary.light }} />
        </ListItemIcon>
        <ListItemText primary="Inicio - Tus saldos" />
      </ListItemButton>

      <ListItemButton
        sx={{ "&:hover": { backgroundColor: theme.palette.primary.main } }}
        onClick={() => navigate("/profile")}
      >
        <ListItemIcon>
          <PersonIcon sx={{ color: theme.palette.primary.light }} />
        </ListItemIcon>
        <ListItemText primary="Perfil de usuario" />
      </ListItemButton>

      <ListItemButton
        sx={{ "&:hover": { backgroundColor: theme.palette.primary.main } }}
        onClick={() => navigate("/contacts")}
      >
        <ListItemIcon>
          <PeopleIcon sx={{ color: theme.palette.primary.light }} />
        </ListItemIcon>
        <ListItemText primary="Contactos" />
      </ListItemButton>

      <ListItemButton
        sx={{ "&:hover": { backgroundColor: theme.palette.primary.main } }}
        onClick={() => navigate("/my-events")}
      >
        <ListItemIcon>
          <EventIcon sx={{ color: theme.palette.primary.light }} />
        </ListItemIcon>
        <ListItemText primary="Mis eventos" />
      </ListItemButton>

      <ListItemButton
        sx={{ "&:hover": { backgroundColor: theme.palette.primary.main } }}
        onClick={() => navigate("/notifications")}
      >
        <ListItemIcon>
          <NotificationsActiveIcon
            sx={{ color: theme.palette.primary.light }}
          />
        </ListItemIcon>
        <ListItemText primary="Notificaciones" />
      </ListItemButton>

    </React.Fragment>
  );
};
