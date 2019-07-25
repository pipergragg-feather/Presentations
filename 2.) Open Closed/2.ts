// Notification knows about a concrete class (Message).

// Message will grow to contain way too many pieces of
// information that Notification doesn't need to know about.

// To work with Notification, you have to know about Message.
// Notification is thus still too smart for its own good.

// To fix this, we'll define the smallest possible interface that Notification requires of Message, and use that instead.
// Then Notification can forget that Message even exists, and get even dumber.

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
    const Service = this.chooseService(message);
    await new Service().send(message);
  }
  private chooseService(message: Message) {
    return this.serviceMap[message.service];
  }
}

// Now we need Interface Segregation.
