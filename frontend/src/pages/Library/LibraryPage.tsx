import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BookOpen, Download, Eye, AlertCircle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Menubar from '@/components/Menubar';

interface Book {
  id: number;
  title: string;
  author: string;
  subject: string;
  type: string;
  size: string;
  pages: number;
  downloads: number;
  status: 'Available' | 'Premium';
}

const LibraryPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in a real app, this would be an API call
        const mockBooks: Book[] = [
          {
            id: 1,
            title: "Physics Class 12 - NCERT Solutions",
            author: "NCERT Board",
            subject: "Physics",
            type: "PDF",
            size: "15.2 MB",
            pages: 245,
            downloads: 1250,
            status: "Available"
          },
          {
            id: 2,
            title: "Organic Chemistry Handbook",
            author: "Dr. Morrison & Boyd",
            subject: "Chemistry",
            type: "PDF",
            size: "28.5 MB",
            pages: 412,
            downloads: 890,
            status: "Premium"
          },
          {
            id: 3,
            title: "Mathematics Formula Book",
            author: "R.D. Sharma",
            subject: "Mathematics",
            type: "PDF",
            size: "8.7 MB",
            pages: 156,
            downloads: 2100,
            status: "Available"
          }
        ];
        
        setBooks(mockBooks);
      } catch (err) {
        setError('Failed to load library. Please try again later.');
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Alert variant="destructive" className="w-full max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="mb-4">{error}</AlertDescription>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline"
            className="mt-2"
          >
            Retry
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar - Hidden on mobile, shown on medium screens and up */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Menubar />
        <main className="flex-1 overflow-y-auto p-6 px-16">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Library</h1>
              <p className="text-gray-600">Access study materials, books, and resources</p>
            </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {book.title}
                  </CardTitle>
                  <Badge variant={book.status === 'Available' ? 'default' : 'secondary'}>
                    {book.status}
                  </Badge>
                </div>
                <CardDescription className="text-sm text-gray-600">
                  by {book.author}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Subject */}
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{book.subject}</span>
                </div>

                {/* File Info */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{book.type} • {book.size}</span>
                  <span>{book.pages} pages</span>
                </div>

                {/* Downloads */}
                <div className="flex items-center space-x-2">
                  <Download className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{book.downloads} downloads</span>
                </div>

                {/* Actions */}
                <div className="pt-2 border-t flex space-x-2">
                  <Button 
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    aria-label={`Preview ${book.title}`}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={book.status === 'Premium'}
                    title={book.status === 'Premium' ? 'Subscribe to access premium content' : ''}
                    aria-label={book.status === 'Premium' ? 'Premium content - Subscribe to download' : `Download ${book.title}`}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    {book.status === 'Premium' ? 'Premium' : 'Download'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-900">
                📚 Library Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Total Books</h4>
                  <p className="text-2xl font-bold text-blue-600">{books.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Total Downloads</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {books.reduce((sum, book) => sum + book.downloads, 0)}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Available Books</h4>
                  <p className="text-2xl font-bold text-orange-600">
                    {books.filter(book => book.status === 'Available').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  </div>
</div>
  );
};

export default LibraryPage;