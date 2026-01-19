import CustomError, {CustomErrorProps} from "./customError"

export default class GenericError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "GenericError",
      message: "Unknown error occurred.",
      title: "Generic unknown error",
      description: "An unknown error happened. Please contact support or try refreshing the page and trying again.",
      httpCode: 500,
      ...props
    })
  }
}
