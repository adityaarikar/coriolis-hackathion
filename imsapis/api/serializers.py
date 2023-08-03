from rest_framework import serializers
from api.models import User, Category, Inventories

# User serialiser
class UserSerializer(serializers.HyperlinkedModelSerializer):
    user_id = serializers.ReadOnlyField()
    class Meta:
        model = User
        fields= "__all__"

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    cat_id = serializers.ReadOnlyField()
    class Meta:
        model = Category
        fields= "__all__"

class InventoriesSerializer(serializers.HyperlinkedModelSerializer):
    invent_id = serializers.ReadOnlyField()
    class Meta:
        model = Inventories
        fields= "__all__"
# class InventoriesSerializer(serializers.ModelSerializer):
#     alloted_to = serializers.SerializerMethodField()
#     alloted_by = serializers.SerializerMethodField()
#     # cat_id = serializers.HyperlinkedRelatedField(
#     #     view_name='category-detail',
#     #     queryset=Category.objects.all(),
#     #     lookup_field='cat_id'
#     # )

#     class Meta:
#         model = Inventories
#         fields = ('url', 'invent_id', 'alloted_at', 'alloted_till', 'working_status', 'location',
#                   'cat_id', 'alloted_to', 'alloted_by')

#     def get_alloted_to(self, obj):
#         return obj.alloted_to.email
#     def get_alloted_by(self, obj):
#         return obj.alloted_by.email