import React, { useState } from 'react';
import { fetchServerTimeOffset } from '@/utils/time';

export const ServerTimeButton: React.FC = () => {
  const [offset, setOffset] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const offset = await fetchServerTimeOffset();
    setOffset(offset);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      {offset && (
        <div className="mb-4 mt-4 text-base font-semibold">
          Odchylka: {offset}
        </div>
      )}
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition mb-2 flex items-center justify-center min-w-[180px]"
        onClick={handleClick}
        disabled={loading}
      >
        {loading && (
          <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
        )}
        Získat čas ze serveru
      </button>
    </div>
  );
};
