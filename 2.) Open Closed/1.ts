// Notification now depends on a data structure instead of code to choose a message to send.
// This is better, but we should tend to rely on methods, not direct access to data.
// Relying on methods allows the underlying data structures to change while keeping the behavior of a class consistent.
// (it uncomplects data and behavior)

// Let's move the responsibility for how to access the serviceMap data structure outside of #send,
// making #send even dumber.

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
