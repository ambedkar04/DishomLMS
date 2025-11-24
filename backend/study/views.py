from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from .models import Study
from .serializers import StudySerializer


class StudyViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Study.
    
    list: Get all studies (filtered by batch, subject, chapter, teacher if provided)
    retrieve: Get a specific study
    create: Create a new study
    update: Update a study
    destroy: Delete a study
    """
    queryset = Study.objects.select_related('batch', 'subject', 'chapter', 'teacher', 'course_category').all()
    serializer_class = StudySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Changed to allow read-only for now, or use IsAuthenticated to lock down
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['batch', 'subject', 'chapter', 'teacher', 'batch__course_category', 'course_category']
    search_fields = ['title', 'batch__name', 'subject__name', 'chapter__title', 'teacher__first_name', 'teacher__last_name']
    ordering_fields = ['title', 'created_at', 'updated_at', 'batch__name', 'subject__name']
    ordering = ['-created_at']
