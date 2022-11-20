from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('',views.getProducts,name="products"),
    path('create/',views.createProduct,name='product-create'),
    path('upload/',views.uploadImage,name='image-upload'),
    path('top/',views.getTopProducts,name='top-products'),
    path('<str:pk>/',views.getProduct,name="product"),
    path('review/<str:pk>/',views.createProductReview,name="review-create"),
    path('review/update/<str:pk>/',views.updateProductReview,name="review-update"),
    path('review/delete/<str:pk>/',views.deleteProductReview,name="review-delete"),
    path('delete/<str:pk>/',views.deleteProduct,name='product-delete'),
    path('update/<str:pk>/',views.updateProduct,name='product-update'),
]