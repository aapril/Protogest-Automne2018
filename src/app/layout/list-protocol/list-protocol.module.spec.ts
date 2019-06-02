import { CreateProtocolModule } from '../create-protocol/create-protocol.module';

describe('CreateProtocolModule', () => {
  let createProtocolModule: CreateProtocolModule;

  beforeEach(() => {
    createProtocolModule = new CreateProtocolModule();
  });

  it('should create an instance', () => {
    expect(createProtocolModule).toBeTruthy();
  });
});
