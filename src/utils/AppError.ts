/**
 * 
 * Används för att skapa strukturerade och konsekventa 
 * felmeddelanden i applikationen.
 */
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public type: string,
    public details?: Record<string, string>,
    //public isOperational = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}