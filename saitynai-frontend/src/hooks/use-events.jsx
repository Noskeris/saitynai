import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEvent,
    deleteEvent,
    getEvent,
    getEventsList,
    updateEvent,
} from "../services/api";
import toastService from "../services/toast-service";

export const useGetEventsList = (organizationId) => {
    return useQuery({
        queryKey: ["get-events-list", organizationId],
        queryFn: () => getEventsList(organizationId),
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: 1,
    });
}

export const useGetEvent = (organizationId, eventId) => {
    return useQuery({
        queryKey: ["get-event", organizationId, eventId],
        queryFn: () => getEvent(organizationId, eventId),
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: 1,
    });
}

export const useCreateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({organizationId, event}) => createEvent(organizationId, event),
        onSuccess: () => {
            queryClient.invalidateQueries("get-events-list");
            toastService.success("Event created successfully");
        },
        retry: 1,
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({organizationId, eventId, event}) => updateEvent(organizationId, eventId, event),
        onSuccess: () => {
            queryClient.invalidateQueries("get-events-list");
            queryClient.invalidateQueries("get-event");
            toastService.success("Event updated successfully");
        },
        retry: 1,
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({organizationId, eventId}) => deleteEvent(organizationId, eventId),
        onSuccess: () => {
            queryClient.invalidateQueries("get-events-list");
            toastService.success("Event deleted successfully");
        },
        retry: 1,
    });
};