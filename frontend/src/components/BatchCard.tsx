import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Tag } from 'lucide-react';
import type { Course } from '@/data/mockData';

type BatchCardProps = Course & {
  onEnroll: (id: number) => void;
  hideExploreButton?: boolean;
};

const toRs = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(amount);
};

const BatchCard: React.FC<BatchCardProps> = ({
  id,
  name,
  subject,  
  category,
  startDate,
  endDate,
  price,
  offerPrice,
  discount,
  image,
  onEnroll,
  hideExploreButton = false
}) => {
  const navigate = useNavigate();

  const handleEnrollClick = () => {
    onEnroll(id);
  };

  const handleExploreClick = () => {
    navigate(`/batches/${id}`);
  };
  
  return (
    <Card className="overflow-hidden border border-gray-200 rounded-[5px] shadow-sm hover:shadow-md transition-all duration-200 p-0 flex flex-col h-full w-full max-w-[280px] mx-auto">
      <CardHeader className="p-0 m-0 leading-none">
        {/* Batch Thumbnail */}
        <div className="relative w-full overflow-hidden" style={{ height: '135px', margin: '0', padding: '0', lineHeight: 0 }}>
          <img
            src={image || '/images/Batchthumbnail/thumbnail.jpg'}
            alt={`${name} - ${subject}`}
            className="w-full h-full object-cover m-0 p-0 block"
            style={{ display: 'block', lineHeight: 0, margin: 0, padding: 0 }}
          />
        </div>
      </CardHeader>
      
      {/* Course Content */}
      <CardContent className="px-4 py-0 -mt-5 flex-1 flex flex-col">
        {/* Title and Category */}
        <div className="mb-3">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 pr-2">{name}</h3>
            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full whitespace-nowrap mt-1">
              {category}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
            <span>For {category} Aspirants only</span>
          </div>
        </div>
        
        {/* Course Details */}
        <div className="text-sm text-gray-600 mb-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-blue-600 flex-shrink-0" />
              <div className="flex flex-wrap items-center gap-x-2 text-xs">
                <span className="whitespace-nowrap">
                  <span className="text-gray-500">Starts:</span> {new Date(startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                {endDate && (
                  <span className="whitespace-nowrap">
                    <span className="text-gray-500">Ends:</span> {new Date(endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 my-3"></div>
        
          {/* Price Section */}
          <div className="mt-auto pt-3 pb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-gray-900">
                {toRs(offerPrice || price)}
              </span>
              <span className={`text-xs ${offerPrice ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                {toRs(price)}
              </span>
              <span className={`px-2 py-0.5 ${offerPrice ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'} text-xs font-medium rounded flex items-center`}>
                <Tag className="h-3 w-3 mr-0.5" />
                <span className="text-xs">
                  {offerPrice ? `Discount of ${discount}% applied` : 'No Discount'}
                </span>
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-3">
            {!hideExploreButton && (
              <Button 
                variant="outline" 
                className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700"
                onClick={handleExploreClick}
              >
                EXPLORE
              </Button>
            )}
            <Button 
              className={`${hideExploreButton ? 'w-full' : 'flex-1'} bg-blue-600 hover:bg-blue-700 text-white hover:text-white`}
              onClick={handleEnrollClick}
            >
              BUY NOW
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchCard;
