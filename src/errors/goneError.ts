import CustomError, {CustomErrorProps} from "./customError"

export default class GoneError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "GoneError",
      message: "Resource gone.",
      title: "Resource gone",
      description: "The requested resource is no longer available and will not be available again.",
      httpCode: 410,
      ...props
    })
  }
}