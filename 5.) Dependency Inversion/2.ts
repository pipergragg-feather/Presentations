// Classes implementing IMessage and IService can use NotificationService privately or publicly.
enum NotificationService {
  SMS = 'SMS',
  EMAIL = 'EMAIL'
}

// IMessage doesn't
interface IMessage {
  service: NotificationService
  content: string
}

interface IService {
  send(message: IMessage): Promise<void>;
  canSend(message: IMessage): Boolean;
}

export class Notification {
  services: IService[]

  constructor(args: { services: IService[] }) {
    this.services = args.services;
  }

  async send(message: IMessage) {
    // Send to correct service
    const serviceCalls: Promise<void>[] = this.services
    .map(service => service.send(message))

    await Promise.all(serviceCalls);
  }
}