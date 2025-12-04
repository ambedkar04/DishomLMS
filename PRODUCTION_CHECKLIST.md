# Production Deployment Checklist for Dishom LMS

## 📋 Pre-Deployment Checklist

### 1. Environment Variables (.env file)
Check that your `.env` file has all required variables for production:

- [ ] **SECRET_KEY** - Generated unique key (NOT the development default)
  ```bash
  # Generate a new secret key:
  python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
  ```
  
- [ ] **DEBUG=False** - CRITICAL: Must be False in production
  
- [ ] **ALLOWED_HOSTS** - Contains your production domain(s)
  ```
  ALLOWED_HOSTS=safalclasses.com,www.safalclasses.com,YOUR_SERVER_IP
  ```
  
- [ ] **CORS_ALLOWED_ORIGINS** - Production frontend URLs only
  ```
  CORS_ALLOWED_ORIGINS=https://safalclasses.com,https://www.safalclasses.com
  ```

- [ ] **Email Configuration** - For notifications and password resets
  ```
  EMAIL_HOST=smtp.gmail.com
  EMAIL_PORT=587
  EMAIL_USE_TLS=True
  EMAIL_HOST_USER=your-email@gmail.com
  EMAIL_HOST_PASSWORD=your-app-specific-password
  DEFAULT_FROM_EMAIL=noreply@safalclasses.com
  ```

- [ ] **FRONTEND_BASE_URL** - Production frontend URL
  ```
  FRONTEND_BASE_URL=https://safalclasses.com
  ```

### 2. Security Settings
Verify these are configured in settings.py (they are enabled when DEBUG=False):

- [ ] HTTPS/SSL redirect enabled
- [ ] Secure cookies (SESSION_COOKIE_SECURE, CSRF_COOKIE_SECURE)
- [ ] HSTS headers configured
- [ ] X-Frame-Options set to DENY
- [ ] Content type sniffing protection enabled

### 3. Database Setup

- [ ] Database migrations applied
  ```bash
  python manage.py migrate
  ```

- [ ] Create superuser for admin access
  ```bash
  python manage.py createsuperuser
  ```

- [ ] Database backups configured (if using PostgreSQL/MySQL)

### 4. Static Files

- [ ] Build Tailwind CSS
  ```bash
  cd theme
  npm install
  npm run build
  cd ..
  ```

- [ ] Collect static files
  ```bash
  python manage.py collectstatic --noinput
  ```

- [ ] Verify `staticfiles` directory is created

### 5. Frontend Build (if applicable)

- [ ] Build React/frontend application
  ```bash
  cd ../frontend
  npm install
  npm run build
  cd ../backend
  ```

### 6. Server Configuration

#### Nginx Configuration Example:
```nginx
server {
    listen 80;
    server_name safalclasses.com www.safalclasses.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name safalclasses.com www.safalclasses.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    client_max_body_size 10M;

    location /static/ {
        alias /path/to/Dishom/backend/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /media/ {
        alias /path/to/Dishom/backend/media/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### Gunicorn Setup:
```bash
# Install gunicorn
pip install gunicorn

# Run with gunicorn
gunicorn Dishom.wsgi:application --bind 0.0.0.0:8000 --workers 3
```

#### Systemd Service (Linux):
Create `/etc/systemd/system/dishom.service`:
```ini
[Unit]
Description=Dishom LMS Django Application
After=network.target

[Service]
User=your-user
Group=www-data
WorkingDirectory=/path/to/Dishom/backend
Environment="PATH=/path/to/venv/bin"
ExecStart=/path/to/venv/bin/gunicorn --workers 3 --bind 0.0.0.0:8000 Dishom.wsgi:application

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl daemon-reload
sudo systemctl enable dishom
sudo systemctl start dishom
```

### 7. Security Hardening

- [ ] Firewall configured (allow only 80, 443, 22)
  ```bash
  sudo ufw allow 22/tcp
  sudo ufw allow 80/tcp
  sudo ufw allow 443/tcp
  sudo ufw enable
  ```

- [ ] SSH key-based authentication (disable password auth)
- [ ] Fail2ban installed and configured
- [ ] Regular security updates scheduled
- [ ] SSL certificate installed (Let's Encrypt recommended)
  ```bash
  sudo certbot --nginx -d safalclasses.com -d www.safalclasses.com
  ```

### 8. Monitoring & Logging

- [ ] Application logs directory created
  ```bash
  mkdir -p /path/to/Dishom/backend/logs
  ```

- [ ] Log rotation configured
- [ ] Error tracking setup (e.g., Sentry)
- [ ] Uptime monitoring configured
- [ ] Database backup schedule

### 9. Performance Optimization

- [ ] Redis cache configured (optional but recommended)
  ```
  REDIS_URL=redis://127.0.0.1:6379/1
  ```

- [ ] WhiteNoise for static files (already configured)
- [ ] Database query optimization reviewed
- [ ] Compression enabled in Nginx

### 10. Final Verification

- [ ] Test all critical user flows
- [ ] Verify admin panel access at `/admin/`
- [ ] Check all API endpoints
- [ ] Test file uploads
- [ ] Verify email sending
- [ ] Check HTTPS redirects work
- [ ] Test on mobile devices
- [ ] Review Django security checklist:
  ```bash
  python manage.py check --deploy
  ```

## 🚀 Quick Deployment Commands

```bash
# 1. Pull latest code
git pull origin main

# 2. Activate virtual environment
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Build frontend (Tailwind)
cd theme
npm install
npm run build
cd ..

# 5. Run migrations
python manage.py migrate

# 6. Collect static files
python manage.py collectstatic --noinput

# 7. Restart application
sudo systemctl restart dishom  # Linux with systemd
# or restart your gunicorn/uwsgi process

# 8. Check deployment
python manage.py check --deploy
```

## 🔥 Common Issues & Solutions

### Issue: Static files not loading
**Solution:** 
```bash
python manage.py collectstatic --clear --noinput
```

### Issue: 500 Internal Server Error
**Solution:** 
1. Check logs: `tail -f /path/to/Dishom/backend/logs/django_errors.log`
2. Ensure DEBUG=False and check ALLOWED_HOSTS
3. Run: `python manage.py check --deploy`

### Issue: Database connection errors
**Solution:** 
1. Verify database credentials in `.env`
2. Check database service is running
3. Ensure migrations are applied

### Issue: CORS errors
**Solution:** 
1. Verify CORS_ALLOWED_ORIGINS includes your frontend URL
2. Check CSRF_TRUSTED_ORIGINS in settings.py

## 📞 Support

For deployment issues:
1. Check logs in `/backend/logs/`
2. Run `python manage.py check --deploy` for Django's deployment checklist
3. Review this checklist thoroughly

## 🔒 Security Reminder

**NEVER commit .env files to version control!**
The `.env` file should be in `.gitignore` and created manually on the server.
