from django import forms
from django.contrib.auth.models import User
#from bootstrap_toolkit.widgets import BootstrapDateInput, BootstrapTextInput, BootstrapUneditableInput


class LoginForm(forms.Form):
    username = forms.CharField(
        max_length=30,
        label='username'
    )

    password = forms.CharField(
        max_length=30,
        label='password'
    )


    def clean_username(self):
        username = self.cleaned_data['username']
        return self.cleaned_data['username']

    def clean_password1(self):
        password = self.cleaned_data['password']
        return self.cleaned_data['password']