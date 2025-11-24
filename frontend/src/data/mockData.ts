// Define Course type
type Course = {
  id: number;
  name: string;
  subject: string;
  category: string;
  startDate: string;
  endDate?: string;
  duration: string;
  price: number;
  offerPrice?: number;
  discount?: number;
  image?: string;
  description?: string;
};

export const mockCourses: Course[] = [
  {
    id: 1,
    name: 'YODHA BCECE 2025',
    subject: 'Biology',
    category: 'BCECE',
    startDate: '2024-01-15',
    endDate: '2024-12-15',
    duration: '12 months',
    price: 25000,
    offerPrice: 22500,
    discount: 10,
    image: '/images/Batchthumbnail/thumbnail.jpg',
    description: 'Comprehensive NEET preparation program covering all subjects for 2024 examination.'
  },
  {
    id: 2,
    name: 'EKLAVYA DCECE 2025',
    subject: 'Physics',
    category: 'DCECE',
    startDate: '2024-02-01',
    endDate: '2024-12-15',
    duration: '12 months',
    price: 30000,
    offerPrice: 28500,
    discount: 15,
    image: '/images/Batchthumbnail/thumbnail.jpg',
    description: 'Comprehensive JEE preparation program covering all subjects for 2024 examination.'
  },
  {
    id: 3,
    name: 'BOTANY SEM 01 2025',
    subject: 'Botany',
    category: 'UG BOTANY',
    startDate: '2024-01-01',
    endDate: '2024-12-15',
    duration: '18 months',
    price: 50000,
    offerPrice: 45000,
    discount: 10,
    image: '/images/Batchthumbnail/thumbnail.jpg',
    description: 'Comprehensive UPSC preparation program covering all subjects for 2024 examination.'
  },
  {
    id: 4,
    name: 'BOTANY SEM 02 2025',
    subject: 'Botany',
    category: 'UG BOTANY',
    startDate: '2024-01-01',
    endDate: '2024-12-15',
    duration: '18 months',
    price: 50000,
    offerPrice: 45000,
    discount: 10,
    image: '/images/Batchthumbnail/thumbnail.jpg',
    description: 'Comprehensive UPSC preparation program covering all subjects for 2024 examination.'
  },
  {
    id: 5,
    name: 'YODHA UPSC 2026',
    subject: 'General Studies',
    category: 'FREE',
    startDate: '2024-01-15',
    endDate: '2026-12-15',
    duration: '24 months',
    price: 75000,
    offerPrice: 70000,
    discount: 6.67,
    image: '/images/Batchthumbnail/thumbnail.jpg',
    description: 'Comprehensive UPSC preparation program covering all subjects for 2026 examination.'
  }
];

export type { Course };
