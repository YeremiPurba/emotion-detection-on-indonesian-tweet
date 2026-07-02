import { Link } from 'react-router-dom'

export default function AuthCard({ title, subtitle, children, footerText, footerLinkText, footerTo }) {
  return (
    <div className="flex flex-1 items-center justify-center px-5 py-10">
      <div className="w-full max-w-105 rounded-2xl border border-border bg-white px-10 py-9">
        <div className="mb-7">
          <h1 className="mb-1.5 font-serif-display text-[26px] tracking-tight text-text-primary">
            {title}
          </h1>
          <p className="text-[13.5px] leading-relaxed text-text-secondary">{subtitle}</p>
        </div>

        {children}

        <p className="mt-5 text-center text-[13px] text-text-secondary">
          {footerText}{' '}
          <Link to={footerTo} className="font-medium text-brand-blue no-underline">
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  )
}