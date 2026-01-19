import CustomError, {CustomErrorProps} from "./customError"

export default class RequestTimeoutError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "RequestTimeoutError",
      message: "Request timeout.",
      title: "Request timeout",
      description: "The server timed out waiting for the request.",
      httpCode: 408,
      ...props
    })
  }
}