import React, { useState } from "react";
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

import { TDebtsResponse } from "../../types";
import Paper from "@mui/material/Paper";
import CONSTANTS from "../../constants";
import AddCardIcon from "@mui/icons-material/AddCard";
import PaidIcon from "@mui/icons-material/Paid";

type TCreditorTableProps = {
  creditors: TDebtsResponse[];
  handlePayDebt: (debt: TDebtsResponse) => void;
};

export const CreditorTable: React.FC<TCreditorTableProps> = ({
  creditors,
  handlePayDebt,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, creditors.length);
  return (
    <Box>
      {creditors.length > 0 ? (
        <Card>
          <>
            <CardHeader
              sx={{ textAlign: "center" }}
              title={
                <>
                  Mi dinero pendiente
                  <Badge
                    badgeContent={creditors?.length}
                    color="secondary"
                    sx={{ ml: 2 }}
                  ></Badge>
                </>
              }
              subheader={"Contactos que me deben dinero"}
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
                  {creditors
                    .slice(startIndex, endIndex)
                    .map((creditor, index) => (
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
                                creditor.userDebtorPicture
                                  ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${creditor.userDebtorPicture}`
                                  : ""
                              }
                              alt={creditor.userDebtorName}
                            />
                            {creditor.userDebtorName}
                          </div>
                        </TableCell>
                        <TableCell>{creditor.userDebtorEmail}</TableCell>
                        <TableCell>{creditor.amount}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() =>
                              creditor.amount > 0
                                ? handlePayDebt(creditor)
                                : null
                            }
                          >
                            {creditor.amount > 0 ? (
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
                count={creditors.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </>
        </Card>
      ) : (
        <Typography sx={{ color: "white" }}>
          {" "}
          Nadie te debe dinero{" "}
        </Typography>
      )}
    </Box>
  );
};
