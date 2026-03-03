import CustomError, {CustomErrorProps} from "./customError.js"

export default class GenericError extends CustomError {
  public static readonly NAME = "GenericError"

  constructor(props?: CustomErrorProps) {
    super({
      name: GenericError.NAME,
      message: "Unknown error occurred.",
      title: "Generic unknown error",
      description: "An unknown error happened. Please contact support or try refreshing the page and trying again.",
      httpCode: 500,
      ...props
    })
  }
}

CustomError.register(GenericError)
