import {
  ChannelTypeEnum,
  ISendMessageSuccessResponse,
  ISmsOptions,
  ISmsProvider,
} from '@novu/stateless';

import axios, { AxiosInstance } from 'axios';

export class OrangeSmsProvider implements ISmsProvider {
  id = 'orange';
  channelType = ChannelTypeEnum.SMS as ChannelTypeEnum.SMS;
  private axiosInstance: AxiosInstance;

  constructor(
    private config: {
      apiKey?: string;
      from?: string;
      senderName?: string;
    }
  ) {}

  async sendMessage(
    options: ISmsOptions
  ): Promise<ISendMessageSuccessResponse> {
    const url =
      'https://api.orange.com/smsmessaging/v1/outbound/' +
      encodeURI(this.config.from);

    const data = {
      outboundSMSMessageRequest: {
        address: options.to,
        senderAddress: encodeURI(this.config.from),
        senderName: undefined,
        outboundSMSTextMessage: {
          message: options.content,
        },
      },
    };
    if (
      this.config.senderName !== undefined &&
      this.config.senderName.length !== 0
    )
      data.outboundSMSMessageRequest.senderName = this.config.senderName;
    else delete data.outboundSMSMessageRequest.senderName;

    const response = await axios({
      headers: {
        Authorization: 'Bearer ' + this.config.apiKey,
        'Content-Type': 'application/json',
      },
      data,
      method: 'post',
      url,
    });

    return {
      id: options.id,
      date: new Date().toISOString(),
    };
  }
}
