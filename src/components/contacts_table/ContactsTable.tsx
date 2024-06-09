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
  //Button,
  TablePagination
} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useStyles} from './ContactsTableStyle'
import { TEventContactsResponse } from '../../types';
//import DeleteIcon from '@mui/icons-material/Delete';
import CONSTANTS from '../../constants';


type IContactsTableProps = {
  contacts: TEventContactsResponse[];
}

export const ContactsTable:React.FC<IContactsTableProps> = ({
  contacts,
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
  const endIndex = Math.min(startIndex + rowsPerPage, contacts.length);

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
            sx={{TextAlign:"center"}}
            title={
              <>
                <span>Contactos del evento</span>
                <Badge
                  badgeContent={contacts.length}
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
                  <TableCell>Username</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts
                .slice(startIndex, endIndex)
                .map((contact, index) => (
                <TableRow key={index}>
                  <TableCell>{contact.contactUsername}</TableCell>
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
                  <TableCell>$ {contact.balance} (COP)</TableCell>
                </TableRow>
                    ))}
              </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[3, 5, 10]}
                component="div"
                count={contacts.length}
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
