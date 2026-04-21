from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings

from .models import Project, Skill, Message
from .forms import ContactForm


ABOUT = {
    'name': 'Олег Мошенський',   
    'role': 'Python / Django Developer',
    'tagline': 'Пишу чистий код, вчуся кожен день і не боюся складних задач.',
    'bio': (
        'Привіт! Я junior розробник з Києва. '
        'Будую backend на Django, знаю основи REST API, розумію як працює ORM і можу задеплоїти '
        'проєкт на Railway або Render. Шукаю команду, де зможу рости і приносити реальну користь.'
    ),
    'email': 'mosenskijo@gmail.com',   
    'github': 'https://github.com/OLEGkn-coder/CVGit.git',
    'linkedin': '', 
    'location': 'Kyiv, Ukraine',
    'open_to_work': True,
}

EXPERIENCE = []

EDUCATION = [
    {
        'school': 'Національний університет "Києво-Могилянська академія"',
        'degree': 'Бакалавр, Компютерні науки',
        'year': '2024 - now',
    },
]


def index(request):
    projects = Project.objects.filter(is_featured=True)[:4]
    skills = Skill.objects.all()

    skills_by_category = {}
    for skill in skills:
        cat = skill.get_category_display()
        skills_by_category.setdefault(cat, []).append(skill)

    form = ContactForm()

    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            Message.objects.create(
                name=form.cleaned_data['name'],
                email=form.cleaned_data['email'],
                text=form.cleaned_data['text'],
            )
            messages.success(request, 'Повідомлення отримано! Відповім найближчим часом.')
            return redirect('index')

    context = {
        'about': ABOUT,
        'experience': EXPERIENCE,
        'education': EDUCATION,
        'projects': projects,
        'skills_by_category': skills_by_category,
        'form': form,
    }
    return render(request, 'cv/index.html', context)


def projects_all(request):
    all_projects = Project.objects.all()
    context = {
        'about': ABOUT,
        'projects': all_projects,
    }
    return render(request, 'cv/projects.html', context)
