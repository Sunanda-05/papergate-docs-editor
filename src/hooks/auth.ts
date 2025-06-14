"use client"

import { useMutation } from "@tanstack/react-query";
import { login, logout, registerUser } from "@/lib/api/auth";
import { RegisterInput, User } from "@/types/auth";
import { useAuthStore } from "@/stores/auth-store";

export const useRegisterMutation = () => {
  return useMutation<User, Error, RegisterInput>({
    mutationFn: registerUser,
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      useAuthStore.getState().logout();
    },
  });
};