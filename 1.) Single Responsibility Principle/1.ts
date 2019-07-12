class Message {
  service: "sms" | "email";
  content: string;
  constructor(service: "sms" | "email", content: string) {
    this.service = service;
    this.content = content;
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
  private thankYouMessage = "\nThank you for choosing our company!";

  async send(message: Message) {
    // Add thanks
    message.content = message.content + this.thankYouMessage;

    // Send to correct service
    if (message.service === "sms") {
      await new SMSService().send(message);
    }
    await new EmailService().send(message);
  }
}

// There are many reasons this class could change. One that jumps out:
// 1.) Message formatting rules change (e.g. adding trim(), whitespace, greetings, changing the thank you..)
