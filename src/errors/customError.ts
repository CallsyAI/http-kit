export interface CustomErrorProps {
  name?: string
  message?: string
  title?: string
  description?: string
  httpCode?: number
  isCritical?: boolean
  debugMessage?: string
}

export default class CustomError extends Error {
  public readonly isCustomError: boolean = true

  protected title: string
  protected description: string
  protected httpCode: number
  protected isCritical: boolean
  protected debugMessage: string | null

  public constructor(props?: CustomErrorProps) {
    const message = props?.message || "Custom error happened!"

    super(message)

    this.name = props?.name || "CustomError"
    this.message = message

    this.title = props?.title || "Custom Error"
    this.description = props?.description || "Unspecific custom error occurred."
    this.httpCode = props?.httpCode || 500
    this.isCritical = props?.isCritical || true
    this.debugMessage = props?.debugMessage || null
  }

  //-------------------------------
  // Name property.
  //-------------------------------

  public getName(): string {
    return this.name
  }

  public setName(name: string): CustomError {
    this.name = name
    return this
  }

  //-------------------------------
  // Message property.
  //-------------------------------

  public getMessage(): string {
    return this.message
  }

  public setMessage(message: string): CustomError {
    this.message = message
    return this
  }

  //-------------------------------
  // Title property.
  //-------------------------------

  public getTitle(): string {
    return this.title
  }

  public setTitle(title: string): CustomError {
    this.title = title
    return this
  }

  //-------------------------------
  // Description property.
  //-------------------------------

  public getDescription(): string {
    return this.description
  }

  public setDescription(description: string): CustomError {
    this.description = description
    return this
  }

  //-------------------------------
  // HTTP code property.
  //-------------------------------

  public getHttpCode(): number {
    return this.httpCode
  }

  public setHttpCode(code: number): CustomError {
    this.httpCode = code
    return this
  }

  //-------------------------------
  // Is critical property.
  //-------------------------------

  public getIsCritical(): boolean {
    return this.isCritical
  }

  public setIsCritical(isCritical: boolean): CustomError {
    this.isCritical = isCritical
    return this
  }

  //-------------------------------
  // Debug message property.
  //-------------------------------

  public getDebugMessage(): string | null {
    return this.debugMessage || null
  }

  public setDebugMessage(message: string): CustomError {
    this.debugMessage = message
    return this
  }

  //-------------------------------
  // Public methods.
  //-------------------------------

  /**
   * Returns a clean stack trace.
   */
  public getStackTrace(): string[] {
    const stack = this.stack?.split(/\r?\n/).slice(1) ?? []
    const cwd = process.cwd()

    return stack.map(line => {
      let cleaned = line.trim()

      // Remove absolute paths for a cleaner look.
      cleaned = cleaned.replace(cwd, "")

      // Remove "at" word at the beginning of each line for a cleaner look.
      cleaned = cleaned.replace(/^at\s+/, "")

      // Remove commas for a cleaner look.
      cleaned = cleaned.replace(/,/g, "")

      // Remove the remaining white-spaces after the previous cleanup for a cleaner look.
      cleaned = cleaned.trim()

      return cleaned
    }).filter(line => line.length > 0)
  }

  /**
   * Serializes the whole error instance into an object.
   */
  public toObject(debug: boolean = false): any {
    const obj: any = {
      isCustomError: this.isCustomError,
      name: this.getName(),
      message: this.getMessage(),
      title: this.getTitle(),
      description: this.getDescription(),
      httpCode: this.getHttpCode(),
      isCritical: this.getIsCritical()
    }

    if (debug) {
      obj.debugMessage = this.getDebugMessage()
      obj.stackTrace = this.getStackTrace()
    }

    return obj
  }

  /**
   * Deserializes object to an error instance.
   */
  public static fromObject(obj: any): CustomError | null {
    if (!CustomError.isError(obj)) return null

    return new CustomError({
      name: (obj.name as string) ?? undefined,
      message: (obj.message as string) ?? undefined,
      title: (obj.title as string) ?? undefined,
      description: (obj.description as string) ?? undefined,
      httpCode: (obj.httpCode as number) ?? undefined,
      isCritical: (obj.isCritical as boolean) ?? undefined,
      debugMessage: (obj.debugMessage as string) ?? undefined
    })
  }

  /**
   * Tells if an unknown object represents custom error.
   */
  public static isError(obj?: any | null): boolean {
    return obj?.isCustomError === true
  }

  /**
   * Throws appropriate error in case unknown object represents a custom error.
   */
  public static throwIfError(obj?: any | null): void {
    if (!obj) {
      return
    }

    if (CustomError.isError(obj)) {
      throw CustomError.fromObject(obj)
    }
  }
}
