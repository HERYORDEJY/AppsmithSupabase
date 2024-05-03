export type AuthenticationContextType = {
  user: UserType | null;
  onSignIn: (user: UserType) => Promise<void>;
  onSignUp: (user: UserType) => Promise<void>;
  onSignOut: () => Promise<void>;
  isAppReady: boolean;
};

export type UserType = {
  email: string;
};
