# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-03-19 14:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kiddyer', '0003_auto_20180319_1410'),
    ]

    operations = [
        migrations.CreateModel(
            name='AuthGroupPermission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_id', models.IntegerField()),
                ('permission_id', models.IntegerField()),
            ],
        ),
    ]