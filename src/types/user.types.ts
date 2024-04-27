export type User = {
  userId: string;
  name: string;
  email: string;
  password: string;
};

export type SignUpUser = User;

export type SignInUser = Pick<User, "userId" | "password">;
