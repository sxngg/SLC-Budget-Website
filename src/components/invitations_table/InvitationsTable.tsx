import React, { useState } from 'react'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { TInvitationEventInfoResponse } from '../../types';
import Paper from "@mui/material/Paper";
import CONSTANTS from '../../constants';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CloseIcon from '@mui/icons-material/Close';

type TInvitationsTableProps = {
  invitations: TInvitationEventInfoResponse[];
  handleAcceptInvitation: (invitationId: number) => Promise<void>;
}

export const InvitationsTable:React.FC<TInvitationsTableProps> = ({
  invitations,
  handleAcceptInvitation,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [invitationInfo, setInvitationInfo] = useState<TInvitationEventInfoResponse>();
  const [openModal, setOpenModal] = useState(false);

  const handleChangePage = (_: unknown, newPage: number) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, invitations.length);
  return (
    <Box>
      {(invitations.length > 0) ? (
        <Card>
          <CardHeader
          title={
            <>
              Invitaciones a eventos
              <Badge
                badgeContent={invitations.length}
                color="secondary"
                sx={{ ml: 2 }}
              ></Badge>
            </>
            }
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Ver</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {invitations
                  .slice(startIndex, endIndex)
                  .map((invitation, index) => (
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
                              invitation.eventPicture
                                ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${invitation.eventPicture}`
                                : ""
                            }
                            alt={invitation.eventName}
                          />
                          {invitation.eventName}
                        </div>
                      </TableCell>
                      <TableCell>{invitation.eventDescription}</TableCell>
                      <TableCell>{invitation.invitation_state}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setOpenModal(true);
                            setInvitationInfo(invitation);
                          }}
                        >
                          Ver detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[3, 5, 10]}
              component="div"
              count={invitations.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>

          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Card style={{ width: 400, margin: 'auto', marginTop: 80, padding: 16, textAlign: "center" }}>
              <CardHeader title="Información" />
              {invitationInfo && (
                <CardContent>
                  <Divider />
                  <Typography variant="overline" display="block" gutterBottom>
                    Datos del evento
                  </Typography>
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      marginRight: 2,
                    }}
                    src={invitationInfo.eventPicture
                      ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${invitationInfo.eventPicture}`
                      : ''}
                    alt={invitationInfo.eventName}
                  />
                  <p>Nombre: {invitationInfo.eventName}</p>
                  <p>Descripción: {invitationInfo.eventDescription}</p>
                  <Divider />
                  <Typography variant="overline" display="block" gutterBottom>
                    Datos del creador
                  </Typography>
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      marginRight: 2,
                    }}
                    src={invitationInfo.eventOwnerProfileImage
                      ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${invitationInfo.eventOwnerProfileImage}`
                      : ''}
                    alt={invitationInfo.eventOwnerName}
                  />
                  <Typography variant="subtitle1" gutterBottom>
                    {invitationInfo.eventOwnerName}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {invitationInfo.eventOwnerEmail}
                  </Typography>

                  <Button variant="contained" onClick={() => {
                    handleAcceptInvitation(invitationInfo.invitation_id)
                    setOpenModal(false)
                  }}>
                    <ThumbUpOffAltIcon />
                  </Button>
                  <Button variant="contained" onClick={() => setOpenModal(false)}>
                    <CloseIcon />
                  </Button>
                </CardContent>
              )}
            </Card>
          </Modal>
        </Card>
      ) : (
        <Typography> No hay eventos </Typography>
      )
      }
    </Box>
  )
}
