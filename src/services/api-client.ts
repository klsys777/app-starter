import { supabase } from './supabase-client';

type RequestOptions = Omit<RequestInit, 'body'> & { body?: unknown };

/**
 * 统一网络请求封装：自动携带登录 token、统一解析与错误处理。
 * 业务接口应通过这里访问，而不是各页面各自调用 fetch。
 */
export async function apiRequest<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  };
  if (token) finalHeaders.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(url, {
      ...rest,
      headers: finalHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error('网络连接失败，请检查网络后重试。');
  }

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = (payload && (payload.message || payload.error)) || `请求失败（${response.status}）`;
    throw new Error(message);
  }

  return payload as T;
}
