# Generated by Django 4.1 on 2022-12-20 11:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0004_user_create_time_user_update_time'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='collection_post',
            new_name='CollectionPost',
        ),
        migrations.RenameModel(
            old_name='DownloadFile_post',
            new_name='DownloadFilePost',
        ),
    ]
