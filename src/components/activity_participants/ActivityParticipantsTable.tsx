import React, { useState } from 'react'
import {
  Avatar,
  Badge,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Box,
  Grid,
  TextField,
  TablePagination
} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useStyles} from './ActivityParticipantsTableStyle'
import { TActivityCreate, TEventContactsResponse } from '../../types';
import CONSTANTS from '../../constants';


type TActivityParticipantsTableProps = {
  participants: TEventContactsResponse[];
  handleParticipationChange: (key: string, property: string, value: number) => void;
  activityForm: TActivityCreate;
}

export const ActivityParticipantsTable:React.FC<TActivityParticipantsTableProps> = ({
  participants,
  handleParticipationChange,
  activityForm,
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
  const endIndex = Math.min(startIndex + rowsPerPage, participants.length);

  

  return (
    <Grid
      item
      xs={12}
      component={Paper}
      elevation={1}
      sx={useStyles.paper3}
    >
      <Box sx={useStyles.boxPaper}>
        <Card>
          <CardHeader
            sx={{}}
            title={
              <>
                <span>Participantes de la actividad</span>
                <Badge
                  badgeContent={participants.length}
                  color="secondary"
                  sx={{ ml: 3 }}
                />
              </>
            }
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Porcentaje</TableCell>
                  <TableCell>Valor exacto</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participants
                .slice(startIndex, endIndex)
                .map((contact, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          marginRight: 1,
                        }}
                        src={contact.contactProfileImage
                          ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${contact.contactProfileImage}`
                          : ''}
                        alt={contact.contactName}
                      />
                      {contact.contactName}
                    </div>
                  </TableCell>
                  <TableCell>{contact.contactEmail}</TableCell>
                  <TableCell>
                    <TextField
                    label="Porcentaje %"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={activityForm.participationData?.[contact.contactId]?.participationPercentage || ''}
                    onChange={(e) => handleParticipationChange(`${contact.contactId}`, 'participationPercentage', parseFloat(e.target.value))}
                    inputProps={{
                      min: 0,
                      max: 100,
                      step: 0.01,
                    }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                    label="Valor exacto"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={activityForm.participationData?.[contact.contactId]?.staticValue || ''}
                    onChange={(e) => handleParticipationChange(`${contact.contactId}`, 'staticValue', parseFloat(e.target.value))}
                    />
                  </TableCell>
                </TableRow>
                    ))}
              </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[3, 5, 10]}
                component="div"
                count={participants.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Card>
      </Box>
    </Grid>
  )
}
