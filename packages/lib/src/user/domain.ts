import { Company } from "../profile";

export enum UserRole {
  admin = "admin",
  moderator = "moderator",
  user = "user",
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  username: string;
  image: string;
  company: Company;
  role: UserRole;
}
