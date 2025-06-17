import { fetchUserIdByEmail } from "@/lib/api/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUserIdQuery = (
  email: string,
  enabled: boolean = false // default to false unless explicitly passed
) => {
  return useQuery<{ id: string }>({
    queryKey: ["user", email],
    queryFn: () => fetchUserIdByEmail(email),
    enabled: enabled && !!email, // only run if explicitly enabled and email is non-empty
  });
};
