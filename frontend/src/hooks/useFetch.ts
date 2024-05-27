/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from "react";
import { BASE_URL } from "../constants/env";

enum ActionType {
  DATA_LOADING = "DATA_LOADING",
  SET_DATA = "SET_DATA",
  DATA_ERROR = "DATA_ERROR",
}

interface DataLoadingAction {
  type: ActionType.DATA_LOADING;
}

interface SetDataAction<T> {
  type: ActionType.SET_DATA;
  payload: {
    data: T;
    message: string;
  };
}

interface DataErrorAction {
  type: ActionType.DATA_ERROR;
  payload: {
    err: string;
  };
}

type DataAction<T> = DataLoadingAction | SetDataAction<T> | DataErrorAction;

interface DataState<T> {
  dataAPI: T;
  isLoading: boolean;
  error: boolean;
  message: string | null;
}

interface IFetchOptions {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, any>;
}

const initialData = {
  dataAPI: null,
  isLoading: false,
  error: false,
  message: null,
};

function parseMessage(message: string | Array<string>) {
  if (Array.isArray(message)) {
    const capitalized = message.map((msg) => {
      return msg.charAt(0).toUpperCase() + msg.slice(1);
    });
    return capitalized.join(", ");
  }
  return message;
}

const dataReducer = <T>(state: DataState<T>, action: DataAction<T>) => {
  switch (action.type) {
    case ActionType.DATA_LOADING:
      return { ...state, isLoading: true, error: false, message: null };
    case ActionType.SET_DATA:
      return {
        ...state,
        dataAPI: action.payload.data,
        isLoading: false,
        error: false,
        message: action.payload.message,
      };
    case ActionType.DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload.err,
      };
    default:
      throw new Error("Unhandled action type");
  }
};

function useFetch<T = any>() {
  const [state, dispatch] = useReducer(
    dataReducer<T>,
    initialData as DataState<T>
  );

  const fetchData = async ({
    url = "",
    method = "GET",
    body = {},
  }: IFetchOptions) => {
    try {
      dispatch({ type: ActionType.DATA_LOADING });

      const options: RequestInit = {
        method,
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify(body),
      };

      if (Object.keys(body).length === 0) delete options.body;

      const response = await fetch(`${BASE_URL}${url}`, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          parseMessage(data.message || "Hubo un error en la solicitud.")
        );
      }

      dispatch({
        type: ActionType.SET_DATA,
        payload: { data, message: "message" },
      });

      return { data, message: "message" };
    } catch (error) {
      dispatch({
        type: ActionType.DATA_ERROR,
        payload: { err: (error as Error).message },
      });
      return { data: null, message: (error as Error).message };
    }
  };

  const get = (url: string) => fetchData({ url, method: "GET" });

  const post = (url: string, body: Record<string, any>) =>
    fetchData({ url, method: "POST", body });

  const put = (url: string, body: Record<string, any> = {}) =>
    fetchData({ url, method: "PUT", body });

  const del = (url: string) => fetchData({ url, method: "DELETE" });

  return { ...state, fetchData, get, post, put, del };
}

export default useFetch;
