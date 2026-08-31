import type { Metadata } from 'next';
import { EntryScreen } from '@/components/sections/entry';
import { CustomCursor } from '@/components/common';

export const metadata: Metadata = {
  title: "Architecture & Interior Design | Grid Homes",
  description: "Grid Homes is a premium architecture and interior design studio based in Hyderabad, specializing in luxury residential, commercial, and turnkey construction projects.",
  alternates: {
    canonical: 'https://gridhomes.in'
  }
};

export default function Home() {
  return (
    <>
      <EntryScreen />
      <CustomCursor />
    </>
  );
}