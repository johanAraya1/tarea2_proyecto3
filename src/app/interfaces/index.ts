export interface ILoginResponse {
  accessToken: string;
  expiresIn: number
}

export interface IResponse<T> {
  data: T;
}

export interface IUser {
  id?: number;
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  authorities?: IAuthority[];
  role?: IRole
}

export interface IAuthority {
  authority: string;
}

export interface IFeedBackMessage {
  type?: IFeedbackStatus;
  message?: string;
}

export enum IFeedbackStatus {
  success = "SUCCESS",
  error = "ERROR",
  default = ''
}

export enum IRoleType {
  user = "ROLE_USER",
  superAdmin = 'ROLE_SUPER_ADMIN_ROLE'
}

export interface IRole {
  createdAt: string;
  description: string;
  id: number;
  name : string;
  updatedAt: string;
}

export interface IGame {
  id?: number;
  name?: string;
  imgURL?: string;
  status?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IOrder {
  id?: number;
  description?: string;
  total?: number;
}

export interface ISearch {
  page?: number;
  size?: number;
  pageNumber?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?:number;
}

export interface IProduct {
  id?: number;
  description?: string;
  name?: string;
  price?: number;
  stock?: number;
  category_id?:number;
}

export interface ICategory {
  id?: number;
  description?: string;
  name?: string;
}