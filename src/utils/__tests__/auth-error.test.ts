import { toAuthMessage } from '../auth-error';

describe('toAuthMessage', () => {
  it('登录凭证错误转为中文提示', () => {
    expect(toAuthMessage('Invalid login credentials')).toBe('邮箱或密码不正确。');
  });

  it('邮箱已注册', () => {
    expect(toAuthMessage('User already registered')).toBe('该邮箱已注册，请直接登录。');
  });

  it('未匹配时回退原文', () => {
    expect(toAuthMessage('Some other error')).toBe('Some other error');
  });

  it('空字符串回退默认提示', () => {
    expect(toAuthMessage('')).toBe('操作失败，请稍后重试。');
  });
});
