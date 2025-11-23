import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMainCategory } from "../api/services";

export function useDeleteMainCategory() {
  const queryClient = useQueryClient();
  const {
    isPending: isDeletingMainCategory,
    mutate: mutateDeleteMainCategory,
  } = useMutation({
    mutationFn: deleteMainCategory,
    onSuccess: () => {
      queryClient.invalidateQueries("getServices");
    },
  });
  return { isDeletingMainCategory, mutateDeleteMainCategory };
}
