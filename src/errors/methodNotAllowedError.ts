import CustomError, {CustomErrorProps} from "./customError"

export default class MethodNotAllowedError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "MethodNotAllowedError",
      message: "Method not allowed.",
      title: "Method not allowed",
      description: "The HTTP method used is not supported for this resource.",
      httpCode: 405,
      ...props
    })
  }
}