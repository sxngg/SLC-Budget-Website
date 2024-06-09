import { useEffect, useState } from "react";
import { useStyles } from "./HomeStyles";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../components/materialUI-common";
import { Container, CssBaseline } from "@mui/material";
import { Grid } from "@mui/material";
import LoadingScreen from "../../components/loading_screen/LoadingScreen";
import { TDebtsResponse, TPayDebtRequest } from "../../types";
import { useAppSelector } from "../../hooks/store";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/loading/loadingSlice";
import { getDebtsByCreditor, getDebtsByDebtor, payDebt } from "../../services/debts/DebtsService";
import { DebtsTable } from "../../components/debts_table/DebtsTable";
import { CreditorTable } from "../../components/debts_table/CreditorTable";
import { Toaster, toast } from "sonner";

const Home: React.FC = () => {

  // #region Estados
  const [debtor, setDebtor] = useState<TDebtsResponse[] | null>(null);
  const [creditor, setCreditor] = useState<TDebtsResponse[] | null>(null);

  // #endregion

  // #region Store
  // Slice
  const user = useAppSelector((state) => state.user);
  const isLoading = useAppSelector((state) => state.loading);

  // Actions
  const dispatch = useDispatch();
  // #endregion

  // #region useEffect inicial

  const fetchUserData = async () => {
    dispatch(startLoading());
    try {
      const responseDebtor = await getDebtsByDebtor(user.id);
      if (responseDebtor) {
        const { content } = responseDebtor;
        const myDebts: TDebtsResponse[] | null = content;
        setDebtor(myDebts);
      }
    } catch (err) {
      console.error("Error al obtener los debitos propios", err);
    }
    try {
      const responseCreditor = await getDebtsByCreditor(user.id);
      if (responseCreditor) {
        const { content } = responseCreditor;
        const myCredits: TDebtsResponse[] | null = content;
        setCreditor(myCredits);
      }
    } catch (err) {
      console.error("Error al obtener los creditos propios", err);
    } finally {
      dispatch(stopLoading());
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  // #endregion

  // #region handleEditEvent
  const handlePayDebt = async (debt: TDebtsResponse) => {
    dispatch(startLoading());
    try {
      const request: TPayDebtRequest = {
        creditorId: debt.userCreditorId,
        debtorId: debt.userDebtorId,
        amount: debt.amount
      }
      console.log('debt', request);
      await payDebt(request);
      toast.success("Pago realizado con éxito")
      fetchUserData();
    } catch (e) {
      console.error('Error paying debt');
      toast.error("Error en el pago")
    } finally {
      dispatch(stopLoading());
    }
  };
  // #endregion

  return (
    <>
      <CssBaseline />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg">
            <Grid
              container
              component="main"
              flexDirection="row"
              sx={{ width: "sm", height: "md" }}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                component={Paper}
                elevation={1}
                sx={useStyles.paper}
              >
                <DebtsTable
                  debtors={debtor ?? []}
                  handlePayDebt={handlePayDebt}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                component={Paper}
                elevation={1}
                sx={useStyles.paper}
              >
                <CreditorTable
                  creditors={creditor ?? []}
                  handlePayDebt={handlePayDebt}
                />
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      )}
      <Toaster></Toaster>
    </>
  );
};

export default Home;
