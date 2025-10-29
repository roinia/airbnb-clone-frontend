import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFTOKEN",
  withXSRFToken: true,
});

export const getMe = () =>
  axiosInstance.get("users/me").then((response) => response.data);

export const logOut = () =>
  axiosInstance.post("users/log-out").then((response) => response.data);

export const githubLogIn = (code: string) =>
  axiosInstance
    .post("users/github", { code })
    .then((response) => response.status);

export const kakaoLogIn = (code: string) =>
  axiosInstance
    .post("users/kakao", { code })
    .then((response) => response.status);

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}

export interface IUsernameLoginSuccess {
  ok: string;
}

export interface IUsernameLoginError {
  error: string;
}

export interface ISignUpVariables {
  username: string;
  name: string;
  password: string;
  email: string;
}

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  axiosInstance
    .post("users/log-in", { username, password })
    .then((response) => response.data);

export const signUp = ({ username, name, password, email }: ISignUpVariables) =>
  axiosInstance
    .post("users/sign-up", { username, name, password, email })
    .then((response) => response.data);

export const getRooms = () =>
  axiosInstance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return axiosInstance.get(`rooms/${roomPk}`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return axiosInstance
    .get(`rooms/${roomPk}/reviews`)
    .then((response) => response.data);
};

export const getAmenities = () =>
  axiosInstance.get("rooms/amenities/").then((response) => response.data);

export const getCategories = () =>
  axiosInstance.get("categories/").then((response) => response.data);

export interface IUploadRoomVariables {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}

export const uploadRoom = (variables: IUploadRoomVariables) =>
  axiosInstance.post("rooms/", variables).then((response) => response.data);

export const uploadImage = (files: FileList) => {
  const formData = new FormData();
  formData.append("file", files[0]);
  return axiosInstance
    .post(`medias/photos`, formData)
    .then((response) => response.data);
};

export interface ICreatePhotoVariables {
  roomPk: string;
  file: string;
  description: string;
}

export const createPhoto = ({
  roomPk,
  file,
  description,
}: ICreatePhotoVariables) =>
  axiosInstance
    .post(`rooms/${roomPk}/photos`, { file, description })
    .then((response) => response.data);
