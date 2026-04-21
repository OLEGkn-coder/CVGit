from django.contrib import admin
from .models import Project, Skill, Message


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'is_featured')
    list_editable = ('is_featured',)
    list_filter = ('is_featured',)


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'level', 'order')
    list_editable = ('level', 'order')
    list_filter = ('category',)


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'sent_at', 'is_read')
    list_editable = ('is_read',)
    readonly_fields = ('sent_at',)
