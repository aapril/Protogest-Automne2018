import { ProfilModule } from './profil.module';

describe('ProfilModule', () => {
  let profilModule: ProfilModule;

  beforeEach(() => {
      profilModule = new ProfilModule();
  });

  it('should create an instance', () => {
    expect(profilModule).toBeTruthy();
  });
});
