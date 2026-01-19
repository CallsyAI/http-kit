import CustomError, {CustomErrorProps} from "./customError"

export default class NotImplementedError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "NotImplementedError",
      message: "Not implemented.",
      title: "Not implemented",
      description: "The server does not support the functionality required to fulfill the request.",
      httpCode: 501,
      ...props
    })
  }
}