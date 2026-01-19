import CustomError, {CustomErrorProps} from "./customError"

export default class MisconfiguredError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "MisconfiguredError",
      message: "It looks like something is misconfigured.",
      title: "Something is not entirely right with the system",
      description: "An internal error was detected due to some unexpected misconfiguration. This error should be shared with the support team.",
      httpCode: 500,
      ...props
    })
  }
}
