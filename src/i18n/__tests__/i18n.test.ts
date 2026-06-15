import { setLanguage, t } from '../index';

describe('i18n', () => {
  it('默认英文', () => {
    setLanguage('en');
    expect(t('signIn')).toBe('Sign In');
  });

  it('切换中文', () => {
    setLanguage('zh');
    expect(t('signIn')).toBe('登录');
  });
});
