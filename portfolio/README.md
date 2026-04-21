# Portfolio - Python/Django CV

Персональне портфоліо на Django. Проєкти, навички, таймлайн досвіду, контактна форма.

## Швидкий старт

```bash
# 1. Клонуємо / розпаковуємо проєкт
cd portfolio

# 2. Створюємо virtualenv
python -m venv venv
source venv/bin/activate        # Linux/Mac
venv\Scripts\activate           # Windows

# 3. Встановлюємо залежності
pip install -r requirements.txt

# 4. Міграції
python manage.py migrate

# 5. Завантажуємо початкові дані (навички + проєкти)
python manage.py loaddata cv/fixtures/initial_data.json

# 6. Створюємо адмін-акаунт
python manage.py createsuperuser

# 7. Запускаємо
python manage.py runserver
```

Відкрити у браузері: http://127.0.0.1:8000


## Структура проєкту

```
portfolio/
├── portfolio/          # Django config (settings, urls, wsgi)
├── cv/                 # Головний app
│   ├── models.py       # Project, Skill, Message
│   ├── views.py        # index, projects_all
│   ├── forms.py        # ContactForm
│   ├── admin.py        # Адмін-панель
│   ├── fixtures/       # Початкові дані
│   ├── templates/cv/   # HTML шаблони
│   └── static/cv/      # CSS + JS
├── manage.py
└── requirements.txt
```
