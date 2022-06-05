class User {
  jwtToken: string;
  githubToken: string;
}

interface AuthStrategy {
  auth(user: User): boolean;
}

class Auth {
  private strategy: AuthStrategy;

  setStrategy(strategy: AuthStrategy) {
    this.strategy = strategy;
  }

  authUser(user: User): boolean {
    return this.strategy.auth(user);
  }
}

class JwtAuthStrategy implements AuthStrategy {
  auth(user: User): boolean {
    if (user.jwtToken) {
      //Some logic here
      return true;
    }
    return false;  
  }
}

class GithubAuthStrategy implements AuthStrategy {
  auth(user: User): boolean {
    if (user.githubToken) {
      //Some logic here
      return true;
    }    
    return false;
  }
}

const user = new User();
user.jwtToken = 'token';

const auth = new Auth();
auth.setStrategy(new JwtAuthStrategy());
console.log(auth.authUser(user));

auth.setStrategy(new GithubAuthStrategy());
console.log(auth.authUser(user));