import { ResetPasswordRoutingModule } from './reset-password-routing.module';

describe('ResetPasswordRoutingModule', () => {
  let resetPasswordRoutingModule: ResetPasswordRoutingModule;

  beforeEach(() => {
    resetPasswordRoutingModule = new ResetPasswordRoutingModule();
  });

  it('should create an instance', () => {
    expect(resetPasswordRoutingModule).toBeTruthy();
  });
});
