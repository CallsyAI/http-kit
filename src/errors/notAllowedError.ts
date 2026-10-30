import CustomError, {CustomErrorProps} from "./customError.js"

export default class NotAllowedError extends CustomError {
  public static readonly NAME = "NotAllowedError"

  constructor(props?: CustomErrorProps) {
    super({
      name: NotAllowedError.NAME,
      message: "You are not allowed to do this action.",
      title: "You are not allowed to do this action",
      description: "You lack the permissions to do this action.",
      httpCode: 405,
      // Lacking permission for an action is a refusal the caller can resolve, not a fault.
      isCritical: false,
      ...props
    })
  }
}

CustomError.register(NotAllowedError)
