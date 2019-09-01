import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

  public error(error: Error, request: any, response: any, next: (err: any) => any): void {
    console.error(error.message);

    // print validation errors.
    if ((<any>error).errors) {
      for (let err of (<any>error).errors) {
        console.error(err);
      }
    }

    if (error instanceof HttpError) {
      // process dedicated http error.
      response.status(error.httpCode).send({
        'message': error.message
      });
    } else {
      // fallback: handle any unexpected error as bad request.
      response.status(400).send({
        'message': error.message
      });
    }

    next(error);
  }
}
