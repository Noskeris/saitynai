import instance from "./axios-client";
import authService from "./auth";
import toastService from "../services/toast-service";

export async function login(user) {
  return await instance
    .post("auth/login", user)
    .then((res) => {
      const token = res.data.accessToken;
      toastService.success("Login successful");
      authService.setCookies(token);
      return { token };
    })
    .catch((err) => {
      toastService.error(err.response.data.Errors.details[0]);
    });
}

export async function register(user) {
  try {
    await instance.post("auth/register", user);
    toastService.success("Register successful");
  } catch (err) {
    toastService.error(err.response.data.Errors.details[0]);
    throw err;
  } 
}

export async function getOrganizationsList() {
  return await instance
    .get(`v1/organizations`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function createOrganization(organization) {
  return await instance
    .post(`v1/organizations`, organization)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function getOrganization(id) {
  return await instance
    .get(`v1/organizations/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function updateOrganization(id, organization) {
  return await instance
    .put(`v1/organizations/${id}`, organization)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function deleteOrganization(id) {
  return await instance
    .delete(`v1/organizations/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function getEventsList(organizationId) {
  return await instance
    .get(`v1/organizations/${organizationId}/events`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function createEvent(organizationId, event) {
  return await instance
    .post(`v1/organizations/${organizationId}/events`, event)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function getEvent(organizationId, eventId) {
  return await instance
    .get(`v1/organizations/${organizationId}/events/${eventId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function updateEvent(organizationId, eventId, event) {
  return await instance
    .put(`v1/organizations/${organizationId}/events/${eventId}`, event)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function deleteEvent(organizationId, eventId) {
  return await instance
    .delete(`v1/organizations/${organizationId}/events/${eventId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function getTimeslotsList(organizationId, eventId) {
  return await instance
    .get(`v1/organizations/${organizationId}/events/${eventId}/time-slots`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function createTimeslot(organizationId, eventId, timeslot) {
  return await instance
    .post(`v1/organizations/${organizationId}/events/${eventId}/time-slots`, timeslot)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function getTimeslot(organizationId, eventId, timeslotId) {
  return await instance
    .get(`v1/organizations/${organizationId}/events/${eventId}/time-slots/${timeslotId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function updateTimeslot(organizationId, eventId, timeslotId, timeslot) {
  return await instance
    .put(`v1/organizations/${organizationId}/events/${eventId}/time-slots/${timeslotId}`, timeslot)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function deleteTimeslot(organizationId, eventId, timeslotId) {
  return await instance
    .delete(`v1/organizations/${organizationId}/events/${eventId}/time-slots/${timeslotId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function getTimeslotParticipants(organizationId, eventId, timeslotId) {
  return await instance
    .get(`v1/organizations/${organizationId}/events/${eventId}/time-slots/${timeslotId}/participants`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function addParticipant({organizationId, eventId, timeSlotId}) {
  return await instance
    .post(`v1/organizations/${organizationId}/events/${eventId}/time-slots/${timeSlotId}/participants`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function removeParticipant({organizationId, eventId, timeSlotId, participantId}) {
  return await instance
    .delete(`v1/organizations/${organizationId}/events/${eventId}/time-slots/${timeSlotId}/participants/${participantId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}