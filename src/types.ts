//Type for Login form
export type TLoginUser = {
  email: string;
  password: string;
};

//USER

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  lastName: string;
  username: string;
  profileImage: string;
  balance: number;
}
export interface IUser {
  email: string;
  name: string;
  lastName: string;
  username: string;
  password: string;
  roles: string[];
}

export interface IUserWithId extends IUser {
  id: string;
  profileImage: string;
}

export type TProfileForEdit = {
  name: string;
  lastName: string;
  username: string;
  password: string;
};

export type TEditUser = {
  editForm: TProfileForEdit;
  id: string;
  profileImage: File | null;
};

//Componente Contacts
export type TContactState = {
  email: string;
  contactInfo: IUserWithId | null;
  modalOpen: boolean;
};

// Event
export enum ETypeEvent {
  VIAJE,
  HOGAR,
  PAREJA,
  COMIDA,
  OTRO,
}

export interface IEvent {
  name: string;
  description: string;
  type: string;
  owner_id: string;
}

export interface IEventWithId extends IEvent {
  event_id: string;
  picture: string;
}

export interface IParticipantEvents extends IEventWithId {
  ownerProfileImage: string | null;
  ownerName: string;
  ownerEmail: string;
  ownerUsername: string;
}

export type TEventForEdit = {
  name: string;
  description: string;
  type: string;
};

export type TEventDataEdit = {
  editForm: TEventForEdit;
  eventId: string;
  picture: File | null;
};

// Invitation

export type TInvitationCreate = {
  eventId: string;
  contactId: string;
};

export type TInvitationContactInfoResponse = {
  contactName: string;
  contactLastName: string;
  contactUsername: string;
  contactId: number;
  contactEmail: string;
  contactProfileImage: string | null;
  invitation_id: number;
  invitation_state: string;
};

export interface TInvitationEventInfoResponse {
  eventPicture: string | null;
  eventName: string;
  eventDescription: string;
  eventOwnerProfileImage: string | null;
  eventOwnerId: string;
  eventOwnerName: string;
  eventOwnerEmail: string;
  invitation_id: number;
  eventType: string;
  event_id: number;
  invitation_state: string;
  viewed: boolean;
}

// Event contacts
export type TEventContactsResponse = {
  contactEmail: string;
  contactName: string;
  contactId: number;
  contactProfileImage: string | null;
  event_contact_id: number;
  contactLastName: string;
  contactUsername: string;
  balance: number;
};

// Activities
export type TParticipationData = {
  [key: string]: {
    participationPercentage: number;
    staticValue: number;
  };
};

export type TActivityCreate = {
  description: string;
  eventId: string;
  value: number;
  participationData: TParticipationData | null;
};

export type TActivityResponse = {
  id: number;
  description: string;
  value: number;
  isPaid: boolean;
};

// Payments
export interface TPaymentRequest {
  activityId: number;
  payerId: number;
  eventId: number;
  amount: number;
}

// Debts
export interface TDebtsResponse {
  userDebtorId:      number;
  userDebtorName:      string;
  userDebtorEmail:     string;
  userCreditorId:      number;
  userCreditorName:    string;
  userCreditorEmail:   string;
  userCreditorPicture: null;
  amount:              number;
  userDebtorPicture:   null;
  isPaid:              boolean;
}

export interface TPayDebtRequest {
  creditorId: number;
  debtorId:   number;
  amount:     number;
}

// Pagination
export type EventPaginationResponse = {
  content: IEventWithId[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};
export interface PaginationResponse<T> {
  content: T[] | null;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export type ContactPaginationResponse = PaginationResponse<IUserWithId>;
export type EventsPaginationResponse = PaginationResponse<IEventWithId>;
export type ParticipantEventsPaginationResponse =
  PaginationResponse<IParticipantEvents>;
export type InvitationsPaginationResponse =
  PaginationResponse<TInvitationContactInfoResponse>;
export type InvitationsEventPaginationResponse =
  PaginationResponse<TInvitationEventInfoResponse>;
export type EventContactsPaginationResponse =
  PaginationResponse<TEventContactsResponse>;
export type ActivitiesPaginationResponse =
  PaginationResponse<TActivityResponse>;
export type DebtsPaginationResponse =
  PaginationResponse<TDebtsResponse>;
