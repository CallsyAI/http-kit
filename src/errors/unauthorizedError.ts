import CustomError, {CustomErrorProps} from "./customError.js"

export default class UnauthorizedError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "UnauthorizedError",
      message: "Authentication required.",
      title: "Authentication required",
      description: "You must provide valid authentication credentials to access this resource.",
      httpCode: 401,
      ...props
    })
  }
}
