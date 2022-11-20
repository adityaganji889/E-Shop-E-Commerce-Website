from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.products import products
from base.models import Product, Review
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
# from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query==None:
        query = ''
    products = Product.objects.filter(name__icontains=query)
    page = request.query_params.get('page')
    paginator = Paginator(products, 4)
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page==None:
        page = 1

    page = int(page)    
    
    serializer = ProductSerializer(products, many=True)
    return Response({'products':serializer.data, 'page':page, 'pages':paginator.num_pages})

@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
      user=user,
      name='Sample Name',
      price=0,
      brand='Sample Brand',
      countInStock=0,
      category='Sample Category',
      description=''
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    #1 - Review Already Exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'details':'Product Already Reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'details':'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )
        
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating =total/len(reviews)
        product.save()

        return Response({'detail':'Review Added'})
        
    #4 - 

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    #1 - Review Already Exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        review = Review.objects.get(user_id=user,product_id=pk)
        review.comment = data['comment']
        review.rating = data['rating']
        review.save()
        
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating =total/len(reviews)
        product.save()

        return Response({'detail':'Review Updated'})

    #2 - No Rating or 0
    else:
        content = {'details':'Not able to update the review'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

       

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)

    #1 - Review Already Exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        review = Review.objects.get(user_id=user,product_id=pk)
        review.delete()
        
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        if(len(reviews)==0):
            product.rating = 0
        else:
            product.rating = total/len(reviews)
        
        product.save()
        return Response({'detail':'Review Deleted'})

    #2 - No Rating or 0
    else:
        content = {'details':'Not able to delete the review'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

       
