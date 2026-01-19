import CustomError, {CustomErrorProps} from "./customError"

export default class ExternalApiError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "ExternalApiError",
      message: "An error happened when calling an external api.",
      title: "External system error",
      description: "There was an internal error due to an error from an external API.",
      httpCode: 424,
      ...props
    })
  }
}
