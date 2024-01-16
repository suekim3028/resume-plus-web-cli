export type User = {
  username: string;
  name: string;
  email: string;
  password: string;
};

export type SignUpUser = User;

export type SignInUser = Pick<User, "username" | "password">;
