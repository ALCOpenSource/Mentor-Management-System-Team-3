import { HttpClient } from "./HttpClient";

class BackendApiClient extends HttpClient {
    private static classInstance?: BackendApiClient;
  
    private constructor() {
      super('https://api.awesome-site.com');
    }
  
    public static getInstance() {
      if (!this.classInstance) {
        this.classInstance = new BackendApiClient();
      }
  
      return this.classInstance;
    }
  
    // public getUsers = () => this.instance.get<User[]>('/users');  
    // public getUser = (id: string) => this.instance.get<User>(`/users/${id}`);
  }