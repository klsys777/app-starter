import type { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

import { authService } from '@/services/auth-service';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type AuthState = {
  status: AuthStatus;
  user: User | null;
  session: Session | null;
  /** App 启动时调用：读取已保存的会话并订阅登录态变化。 */
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

function applySession(session: Session | null) {
  return {
    session,
    user: session?.user ?? null,
    status: (session ? 'authenticated' : 'unauthenticated') as AuthStatus,
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'loading',
  user: null,
  session: null,

  initialize: async () => {
    const session = await authService.getSession();
    set(applySession(session));
    authService.onAuthStateChange((next) => set(applySession(next)));
  },

  signIn: async (email, password) => {
    const { session } = await authService.signIn(email, password);
    set(applySession(session));
  },

  signUp: async (email, password) => {
    await authService.signUp(email, password);
  },

  signOut: async () => {
    await authService.signOut();
    set(applySession(null));
  },
}));
