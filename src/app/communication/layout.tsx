// DEPRECATED: This is the old communication layout. The correct layout is student layout at /app/student/layout.tsx
export default function DeprecatedCommunicationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8 text-center">
      <h1 className="text-red-400 text-xl">Deprecated Layout</h1>
      <p className="text-white/70">This is the old communication layout. Use student layout instead.</p>
      {children}
    </div>
  )
}
