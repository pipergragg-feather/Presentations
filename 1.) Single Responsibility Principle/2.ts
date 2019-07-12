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
  async send(message: Message) {
    // Send to correct service
    if (message.service === "sms") {
      await new SMSService().send(message);
    }
    await new EmailService().send(message);
  }
}
// Problem is, we now have to modify Notification any time we want to add services.
