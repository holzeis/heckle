export class Token {
  private decodedToken: any;

  public constructor(token: string) {
    this.decodedToken = token;
  }

  public getEmail(): string {
    return this.decodedToken ? this.decodedToken.email : null;
  }

  public getFirstname(): string {
    return this.decodedToken ? this.decodedToken.firstname : null;
  }

  public getLastname(): string {
    return this.decodedToken ? this.decodedToken.lastname : null;
  }

  public getSocketKey(): string {
    return this.decodedToken ? this.decodedToken.socketKey : null;
  }
}
