import CustomError, {CustomErrorProps} from "./customError.js"

export default class MisconfiguredError extends CustomError {
  public static readonly NAME = "MisconfiguredError"

  constructor(props?: CustomErrorProps) {
    super({
      name: MisconfiguredError.NAME,
      message: "It looks like something is misconfigured.",
      title: "Something is not entirely right with the system",
      description: "An internal error was detected due to some unexpected misconfiguration. This error should be shared with the support team.",
      httpCode: 500,
      ...props
    })
  }
}

CustomError.register(MisconfiguredError)
