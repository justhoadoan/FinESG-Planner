import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './primitives.css';

export function PageHeading({
  title,
  lead,
  actions,
}: {
  title: string;
  lead?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="page-heading">
      <div>
        <h1 className="page-heading__title">{title}</h1>
        {lead && <p className="page-heading__lead">{lead}</p>}
      </div>
      {actions && <div className="page-heading__actions">{actions}</div>}
    </header>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

/** Nút dùng động từ + đối tượng, không dùng "OK" (Voice and Tone). */
export function Button({ variant = 'primary', className, ...rest }: ButtonProps) {
  return <button className={`btn btn--${variant} ${className ?? ''}`} {...rest} />;
}

export function Card({
  children,
  as: Tag = 'section',
  className,
}: {
  children: ReactNode;
  as?: 'section' | 'article' | 'div';
  className?: string;
}) {
  return <Tag className={`card ${className ?? ''}`}>{children}</Tag>;
}

/** CMP-28 — Empty state: nêu giá trị bước kế tiếp, không phải dashboard rỗng. */
export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="state state--empty">
      <h2 className="state__title">{title}</h2>
      <p className="state__body">{body}</p>
      {action}
    </div>
  );
}

/** CMP-28 — Loading: spinner CÓ nhãn. */
export function LoadingState({ label = 'Đang tải…' }: { label?: string }) {
  return (
    <div className="state state--loading" role="status" aria-live="polite">
      <span className="state__spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

/** CMP-28 — Error: message an toàn + recovery + correlation ID khi có. */
export function ErrorState({
  title,
  body,
  correlationId,
}: {
  title: string;
  body: string;
  correlationId?: string;
}) {
  return (
    <div className="state state--error" role="alert">
      <h2 className="state__title">{title}</h2>
      <p className="state__body">{body}</p>
      {correlationId && (
        <p className="state__cid">
          Mã theo dõi: <code>{correlationId}</code>
        </p>
      )}
    </div>
  );
}
