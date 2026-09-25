import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel konfiguracji",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(69,214,192,0.08),_transparent_55%)]" />
      {children}
    </div>
  );
}
