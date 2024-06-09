import React, { useState } from 'react'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import { IEventWithId, IParticipantEvents } from '../../types';
import Paper from "@mui/material/Paper";
import CONSTANTS from '../../constants';
import EditIcon from '@mui/icons-material/Edit';

type TEventsTableProps = {
  events: (IEventWithId | IParticipantEvents)[];
  handleEditEvent:  (event: IEventWithId, isOwner: boolean) => void
  ownOrParticipant: "own" | "participant";
}

export const EventsTable:React.FC<TEventsTableProps> = ({
  events,
  handleEditEvent,
  ownOrParticipant
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (_: unknown, newPage: number) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, events.length);
  return (
    <Box>
      {(events.length > 0) ? (
        <Card>
          {ownOrParticipant == "own" ? (
            <>
              <CardHeader sx={{textAlign:"center"}}
              title={
                <>
                  Eventos creados
                  <Badge
                    badgeContent={events?.length}
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
                      <TableCell>Tipo de evento</TableCell>
                      <TableCell>Editar</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {events
                      .slice(startIndex, endIndex)
                      .map((event, index) => (
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
                                  event.picture
                                    ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${event.picture}`
                                    : ""
                                }
                                alt={event.name}
                              />
                              {event.name}
                            </div>
                          </TableCell>
                          <TableCell>{event.description}</TableCell>
                          <TableCell>{event.type}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              onClick={() => handleEditEvent(event, true)}
                            >
                              <EditIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[3, 5, 10]}
                  component="div"
                  count={events.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </>
          ) : (
            <>
              <CardHeader sx={{textAlign:"center"}}
              title={
                <>
                  Eventos de los que soy parte
                  <Badge
                    badgeContent={events.length}
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
                      <TableCell>Tipo de evento</TableCell>
                      <TableCell>Editar</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {events
                      .slice(startIndex, endIndex)
                      .map((event, index) => (
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
                                  event.picture
                                    ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${event.picture}`
                                    : ""
                                }
                                alt={event.name}
                              />
                              {event.name}
                            </div>
                          </TableCell>
                          <TableCell>{event.description}</TableCell>
                          <TableCell>{event.type}</TableCell>
                          <TableCell>
                            <Button sx={{whiteSpace: "nowrap"}}
                              variant="outlined"
                              onClick={() => handleEditEvent(event, false)}
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
                  count={events.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </>
          )}
        </Card>
      ) : (
        <Typography sx={{color:"white"}}> No hay eventos para mostrar </Typography>
      )
      }
    </Box>
  )
}
