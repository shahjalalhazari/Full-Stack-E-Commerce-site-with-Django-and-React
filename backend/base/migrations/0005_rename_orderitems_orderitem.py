# Generated by Django 5.0 on 2024-04-26 17:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_rename_ordercart_orderitems'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='OrderItems',
            new_name='OrderItem',
        ),
    ]
