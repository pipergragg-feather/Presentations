interface IMessage {
  service: 'sms' | 'email'
  content: string
}

interface IEmailService {
  send(message: IMessage): Promise<void>;
}

interface ISMSService {
  send(message: IMessage): Promise<void>;
}

export class Notification {
  emailService: IEmailService;
  smsService: ISMSService;

  constructor(args: { emailService: IEmailService; smsService: ISMSService }) {
    this.emailService = args.emailService;
    this.smsService = args.smsService
  }

  serviceMap = {
    sms: this.smsService,
    email: this.emailService
  };
  async send(message: IMessage) {
    // Send to correct service
    const service = this.chooseService(message);
    await service.send(message);
  }
  private chooseService(message: IMessage) {
    return this.serviceMap[message.service];
  }
}