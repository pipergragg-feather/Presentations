class Message {
  private thankYouMessage = "\nThank you for choosing our company!";

  service: "sms" | "email";
  content: string;
  constructor(service: "sms" | "email", content: string) {
    this.service = service;
    this.content = content;
    this.format();
  }
  private format() {
    this.content = this.content + this.thankYouMessage;
  }
}
class EmailService {
  async send(message: Message): Promise<void> {
    return;
  }
}
class SMSService {
  async send(message: Message): Promise<void> {
    return;
  }
}

export class Notification {
  serviceMap = {
    sms: SMSService,
    email: EmailService
  };
  async send(message: Message) {
    // Send to correct service
    const Service = this.serviceMap[message.service];
    await new Service().send(message);
  }
}
