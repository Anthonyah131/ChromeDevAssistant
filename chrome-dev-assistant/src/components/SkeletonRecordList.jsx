import React from "react";

function SkeletonRecordList() {
  return (
    <div className="animate-pulse space-y-4 mt-4">
      <div className="w-24 h-24 bg-gray-300 rounded-full animate-pulse m-2"></div>

      <div className="space-y-2 animate-pulse">
        <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
        <div className="flex justify-between w-full">
          <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
        </div>
      </div>

      <div className="w-full h-32 bg-gray-300 rounded my-4 animate-pulse"></div>

      <div className="space-y-2 animate-pulse">
        <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
        <div className="flex justify-between w-full">
          <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
        </div>
      </div>

      <div className="w-full h-10 bg-gray-300 rounded my-2 animate-pulse"></div>

      <div className="w-full h-32 bg-gray-300 rounded mb-4 animate-pulse"></div>

      <div className="w-full h-10 bg-gray-500 rounded cursor-not-allowed animate-pulse"></div>

      <div className="space-y-4 mt-4 animate-pulse w-full">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-md">
            <div className="bg-gray-600 h-4 w-3/4 mb-2"></div>
            <div className="bg-gray-600 h-4 w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonRecordList;
