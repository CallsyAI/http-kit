import CustomError, {CustomErrorProps} from "./customError.js"

export default class ForbiddenError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "ForbiddenError",
      message: "Access forbidden.",
      title: "Access forbidden",
      description: "You do not have permission to access this resource.",
      httpCode: 403,
      ...props
    })
  }
}