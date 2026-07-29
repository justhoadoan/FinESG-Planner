import { useEffect, useState } from 'react';

type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'ready'; data: T };

/**
 * Tải dữ liệu async đơn giản cho giai đoạn FE-first.
 *
 * Khi backend có endpoint thật, thay bằng TanStack Query (đã pin trong Stack).
 * Chữ ký surface không đổi vì mọi surface chỉ đọc `state.status`.
 */
export function useAsync<T>(fn: () => Promise<T>, deps: readonly unknown[]): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' });

  useEffect(() => {
    let alive = true;
    setState({ status: 'loading' });
    fn()
      .then((data) => alive && setState({ status: 'ready', data }))
      .catch((err) =>
        alive &&
        setState({ status: 'error', error: err instanceof Error ? err.message : 'Lỗi không xác định' }),
      );
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
