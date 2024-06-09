import CONSTANTS from "../../constants";
import { ActivitiesPaginationResponse, TActivityCreate, TEventDataEdit } from "../../types";
import { fetchPage } from "../UtilService";
import { TokenService } from "../token/TokenService";

export const createActivity = async (activity: TActivityCreate) => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }
    try {
        const response = await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.CREATE_ACTIVITY}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(activity),
        });

        if (!response.ok) {
            throw new Error(`Create activity request failed: ${response.status} ${response.text}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Create activity errror',err);
        throw err;
    }
};

export const editEvent = async (eventDataEdit: TEventDataEdit) => {
  const token = TokenService.getToken();

  const formData = new FormData();
  formData.append('eventData', new Blob([JSON.stringify(eventDataEdit.editForm)], { type: 'application/json' }));
  if (eventDataEdit.picture) {
    formData.append('picture', eventDataEdit.picture);
  }
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    const res = await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.UPDATE_EVENT}/${eventDataEdit.eventId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
    },
      body: formData,
    });

    if(!res.ok){
      throw new Error(`Edit event request failed: ${res.status} ${res.text}`);
    }

    const data = await res.json();
    return data;
  } catch(err) {
    console.error('Edit event request error',err);
    throw err;
  }
}

export const getActivitByEvent = async (eventId: string) => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    const url = `${CONSTANTS.BASE_URL}${CONSTANTS.GET_ACTIVITY_BY_EVENT}/${eventId}`;
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

export const getActivitiesByEvent = async (eventId: string) => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    let url = `${CONSTANTS.BASE_URL}${CONSTANTS.GET_ACTIVITY_BY_EVENT}/${eventId}?page=${0}`;
    const initialResponse = await fetchPage(url, token);
    const totalPages = initialResponse?.totalPages || 1;

    const pagePromises = [];
    for (let page = 1; page < totalPages; page++) {
      url = `${CONSTANTS.BASE_URL}${CONSTANTS.GET_ACTIVITY_BY_EVENT}/${eventId}?page=${page}`;
      pagePromises.push(fetchPage(url, token));
    }

    const responses = await Promise.all(pagePromises);
    const allActivities: ActivitiesPaginationResponse = responses.reduce(
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
    return allActivities;
  } catch (error) {
    console.error("Get event contacts request error:", error);
    throw error;
  }
}; 