interface IMessage {
  service: "sms" | "email";
  content: string;
}
interface IService {
  send(message: IMessage): Promise<void>;
}

interface INotificationService {
  chooseService(message: IMessage): IService;
}

export class Notification {
  service: INotificationService;

  constructor(args: { service: INotificationService }) {
    this.service = args.service;
  }

  async send(message: IMessage) {
    // Send to correct service
    const service = this.chooseService(message);
    await service.send(message);
  }
  private chooseService(message: IMessage) {
    return this.service.chooseService(message);
  }
}
