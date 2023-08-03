from django.db import models

# Create your models here.

# creating user model
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    email = models.CharField(unique=True, max_length= 50)
    emp_id = models.CharField(max_length=10, blank=True)
    first_name = models.CharField(max_length= 20)
    last_name = models.CharField(max_length= 20)
    date_of_joining = models.DateField(blank=True)
    is_admin = models.BooleanField(default=False, blank=True)
    def __str__(self):
        return self.email

# creating Category model
class Category(models.Model):
    cat_id = models.AutoField(primary_key= True)
    name = models.CharField(unique=True, max_length= 20)
    created_by = models.ForeignKey(User, related_name="created_by", on_delete=models.CASCADE)
    created_at = models.DateField(auto_now=True)
    def __str__(self):
        return self.name

# Create Inventory model
class Inventories(models.Model):
    invent_id = models.AutoField(primary_key=True)
    cat_id = models.ForeignKey(Category, related_name='category', on_delete=models.CASCADE, to_field='cat_id')
    alloted_at = models.DateField()
    alloted_to = models.ForeignKey(User, related_name="alloted_to", on_delete=models.CASCADE)
    alloted_by = models.ForeignKey(User, related_name="alloted_by", on_delete=models.CASCADE)
    alloted_till = models.DateField()
    working_status = models.BooleanField(default=True)
    location = models.CharField(max_length=50)
