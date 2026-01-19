import CustomError, {CustomErrorProps} from "./customError"

export default class NotAllowedError extends CustomError {
  constructor(props?: CustomErrorProps) {
    super({
      name: "NotAllowedError",
      message: "You are not allowed to do this action.",
      title: "You are not allowed to do this action",
      description: "You lack the permissions to do this action.",
      httpCode: 405,
      ...props
    })
  }
}
