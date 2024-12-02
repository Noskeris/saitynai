import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addParticipant,
    removeParticipant,
    getTimeslotParticipants,
} from "../services/api";
import toastService from "../services/toast-service";

export const useGetTimeslotParticipants = (organizationId, eventId, timeslotId) => {
    return useQuery({
        queryKey: ["get-timeslot-participants", organizationId, eventId, timeslotId],
        queryFn: () => getTimeslotParticipants(organizationId, eventId, timeslotId),
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: 1,
    });
}

export const useAddParticipant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (organizationId, eventId, timeSlotId) => addParticipant(organizationId, eventId, timeSlotId),
        onSuccess: () => {
            queryClient.invalidateQueries("get-timeslot-participants");
            toastService.success("Sign up successful");
        },
        retry: 1,
    });
};

export const useRemoveParticipant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (organizationId, eventId, timeSlotId, participantId) => removeParticipant(organizationId, eventId, timeSlotId, participantId),
        onSuccess: () => {
            queryClient.invalidateQueries("get-timeslot-participants");
            toastService.success("Participantion successfully withdrawn");
        },
        retry: 1,
    });
};