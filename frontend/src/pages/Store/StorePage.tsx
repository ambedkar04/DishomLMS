import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Package, Truck } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Menubar from '@/components/Menubar';

const StorePage: React.FC = () => {
  // Dummy store data
  const products = [
    {
      id: 1,
      name: "NEET Study Kit 2025",
      description: "Complete study package with books, notes, and practice papers",
      price: "₹2,999",
      originalPrice: "₹4,999",
      rating: 4.8,
      reviews: 156,
      category: "Study Kit",
      inStock: true,
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "JEE Main Formula Handbook",
      description: "Comprehensive formula book for Physics, Chemistry & Mathematics",
      price: "₹599",
      originalPrice: "₹899",
      rating: 4.6,
      reviews: 89,
      category: "Books",
      inStock: true,
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Online Test Series Premium",
      description: "Access to 100+ mock tests with detailed solutions",
      price: "₹1,499",
      originalPrice: "₹2,499",
      rating: 4.9,
      reviews: 234,
      category: "Digital",
      inStock: false,
      image: "/api/placeholder/300/200"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Menubar />
        <div className="flex-1 overflow-y-auto py-8 px-16">
          <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Store</h1>
          <p className="text-gray-600">Get the best study materials and resources</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </CardTitle>
                  <Badge variant={product.inStock ? 'default' : 'secondary'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </div>
                <CardDescription className="text-sm text-gray-600">
                  {product.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Category */}
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{product.category}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-700">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-green-600">{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                </div>

                {/* Actions */}
                <div className="pt-2 border-t flex space-x-2">
                  <Button 
                    size="sm"
                    variant="outline"
                    className="flex-1"
                  >
                    <Truck className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                  <Button 
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Store Stats */}
        <div className="mt-12">
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-900">
                🛒 Store Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Total Products</h4>
                  <p className="text-2xl font-bold text-blue-600">{products.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">In Stock</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {products.filter(product => product.inStock).length}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Avg Rating</h4>
                  <p className="text-2xl font-bold text-orange-600">
                    {(products.reduce((sum, product) => sum + product.rating, 0) / products.length).toFixed(1)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;