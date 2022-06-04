interface IMiddleware {
  next(mid: IMiddleware): IMiddleware;
  handle(request: any): any;
}

abstract class AbstractMiddleware implements IMiddleware {
  private nextMiddleware: IMiddleware;
  
  next(mid: IMiddleware): IMiddleware {
    this.nextMiddleware = mid;
    return mid;
  }

  handle(request: any) {
    if (this.nextMiddleware) {
      return this.nextMiddleware.handle(request);
    }
    return;
  }
}

class AuthMiddleware extends AbstractMiddleware {
  override handle(request: any) {
    console.log('AuthMiddleware');
    
    
    if (request.userId === 1) {
      return super.handle(request);
    }

    console.log({ err: 'Auth error' });
  }
}

class ValidateMiddleware extends AbstractMiddleware {
  override handle(request: any) {
    console.log('Validate middleware');
    
    if (request.body) {
      return super.handle(request);
    }

    console.log({ err: 'Validation error' });
  }
}

class Controller extends AbstractMiddleware {
  override handle(request: any) {
    console.log({ success: request });
  }
}

const auth = new AuthMiddleware();
const validate = new ValidateMiddleware();
const controller = new Controller();

auth.next(validate).next(controller);
auth.handle({
  userId: 1,
  body: 'body'
});