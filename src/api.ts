import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000/api/v1/"
      : "https://airbnbclone-jhua.onrender.com/api/v1",
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
  pk: number;
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

export const editRoom = (variables: IUploadRoomVariables) =>
  axiosInstance
    .put(`rooms/${variables.pk}`, variables)
    .then((response) => response.data);

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

export const checkBooking = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk, dates] = queryKey;
  if (dates) {
    if (Array.isArray(dates)) {
      const [firstDate, secondDate] = dates;

      if (firstDate != null && secondDate != null) {
        const adjustedFirstTimestamp =
          firstDate.getTime() - firstDate.getTimezoneOffset() * 60 * 1000;
        const adjustedFirstDate = new Date(adjustedFirstTimestamp);

        const adjustedSecondTimestamp =
          secondDate.getTime() - secondDate.getTimezoneOffset() * 60 * 1000;
        const adjustedSecondDate = new Date(adjustedSecondTimestamp);

        const checkIn = adjustedFirstDate
          .toJSON()
          .split("T")[0]
          .replaceAll("-", "");
        const checkOut = adjustedSecondDate
          .toJSON()
          .split("T")[0]
          .replaceAll("-", "");

        return axiosInstance
          .get(
            `rooms/${roomPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
          )
          .then((response) => response.data.result);
      }
    }
  }
  return {};
};
