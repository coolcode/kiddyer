# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-03-19 14:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kiddyer', '0004_authgrouppermission'),
    ]

    operations = [
        migrations.CreateModel(
            name='AppMsg',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sender', models.IntegerField()),
                ('receiver', models.IntegerField()),
                ('content', models.CharField(max_length=1024)),
                ('type', models.CharField(max_length=255)),
                ('attachment', models.CharField(max_length=1024)),
                ('create_Date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]