/** 把 Supabase 返回的英文错误转换成用户能看懂的中文提示。 */
export function toAuthMessage(message: string): string {
  if (/invalid login credentials/i.test(message)) return '邮箱或密码不正确。';
  if (/user already registered/i.test(message)) return '该邮箱已注册，请直接登录。';
  if (/password should be at least/i.test(message)) return '密码长度不够，请使用更长的密码。';
  if (/unable to validate email|invalid email/i.test(message)) return '邮箱格式不正确。';
  if (/email not confirmed/i.test(message)) return '邮箱尚未验证，请查收验证邮件。';
  return message || '操作失败，请稍后重试。';
}
