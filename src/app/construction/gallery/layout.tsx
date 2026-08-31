import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Construction Gallery | Grid Homes",
  description: "Explore our construction portfolio showcasing our expertise in residential, commercial, and institutional building projects.",
  alternates: {
    canonical: 'https://gridhomes.in/construction/gallery'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
