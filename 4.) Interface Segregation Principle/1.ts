interface IMessage {
    service: "sms" | "email"
}
class EmailService {
  async send(message: IMessage): Promise<void> {
    return;
  }
}
class SMSService {
  async send(message: IMessage): Promise<void> {
    return;
  }
}

export class Notification {
  serviceMap = {
    sms: SMSService,
    email: EmailService
  };
  async send(message: IMessage) {
    // Send to correct service
    const Service = this.chooseService(message);
    await new Service().send(message);
  }
  private chooseService(message: IMessage) {
    return this.serviceMap[message.service];
  }
}
