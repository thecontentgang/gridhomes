import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Interiors Gallery | Grid Homes",
  description: "Browse our premium interior design portfolio featuring luxury apartments, villas, and commercial spaces.",
  alternates: {
    canonical: 'https://gridhomes.in/interiors/gallery'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
