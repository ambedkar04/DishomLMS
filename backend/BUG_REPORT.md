# 🐛 Critical Bug Report: Dependency Incompatibility

## 1. The Major Issue: Django vs. Djongo Version Mismatch
You are currently using **Django 5.2.1** with **Djongo 1.3.7**. This is a **critical incompatibility**.

- **Djongo 1.3.7** was designed for **Django 2.x and 3.x**.
- It is **not compatible** with Django 4.x or 5.x.
- Django 5.x has removed/changed many internal APIs (like `django.utils.encoding.force_text`, `sqlparse` behaviors, and database backend structures) that Djongo relies on.

### Symptoms you will face (once MongoDB connects):
- `AttributeError: module 'django.db.models.sql.compiler' has no attribute 'SQLCompiler'`
- `TypeError: ... got an unexpected keyword argument ...`
- Issues with `makemigrations` and `migrate`.
- Admin panel crashing.

## 2. The Database Driver Issue
- You have **pymongo 3.11.4** installed.
- While Djongo *requires* pymongo < 4.0, this version is quite old (current is 4.9+).
- Using such an old driver with Python 3.13 (which you are running) might lead to other subtle issues or lack of support for newer MongoDB server features (like the one we are installing, v8.x).

## 3. Recommended Fixes

### Option A: Switch to a Relational Database (Recommended)
Django is built for relational databases. Using MongoDB with Django is generally not recommended unless absolutely necessary, as the tooling (Djongo) is unmaintained.
- **Action**: Switch to **PostgreSQL** (production) or **SQLite** (dev).
- **Pros**: 100% Django compatibility, stable, no hacks needed.

### Option B: Downgrade Django (Not Recommended)
To use Djongo 1.3.7, you would need to downgrade Django significantly.
- **Action**: `pip install "Django<4.0"`
- **Cons**: You lose all modern Django features and security updates.

### Option C: Use 'pymongo' directly (Advanced)
Remove `djongo` and `Django ORM` for your MongoDB models.
- **Action**: Use `pymongo` to connect to MongoDB and write raw queries/helpers.
- **Cons**: You lose the Django Admin panel, ModelForms, and ORM conveniences for those collections.

## Summary
The "bug" is that your **tech stack is incompatible**. You cannot run Django 5+ with Djongo 1.3.7.

**My Advice**: Since you are building a learning platform (`Dishom`), I strongly suggest switching to **SQLite** (for now) or **PostgreSQL**. This will resolve all these weird errors and let you focus on building features.
