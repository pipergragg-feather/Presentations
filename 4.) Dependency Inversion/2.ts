// Nice. Notification is SO dumb!

// Did we overdo it though? Should we have just used a map?

type ServiceResponse = void;

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

export class Notification {
  services: IService[];

  constructor(args: {services: IService[]}) {
    this.services = args.services;
  }

  async send(message: IMessage) {
    // Send to correct service
    const serviceCalls: Promise<ServiceResponse>[] = this.services.map(service => service.send(message));

    await Promise.all(serviceCalls);
  }
}
