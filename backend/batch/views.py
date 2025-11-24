from django.shortcuts import render
from django.http import JsonResponse


def index(request):
	"""Simple placeholder view for the batch app."""
	return JsonResponse({"status": "ok", "app": "batch"})
