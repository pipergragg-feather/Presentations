type ServiceResponse = number | boolean | Error | void | Response;

enum NotificationService {
  SMS = 'SMS',
  EMAIL = 'EMAIL'
}

interface IMessage {
  service: NotificationService;
  content: string;
}

interface IService {
  send(message: IMessage): Promise<ServiceResponse>;
}

// Handles the response from any given service (e.g. lets Slack know the outcome of a particular message)
interface IServiceResultHandler {
  handle(serviceResponse: ServiceResponse): Promise<void>;
}

export class Notification {
  services: IService[];
  serviceResultHandler: IServiceResultHandler;

  constructor(args: {services: IService[]; serviceResultHandler: IServiceResultHandler}) {
    this.services = args.services;
    this.serviceResultHandler = args.serviceResultHandler;
  }

  async send(message: IMessage) {
    const serviceResponses = await this.serviceCalls(message);

    await this.handleServiceResponses(serviceResponses);
  }

  private async serviceCalls(message: IMessage) {
    // Send to correct service
    const serviceCalls = this.services.map(service => service.send(message));

    return await Promise.all(serviceCalls);
  }

  private async handleServiceResponses(serviceResponses: ServiceResponse[]) {
    const serviceResultHandles = serviceResponses.map(serviceResponse =>
      this.serviceResultHandler.handle(serviceResponse)
    );

    return await Promise.all(serviceResultHandles);
  }
}
