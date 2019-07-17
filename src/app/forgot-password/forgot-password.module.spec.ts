import { ForgotPasswordModule } from './forgot-password.module';

describe('ForgotPasswordModule', () => {
  let forgotPassModule: ForgotPasswordModule;

  beforeEach(() => {
      forgotPassModule = new ForgotPasswordModule();
  });

  it('should create an instance', () => {
    expect(forgotPassModule).toBeTruthy();
  });
});
