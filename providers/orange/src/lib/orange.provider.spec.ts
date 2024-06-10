import { OrangeSmsProvider } from './orange.provider';

test('should trigger orange library correctly', async () => {
  const provider = new OrangeSmsProvider({
    apiKey: '<orange-api-key>',
    from: '<orange-from>',
    senderName: '<orange-sender-name>',
  });

  const spy = jest
    .spyOn(provider, 'sendMessage')
    .mockImplementation(async () => {
      return {
        id: '67890-90q8',
        date: new Date().toISOString(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
    });

  await provider.sendMessage({
    to: '+221777777777',
    content: 'Test',
  });

  expect(spy).toHaveBeenCalled();

  expect(spy).toHaveBeenCalledWith({
    to: '+221777777777',
    content: 'Test',
  });
});
