// Notification is too smart: it knows too much!

// There are many reasons Notification could change. One that jumps out:
// Message formatting rules change (e.g. adding trim(), whitespace, greetings, changing the thank you..)

// Notification should only be responsible for sending a message to the right service(s).

// Let's move the responsibility for formatting the message outside of Notification.

class Message {
  service: 'sms' | 'email';
  content: string;
  constructor(service: 'sms' | 'email', content: string) {
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
  private thankYouMessage = '\nThank you for choosing our company!';

  async send(message: Message) {
    // Add thanks
    message.content = message.content + this.thankYouMessage;

    // Send to correct service
    if (message.service === 'sms') {
      await new SMSService().send(message);
    }
    await new EmailService().send(message);
  }
}
