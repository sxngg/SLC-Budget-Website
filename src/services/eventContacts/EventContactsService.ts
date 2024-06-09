import CONSTANTS from "../../constants";
import { EventContactsPaginationResponse } from "../../types";
import { fetchPage } from "../UtilService";
import { TokenService } from "../token/TokenService";

export const getEventContactsById = async (eventId: string) => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    const url = `${CONSTANTS.BASE_URL}${CONSTANTS.GET_EVENT_CONTACTS_BY_EVENT}/${eventId}`;
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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get event request error:", error);
    throw error;
  }
}; 

export const getEventContactsByEventId = async (eventId: string) => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    let url = `${CONSTANTS.BASE_URL}${CONSTANTS.GET_EVENT_CONTACTS_BY_EVENT}/${eventId}?page=${0}`;
    const initialResponse = await fetchPage(url, token);
    const totalPages = initialResponse?.totalPages || 1;

    const pagePromises = [];
    for (let page = 1; page < totalPages; page++) {
      url = `${CONSTANTS.BASE_URL}${CONSTANTS.GET_EVENT_CONTACTS_BY_EVENT}/${eventId}?page=${page}`;
      pagePromises.push(fetchPage(url, token));
    }

    const responses = await Promise.all(pagePromises);

    const allContacts: EventContactsPaginationResponse = responses.reduce(
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
    return allContacts;
  } catch (error) {
    console.error("Get event contacts request error:", error);
    throw error;
  }
};