import { User } from "./domain";

export interface UserPagination {
  users: User[];
  total: number;
  limit: number;
  skip: number;
}

export interface PaginationDto {
  q: string;
  pageParam: number;
}

export interface UserRepository {
  getAll(dto: PaginationDto): Promise<UserPagination>;
}
