import { CreateTemplateModule } from './create-template.module';

describe('CreateTemplateModule', () => {
  let createProtocolModule: CreateTemplateModule;

  beforeEach(() => {
    createProtocolModule = new CreateTemplateModule();
  });

  it('should create an instance', () => {
    expect(createProtocolModule).toBeTruthy();
  });
});
