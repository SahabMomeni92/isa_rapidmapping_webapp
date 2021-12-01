from django.db.models.query import QuerySet
from django.http.response import Http404
from django.shortcuts import get_object_or_404
from .serializers import ExpertMapSerializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser
from rest_framework import status
from rest_framework.response import Response
from . models import Expert_map
from .serializers import ExpertMapSerializers
# from django.forms.widgets import SelectDateWidget
from rest_framework.generics import ListAPIView,GenericAPIView,RetrieveAPIView

class CreateExpertMap(APIView):
    permission_classes = [AllowAny,] 
    parser_classes = [MultiPartParser] 
    def post(self , request):
            serializer = ExpertMapSerializers(data = request.data)  
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)

class ExpertMap_List(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ExpertMapSerializers
    queryset = Expert_map.objects.all()

class ExpertMap_Detail(APIView):
    permission_classes = [AllowAny,] 

    # def get_object(self, pk):
    #     try:
    #         return Expert_map.objects.get(pk=pk)
    #     except Expert_map.DoesNotExist:
    #         raise Http404

    # def get(self, request, pk, format=None):
    #     expert_map = self.get_object(pk)
    #     serializer = ExpertMapSerializers(expert_map)
    #     return Response(serializer.data)

    def get(self,request,pk):

        qs = Expert_map.objects.get(pk=pk)

        serializers = ExpertMapSerializers(qs)

        return Response(serializers.data,status=status.HTTP_200_OK)
    

    

# class ExpertMapCreateView(CreateView):
#     template_name = 'expert_panel/create.html'
#     model = Expert_map
#     fields = ['title','disaster','img_file','tiff_file','status','event','description','date']
#     def get_form(self):
#         '''add date picker in forms'''
#         form = super(ExpertMapCreateView, self).get_form()
#         form.fields['date'].widget = SelectDateWidget()
#         return form

# class ExpertMapDetailView(DetailView):
#     template_name='expert_panel/detail.html'   
#     model = Expert_map
#     context_object_name = 'expert_map'

# class profileView(ListView):
#     template_name = 'expert_panel/profile.html'
#     model = Expert_map
#     context_object_name = 'expert_map'

# class expertMapDeleteView(DeleteView):
#     model=Expert_map
#     success_url='expert_profile'    