// Notification's code is a bit more stable now,
// but is still subject to change that doesn't have to do with its purpose.
// Its #send method is too smart.

// Adding a service to Notification shouldn't change its "send" method,
// because "send" should be solely concerned with how to send a message.

// Let's move the responsibility for how to send a message outside of #send.

class Message {
  private thankYouMessage = '\nThank you for choosing our company!';

  service: 'sms' | 'email';
  content: string;
  constructor(service: 'sms' | 'email', content: string) {
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
    if (message.service === 'sms') {
      await new SMSService().send(message);
    }
    await new EmailService().send(message);
  }
}
