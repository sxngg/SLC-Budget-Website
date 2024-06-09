import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { TInvitationEventInfoResponse } from '../../types';
import Paper from "@mui/material/Paper";
import CONSTANTS from '../../constants';
import { useNavigate } from 'react-router-dom';

type TInvitationsTableProps = {
  invitations: TInvitationEventInfoResponse[];
  handleAcceptInvitation: (invitationId: number) => Promise<void>;
}

export const NotificationInvTable:React.FC<TInvitationsTableProps> = ({
  invitations
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [, setInvitationInfo] = useState<TInvitationEventInfoResponse>();
  const navigate = useNavigate();

  const handleChangePage = (_: unknown, newPage: number) => {
      setPage(newPage);
  };

  const handleViewDetails = (invitation: TInvitationEventInfoResponse) => {
    setInvitationInfo(invitation);
    navigate('/notifications/');
  }

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
              Invitaciones
            </>
            }
          />
          <TableContainer component={Paper}>
            <Table>

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
                            handleViewDetails(invitation);
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
              rowsPerPageOptions={[3,10,20]}
              component="div"
              count={invitations.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Card>
      ) : (
        <Typography> No hay notificaciones nuevas </Typography>
      )
      }
    </Box>
  )
}
