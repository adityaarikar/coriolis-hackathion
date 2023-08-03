from django.urls import path, include 
from api.views import UserViewSet, CategoryViewSet, InventoriesViewSet, generateQR, askChatGpt
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'category', CategoryViewSet)
router.register(r'inventories', InventoriesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('generateQR/', generateQR),
    path('chat/', askChatGpt)
]