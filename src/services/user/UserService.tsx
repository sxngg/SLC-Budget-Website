import CONSTANTS from "../../constants";
import { TLoginUser, IUser, TEditUser, ContactPaginationResponse, EventsPaginationResponse } from "../../types";
import { fetchPage } from "../UtilService";
import { TokenService } from "../token/TokenService";

export const registerUser = async (user: IUser, profileImage: File | null) => {
  const formData = new FormData();
  formData.append('createUserDTO', new Blob([JSON.stringify(user)], { type: 'application/json' }));
  if (profileImage) {
    formData.append('profileImage', profileImage);
  }
  try {
      
      const repoonse = await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.USER_REGISTER}`, {
          method: 'POST',
          body: formData,
      });

      if (!repoonse.ok) {
          throw new Error('POST request failed');
      }
      const data = await repoonse.json();
      return data;
  } catch (err) {
      console.error('POST request errror',err);
      throw err;
  }
};

export const loginUser = async (loginData: TLoginUser) => {
    try {
        const response = await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.USER_LOGIN}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
  
        if (!response.ok) {
            throw new Error('Error al realizar la solicitud POST');
          }
          const data = await response.json();
          if (data.message == "invalid user email or password."){
            throw new Error('Usuario no válido');
          }
          if(data.token){
            TokenService.saveToken(data.token);
            localStorage.setItem('email', data.Username);
          } else {
            console.error('No se encontró un token en la respuesta JSON.');
          }
          return data;
          
      } catch (error) {
        console.error('Error en la solicitud POST:', error);
        throw error;
      }
  };

export const editUser = async (editData: TEditUser) => {
  const token = TokenService.getToken();
  const formData = new FormData();
  formData.append('updatedUser', new Blob([JSON.stringify(editData.editForm)], { type: 'application/json' }));
  if (editData.profileImage) {
    formData.append('profileImage', editData.profileImage);
  }
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    const res = await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.USER_EDIT}/${editData.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
    },
      body: formData,
    });
    if(!res.ok){
      throw new Error('PATCH request failed');
    }
  } catch(err) {
    console.error('PATCH request errror',err);
    throw err;
  }
}

export const getUserByEmail = async (email: string) => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    const url = `${CONSTANTS.BASE_URL}${CONSTANTS.USER_INFO}/${email}`;
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
      throw new Error("GET request failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};

export const getProfilePicture = async (pictureName: string) => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    const url = `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${pictureName}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("GET request failed");
    }

    const blobData = await response.blob(); // Receive the image as a Blob

    if (blobData instanceof Blob) {
      const picture = URL.createObjectURL(blobData); // Convert Blob to a URL
      return picture;
    } else {
      console.error("Invalid response format");
      return null;
    }
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};

export const addContact = async (contactId: string, userId: string) => {
  const contactData = { contactId: contactId };
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }
  try {
    const res = await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.ADD_CONTACT}/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(contactData)
    });
    if(!res.ok){
      throw new Error('POST request failed');
    }
  } catch(err) {
    console.error('POST request errror',err);
    throw err;
  }
}

export const getContactsByUserId = async (userId: string) => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }
  try {
    const url = `${CONSTANTS.BASE_URL}${CONSTANTS.GET_CONTACTS}/${userId}`;
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
      throw new Error("GET request failed");
    }

    const responseData: ContactPaginationResponse = await response.json();
    const contacts = responseData.content;
    const pageInfo = responseData.pageable;
    return {contacts, pageInfo};
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};

export const getEventsByOwner = async (ownerId: string) => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }
  try {
    let url = `${CONSTANTS.BASE_URL}${CONSTANTS.GET_EVENTS_BY_OWNER}/${ownerId}?page=${0}`;
    const initialResponse = await fetchPage(url, token);
    const totalPages = initialResponse?.totalPages || 1;

    const pagePromises = [];
    for (let page = 1; page < totalPages; page++) {
      url = `${CONSTANTS.BASE_URL}${CONSTANTS.GET_EVENTS_BY_OWNER}/${ownerId}?page=${page}`;
      pagePromises.push(fetchPage(url, token));
    }

    const responses = await Promise.all(pagePromises);
    const allEvents: EventsPaginationResponse = responses.reduce(
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
    return allEvents;
  } catch (error) {
    console.error("Get event contacts request error:", error);
    throw error;
  }
};