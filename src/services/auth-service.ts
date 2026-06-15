import type { Session, User } from '@supabase/supabase-js';

import { toAuthMessage as toMessage } from '@/utils/auth-error';
import { isSupabaseConfigured, supabase } from './supabase-client';

const NOT_CONFIGURED = '后端未配置：请在 .env 中填写 Supabase 地址和密钥后重试。';

export const authService = {
  async signUp(email: string, password: string): Promise<{ user: User | null }> {
    if (!isSupabaseConfigured) throw new Error(NOT_CONFIGURED);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(toMessage(error.message));
    return { user: data.user };
  },

  async signIn(email: string, password: string): Promise<{ session: Session | null }> {
    if (!isSupabaseConfigured) throw new Error(NOT_CONFIGURED);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(toMessage(error.message));
    return { session: data.session };
  },

  async signOut(): Promise<void> {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(toMessage(error.message));
  },

  async resetPassword(email: string): Promise<void> {
    if (!isSupabaseConfigured) throw new Error(NOT_CONFIGURED);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw new Error(toMessage(error.message));
  },

  async getSession(): Promise<Session | null> {
    if (!isSupabaseConfigured) return null;
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  /** 监听登录态变化，返回取消订阅函数。 */
  onAuthStateChange(callback: (session: Session | null) => void): () => void {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
    return () => data.subscription.unsubscribe();
  },
};
