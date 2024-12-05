import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTimeslot,
    deleteTimeslot,
    getTimeslot,
    getTimeslotsList,
    updateTimeslot,
} from "../services/api";
import toastService from "../services/toast-service";

export const useGetTimeSlotsList = (organizationId, eventId) => {
    return useQuery({
        queryKey: ["get-timeslots-list", organizationId, eventId],
        queryFn: () => getTimeslotsList(organizationId, eventId),
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: 1,
    });
}

export const useGetTimeSlot = (organizationId, eventId, timeslotId) => {
    return useQuery({
        queryKey: ["get-timeslot", organizationId, eventId, timeslotId],
        queryFn: () => getTimeslot(organizationId, eventId, timeslotId),
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: 1,
    });
}

export const useCreateTimeSlot = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({organizationId, eventId, timeSlot}) => createTimeslot(organizationId, eventId, timeSlot),
        onSuccess: () => {
            queryClient.invalidateQueries("get-timeslots-list");
            toastService.success("Timeslot created successfully");
        },
        retry: 1,
    });
};

export const useUpdateTimeSlot = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({organizationId, eventId, timeSlotId, timeSlot}) => updateTimeslot(organizationId, eventId, timeSlotId, timeSlot),
        onSuccess: () => {
            queryClient.invalidateQueries("get-timeslots-list");
            queryClient.invalidateQueries("get-timeslot");
        },
        retry: 1,
    });
};

export const useDeleteTimeSlot = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({organizationId, eventId, timeSlotId}) => deleteTimeslot(organizationId, eventId, timeSlotId),
        onSuccess: () => {
            queryClient.invalidateQueries("get-timeslots-list");
            toastService.success("Timeslot deleted successfully");
        },
        retry: 1,
    });
};