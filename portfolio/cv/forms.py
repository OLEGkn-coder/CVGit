from django import forms


class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=150,
        widget=forms.TextInput(attrs={
            'placeholder': 'Ваше ім\'я',
            'class': 'form-input',
        })
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={
            'placeholder': 'email@company.com',
            'class': 'form-input',
        })
    )
    text = forms.CharField(
        widget=forms.Textarea(attrs={
            'placeholder': 'Розкажіть про проєкт або вакансію...',
            'class': 'form-input',
            'rows': 5,
        })
    )
