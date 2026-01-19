import CustomError, {CustomErrorProps} from "./customError"

export default class BadRequestError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "BadRequestError",
      message: "Bad request.",
      title: "Bad request",
      description: "The server cannot process the request due to a client error.",
      httpCode: 400,
      ...props
    })
  }
}