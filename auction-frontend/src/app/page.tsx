'use client';

import { useEffect, useState } from 'react';
import { auctionService } from '@/services/auction.service';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { AuctionList } from '../components/AuctionList';
import { Auction } from '@/types/types';

export default function HomePage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await auctionService.getAll();
        setAuctions(data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
        setAuctions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div className="space-y-8">
      {/* Título */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          🎨 Subastas de Arte
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Descubre y puja por obras de arte únicas de artistas emergentes y establecidos
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Subastas Disponibles
        </h2>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <AuctionList auctions={auctions} />
        )}
      </section>
    </div>
  );
}