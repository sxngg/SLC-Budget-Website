import CONSTANTS from "../../constants";
import { InvitationsPaginationResponse, TInvitationContactInfoResponse, InvitationsEventPaginationResponse, TPaymentRequest } from "../../types";
import { fetchPage } from "../UtilService";
import { TokenService } from "../token/TokenService";

export const payActivity = async (invitationData: TPaymentRequest) => {
  const token = TokenService.getToken();

  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    const response = await fetch(
      `${CONSTANTS.BASE_URL}${CONSTANTS.PAY_ACTIVITY}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invitationData),
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
    console.error("Create invitation errror", err);
    throw err;
  }
};

export const getInvitationsByEvent = async (eventId: string) => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    const url = `${CONSTANTS.BASE_URL}${CONSTANTS.GET_INVITATIONS_BY_EVENT}/${eventId}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Get event request failed: ${response.status} ${response.text}`);
    }

    const responseData: InvitationsPaginationResponse  = await response.json();
    const invitations = responseData.content;
    const pageInfo = responseData.pageable;

    return { invitations, pageInfo };
  } catch (error) {
    console.error("Get event request error:", error);
    throw error;
  }
}; 

export const updateInvitation = async (invitationId: number, newInvitationState: "ACCEPTED" | "PENDING" | "REJECTED") => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    const url = `${CONSTANTS.BASE_URL}${CONSTANTS.UPDATE_INVITATION}/${invitationId}?invitationState=${newInvitationState}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Get event request failed: ${response.status} ${response.text}`);
    }

    const responseData: TInvitationContactInfoResponse  = await response.json();
    return responseData;
  } catch (error) {
    console.error("Get event request error:", error);
    throw error;
  }
}; 

export const getInvitationsByUserId = async (userId: string) => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    let url = `${CONSTANTS.BASE_URL}${CONSTANTS.GET_INVITATIONS_BY_USER}/${userId}?page=${0}`;
    const initialResponse = await fetchPage(url, token);
    const totalPages = initialResponse?.totalPages || 1;

    const pagePromises = [];
    for (let page = 1; page < totalPages; page++) {
      url = `${CONSTANTS.BASE_URL}${CONSTANTS.GET_INVITATIONS_BY_USER}/${userId}?page=${page}`;
      pagePromises.push(fetchPage(url, token));
    }

    const responses = await Promise.all(pagePromises);

    const finalResponse: InvitationsEventPaginationResponse = responses.reduce(
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
    return finalResponse;
  } catch (error) {
    console.error("Get event contacts request error:", error);
    throw error;
  }
};