# Generated by Django 4.2.3 on 2023-07-29 06:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('cat_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20, unique=True)),
                ('created_by', models.CharField(max_length=50)),
                ('created_at', models.DateField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.CharField(max_length=50, unique=True)),
                ('emp_id', models.CharField(max_length=10)),
                ('first_name', models.CharField(max_length=20)),
                ('last_name', models.CharField(max_length=20)),
                ('date_of_joining', models.DateField()),
                ('is_admin', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Inventories',
            fields=[
                ('invent_id', models.AutoField(primary_key=True, serialize=False)),
                ('alloted_at', models.DateField()),
                ('alloted_till', models.DateField()),
                ('working_status', models.BooleanField(default=True)),
                ('location', models.CharField(max_length=50)),
                ('alloted_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='alloted_by', to='api.user')),
                ('alloted_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='alloted_to', to='api.user')),
                ('cat_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='category', to='api.category')),
            ],
        ),
    ]
