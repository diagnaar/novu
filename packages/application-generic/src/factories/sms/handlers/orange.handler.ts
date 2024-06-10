import { ChannelTypeEnum, ICredentials, SmsProviderIdEnum } from '@novu/shared';
import { OrangeSmsProvider } from '@novu/orange';
import { BaseSmsHandler } from './base.handler';

export class OrangeHandler extends BaseSmsHandler {
  constructor() {
    super(SmsProviderIdEnum.Orange, ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new OrangeSmsProvider({
      apiKey: credentials.apiKey,
      from: credentials.from,
      senderName: credentials.senderName,
    });
  }
}
