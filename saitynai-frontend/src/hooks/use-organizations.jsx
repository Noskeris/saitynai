import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrganization,
  deleteOrganization,
  getOrganizationsList,
  getOrganization,
  updateOrganization,
} from "../services/api";
import toastService from "../services/toast-service";

export const useGetOrganizationsList = () => {
    return useQuery({
        queryKey: ["get-organizations-list"],
        queryFn: getOrganizationsList,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: 1,
      });
    };

export const useGetOrganization = (id) => {
    return useQuery({
        queryKey: ["get-organization", id],
        queryFn: () => getOrganization(id),
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: 1,
    });
}

export const useCreateOrganization = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (organization) => createOrganization(organization),
        onSuccess: async () => {
            queryClient.invalidateQueries("get-organization");
            toastService.success("Organization created successfully");
        },
        retry: 1,
      });
};

export const useUpdateOrganization = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (organization) => updateOrganization(organization.id, organization),
        onSuccess: () => {
            queryClient.invalidateQueries("get-organization");
            toastService.success("Organization updated successfully");
        },
        retry: 1,
      });
};

export const useDeleteOrganization = () => {
    return useMutation({
        mutationFn: (id) => deleteOrganization(id),
        onSuccess: async () => {
            toastService.success("Organization deleted successfully");
        },
        retry: 1,
      });
};