// Notification doesn't even know how many services there are any more.
// It doesn't know whether or not a message should send to a given service,
// trusting that the service instance will know what to do with the message.

// The services honor this contract by stating that they take an IMessage as an argument.

// It's almost TOO dumb - it barely does anything at all.

// Notification is still not as dumb as it could be, though:
// it know the structure of the output of service calls (Promise<void>)

// Let's hide this information from Notification by DRYing it up.

enum NotificationService {
  SMS = 'SMS',
  EMAIL = 'EMAIL'
}

interface IMessage {
  service: NotificationService;
  content: string;
}

interface IService {
  send(message: IMessage): Promise<void>;
}

export class Notification {
  services: IService[];

  constructor(args: {services: IService[]}) {
    this.services = args.services;
  }

  async send(message: IMessage) {
    // Send to correct service
    const serviceCalls: Promise<void>[] = this.services.map(service => service.send(message));

    await Promise.all(serviceCalls);
  }
}
