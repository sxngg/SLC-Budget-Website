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

import { TDebtsResponse } from '../../types';
import Paper from "@mui/material/Paper";
import CONSTANTS from '../../constants';
import AddCardIcon from "@mui/icons-material/AddCard";
import PaidIcon from "@mui/icons-material/Paid";

type TEventsTableProps = {
  debtors: TDebtsResponse[];
  handlePayDebt: (debt: TDebtsResponse) => void;
}

export const DebtsTable:React.FC<TEventsTableProps> = ({
  debtors,
  handlePayDebt,
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
  const endIndex = Math.min(startIndex + rowsPerPage, debtors.length);
  return (
    <Box>
      {(debtors.length > 0) ? (
        <Card>
            <>
              <CardHeader sx={{textAlign:"center"}}
              title={
                <>
                  Mis deudas
                  <Badge
                    badgeContent={debtors?.length}
                    color="secondary"
                    sx={{ ml: 2 }}
                  ></Badge>
                </>
              }
              subheader={"Contactos a los que les debo"}
              />
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Monto</TableCell>
                      <TableCell>Pagar</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {debtors
                      .slice(startIndex, endIndex)
                      .map((debt, index) => (
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
                                  debt.userCreditorPicture
                                    ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${debt.userCreditorPicture}`
                                    : ""
                                }
                                alt={debt.userCreditorName}
                              />
                              {debt.userCreditorName}
                            </div>
                          </TableCell>
                          <TableCell>{debt.userCreditorEmail}</TableCell>
                          <TableCell>{debt.amount}</TableCell>
                          <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() =>
                              debt.amount > 0
                                ? handlePayDebt(debt)
                                : null
                            }
                          >
                            {debt.amount > 0 ? (
                              <>
                                <AddCardIcon />
                                <Typography color={"gray"}> Pagar </Typography>
                              </>
                            ) : (
                              <>
                                <PaidIcon />
                                <Typography color={"gray"}> Pagado </Typography>
                              </>
                            )}
                          </Button>
                        </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[3, 5, 10]}
                  component="div"
                  count={debtors.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </>
        </Card>
      ) : (
        <Typography sx={{color:"white"}}> No le debes a nadie </Typography>
      )
      }
    </Box>
  )
}
