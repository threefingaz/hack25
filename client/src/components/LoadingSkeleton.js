import React from 'react';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );

  const CardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-32 w-full" />
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );

  const ChartSkeleton = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Skeleton className="h-6 w-48 mb-6" />
      <div className="space-y-3">
        <div className="flex items-end space-x-2 h-64">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex-1 space-y-1">
              <Skeleton className={`h-${20 + (i * 8)} w-full`} />
              <Skeleton className={`h-${16 + (i * 4)} w-full`} />
            </div>
          ))}
        </div>
      </div>
      <Skeleton className="h-4 w-32 mt-4 mx-auto" />
    </div>
  );

  const ListSkeleton = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Skeleton className="h-6 w-40 mb-4" />
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );

  const PersonaSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border-2 border-gray-200 rounded-xl p-4 sm:p-6">
          <div className="text-center mb-4">
            <Skeleton className="h-12 w-12 rounded-full mx-auto mb-3" />
            <Skeleton className="h-6 w-32 mx-auto mb-1" />
            <Skeleton className="h-4 w-24 mx-auto mb-3" />
          </div>
          <div className="space-y-3 mb-6">
            <Skeleton className="h-4 w-full" />
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'chart':
        return <ChartSkeleton />;
      case 'list':
        return <ListSkeleton />;
      case 'persona':
        return <PersonaSkeleton />;
      case 'card':
      default:
        return (
          <div className="space-y-6">
            {[...Array(count)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        );
    }
  };

  return renderSkeleton();
};

export default LoadingSkeleton;