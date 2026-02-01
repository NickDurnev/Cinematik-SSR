import { isAxiosError } from "axios";

interface IApiErrorResponse {
  errors?: Array<{ message: string }>;
  message?: string | string[];
}

class ErrorHelper {
  static getMessage(error: unknown): string | null {
    if (isAxiosError<IApiErrorResponse>(error)) {
      if (error.response?.data.errors?.[0]?.message) {
        const { errors } = error.response.data;
        return errors.map(({ message }) => message).join(", ");
      }
      if (error.response?.data?.message) {
        const { message } = error.response.data;
        return Array.isArray(message) ? message.join(", ") : message;
      }
    }
    if (error instanceof Error) {
      return error.message;
    }
    return null;
  }
}

export default ErrorHelper;
