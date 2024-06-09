import CONSTANTS from "../../constants";
import { DebtsPaginationResponse, TPayDebtRequest } from "../../types";
import { fetchPage } from "../UtilService";
import { TokenService } from "../token/TokenService";

export const getDebtsByDebtor = async (debtorId: string) => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    let url = `${CONSTANTS.BASE_URL}${CONSTANTS.GET_DEBTS_BY_DEBTOR}/${debtorId}?page=${0}`;
    const initialResponse = await fetchPage(url, token);
    const totalPages = initialResponse?.totalPages || 1;

    const pagePromises = [];
    for (let page = 1; page < totalPages; page++) {
      url = `${CONSTANTS.BASE_URL}${CONSTANTS.GET_DEBTS_BY_DEBTOR}/${debtorId}?page=${page}`;
      pagePromises.push(fetchPage(url, token));
    }

    const responses = await Promise.all(pagePromises);
    const allDebts: DebtsPaginationResponse = responses.reduce(
      (accumulator, currentResponse) => {
        if (accumulator.content && currentResponse.content) {
          accumulator.content = accumulator.content.concat(currentResponse.content);
        }
        accumulator.totalElements = currentResponse.totalElements || 0;
        return accumulator;
      },
      {
        content: initialResponse?.content || [],
        pageable: initialResponse?.pageable || {},
        totalPages: totalPages,
        totalElements: initialResponse?.totalElements || 0,
        last: false,
        size: 0,
        number: 0,
        sort: initialResponse?.sort || {},
        numberOfElements: 0,
        first: false,
        empty: false,
      }
    );
    return allDebts;
  } catch (error) {
    console.error("Get debts by debtor request error:", error);
    throw error;
  }
}; 

export const getDebtsByCreditor = async (creditorId: string) => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    let url = `${CONSTANTS.BASE_URL}${CONSTANTS.GET_DEBTS_BY_CREDITOR}/${creditorId}?page=${0}`;
    const initialResponse = await fetchPage(url, token);
    const totalPages = initialResponse?.totalPages || 1;

    const pagePromises = [];
    for (let page = 1; page < totalPages; page++) {
      url = `${CONSTANTS.BASE_URL}${CONSTANTS.GET_DEBTS_BY_CREDITOR}/${creditorId}?page=${page}`;
      pagePromises.push(fetchPage(url, token));
    }

    const responses = await Promise.all(pagePromises);
    const allDebts: DebtsPaginationResponse = responses.reduce(
      (accumulator, currentResponse) => {
        if (accumulator.content && currentResponse.content) {
          accumulator.content = accumulator.content.concat(currentResponse.content);
        }
        accumulator.totalElements = currentResponse.totalElements || 0;
        return accumulator;
      },
      {
        content: initialResponse?.content || [],
        pageable: initialResponse?.pageable || {},
        totalPages: totalPages,
        totalElements: initialResponse?.totalElements || 0,
        last: false,
        size: 0,
        number: 0,
        sort: initialResponse?.sort || {},
        numberOfElements: 0,
        first: false,
        empty: false,
      }
    );
    return allDebts;
  } catch (error) {
    console.error("Get debts by creditor request error:", error);
    throw error;
  }
};

export const payDebt = async (payDebt: TPayDebtRequest) => {
  const token = TokenService.getToken();

  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    const response = await fetch(
      `${CONSTANTS.BASE_URL}${CONSTANTS.PAY_DEBT}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payDebt),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Payment request failed: ${response.status} ${response.text}`
      );
    }
    const data = await response.text();

    if (data === "Pagado") {
      return { status: "Pagado" };
    }

    return data;
  } catch (err) {
    console.error("Pay debt error", err);
    throw err;
  }
};
