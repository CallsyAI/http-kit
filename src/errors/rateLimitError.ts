import CustomError, {CustomErrorProps} from "./customError"

export default class RateLimitError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "RateLimitError",
      message: "Rate limit reached. Please try again later.",
      title: "Too many requests",
      description: "You tried to do this action too many times. Please wait and try again later.",
      httpCode: 429,
      ...props
    })
  }
}
