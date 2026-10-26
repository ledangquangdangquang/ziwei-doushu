'use client';

/**
 * Ô tìm kiếm cổ thư → chuyển tới /library/search?q=…
 */

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function LibrarySearch({ initial = '' }: { initial?: string }) {
  const [q, setQ] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    startTransition(() => {
      router.push(`/library/search?q=${encodeURIComponent(query)}`);
    });
  };

  return (
    <form className="search" role="search" onSubmit={submit}>
      <input
        aria-label="Tìm trong cổ thư"
        className="field__input"
        type="search"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Thất Sát triều Đẩu, hóa kỵ…"
      />
      <button
        type="submit"
        className="btn btn--primary"
        disabled={!q.trim()}
        data-state={isPending ? 'loading' : undefined}
        aria-busy={isPending || undefined}
      >
        Tìm
      </button>
    </form>
  );
}
