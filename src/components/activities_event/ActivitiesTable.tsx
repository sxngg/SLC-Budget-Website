import React, { useState } from "react";
import {
  Badge,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Grid,
  Button,
  TablePagination,
  Typography,
} from "@mui/material";
import { useStyles } from "./ActivitiesTableStyle";
import Paper from "@mui/material/Paper";
import { TActivityResponse } from "../../types";
import PaidIcon from "@mui/icons-material/Paid";
import AddCardIcon from "@mui/icons-material/AddCard";

type TActivitiesTableProps = {
  activities: TActivityResponse[];
  handlePayActivity: (activityId: number, value: number) => void;
};

export const ActivitiesTable: React.FC<TActivitiesTableProps> = ({
  activities,
  handlePayActivity,
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
  const endIndex = Math.min(startIndex + rowsPerPage, activities.length);

  return (
    <Grid item xs={12} component={Paper} elevation={1} sx={useStyles.paper3}>
      <Box sx={useStyles.boxPaper}>
        <Card>
          <CardHeader
            title={
              <>
                Actividades del evento
                <Badge
                  badgeContent={activities.length}
                  color="secondary"
                  sx={{ ml: 2 }}
                ></Badge>
              </>
            }
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Descripción</TableCell>
                <TableCell>Valor de la actividad</TableCell>
                <TableCell>Pagar</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {activities.slice(startIndex, endIndex).map((activity, index) => (
                <TableRow key={index}>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell>$ {activity.value} (COP)</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        !activity.isPaid
                          ? handlePayActivity(activity.id, activity.value)
                          : null;
                      }}
                    >
                      {!activity.isPaid ? (
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
            count={activities.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Box>
    </Grid>
  );
};
