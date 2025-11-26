# 🍃 MongoDB Setup Guide - Safal Classes

## Prerequisites

### Install MongoDB

#### For Ubuntu/Linux:
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package database
sudo apt update

# Install MongoDB
sudo apt install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod

# Check status
sudo systemctl status mongod
```

#### For Windows:
1. Download MongoDB Community Server from [mongodb.com/download-center/community](https://www.mongodb.com/try/download/community)
2. Run the installer
3. MongoDB will run as a Windows service automatically

#### For macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

---

## Development Setup

### 1. Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment
```bash
# Copy .env.example to .env
cp .env.example .env
```

Edit `.env` and set MongoDB configuration:
```env
# MongoDB Configuration
MONGO_DB_NAME=safalclasses_db
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_USER=
MONGO_PASSWORD=
```

### 3. Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Superuser
```bash
python manage.py createsuperuser
```

### 5. Run Server
```bash
python manage.py runserver
```

---

## Production Setup

### Option 1: Local MongoDB (Same Server)

#### 1. Install MongoDB on Server
```bash
# Follow Ubuntu installation steps above
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### 2. Create MongoDB User
```bash
# Connect to MongoDB
mongosh

# Switch to admin database
use admin

# Create admin user
db.createUser({
  user: "admin",
  pwd: "your-strong-password",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})

# Create database user
use safalclasses_db
db.createUser({
  user: "safalclasses_user",
  pwd: "your-database-password",
  roles: [ { role: "readWrite", db: "safalclasses_db" } ]
})

# Exit
exit
```

#### 3. Enable Authentication
```bash
# Edit MongoDB config
sudo nano /etc/mongod.conf
```

Add/uncomment these lines:
```yaml
security:
  authorization: enabled
```

Restart MongoDB:
```bash
sudo systemctl restart mongod
```

#### 4. Configure .env on Server
```env
MONGO_DB_NAME=safalclasses_db
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_USER=safalclasses_user
MONGO_PASSWORD=your-database-password
```

---

### Option 2: MongoDB Atlas (Cloud)

#### 1. Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free tier
3. Create a new cluster

#### 2. Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string

#### 3. Configure .env
```env
MONGO_DB_NAME=safalclasses_db
MONGO_HOST=cluster0.xxxxx.mongodb.net
MONGO_PORT=27017
MONGO_USER=your-atlas-username
MONGO_PASSWORD=your-atlas-password
```

Or use full URI in settings.py:
```python
MONGO_URI = "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/safalclasses_db?retryWrites=true&w=majority"
```

---

## MongoDB Commands Reference

### Basic Commands
```bash
# Connect to MongoDB
mongosh

# Show databases
show dbs

# Use database
use safalclasses_db

# Show collections
show collections

# View documents in a collection
db.accounts_customuser.find().pretty()

# Count documents
db.accounts_customuser.countDocuments()

# Drop collection
db.collection_name.drop()

# Drop database
db.dropDatabase()
```

### Backup & Restore
```bash
# Backup database
mongodump --db safalclasses_db --out /backup/mongodb/

# Restore database
mongorestore --db safalclasses_db /backup/mongodb/safalclasses_db/

# Backup with authentication
mongodump --username safalclasses_user --password your-password --db safalclasses_db --out /backup/
```

---

## Troubleshooting

### Issue: "Connection refused"
**Solution:**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

### Issue: "Authentication failed"
**Solution:**
1. Check username and password in `.env`
2. Verify user exists in MongoDB:
```bash
mongosh
use safalclasses_db
db.getUsers()
```

### Issue: "djongo not compatible"
**Solution:**
```bash
# Make sure you have correct versions
pip install djongo==1.3.6
pip install sqlparse==0.4.4
pip install pymongo==4.9.1
```

### Issue: "Cannot import name 'url' from 'django.conf.urls'"
**Solution:**
This is a known issue with djongo and Django 5.x. If you encounter this, you may need to:
1. Use Django 4.2 LTS instead
2. Or wait for djongo update
3. Or use pymongo directly with custom managers

---

## Migration from SQLite to MongoDB

If you have existing SQLite data:

### 1. Export Data
```bash
python manage.py dumpdata > data.json
```

### 2. Switch to MongoDB
Update settings.py and .env with MongoDB configuration

### 3. Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Import Data
```bash
python manage.py loaddata data.json
```

---

## Performance Tips

### 1. Create Indexes
```python
# In your models
class Meta:
    indexes = [
        models.Index(fields=['email']),
        models.Index(fields=['created_at']),
    ]
```

### 2. Use Select Related
```python
# Optimize queries
users = CustomUser.objects.select_related('batch').all()
```

### 3. Enable Query Logging (Development)
```python
# In settings.py
LOGGING = {
    'loggers': {
        'djongo': {
            'level': 'DEBUG',
            'handlers': ['console'],
        }
    }
}
```

---

## Security Best Practices

✅ **DO:**
- Use strong passwords for MongoDB users
- Enable authentication in production
- Use SSL/TLS for MongoDB connections
- Regularly backup your database
- Keep MongoDB updated

❌ **DON'T:**
- Expose MongoDB port (27017) to the internet
- Use default passwords
- Run MongoDB without authentication in production
- Store passwords in code

---

## Monitoring

### Check Database Size
```bash
mongosh
use safalclasses_db
db.stats()
```

### Monitor Connections
```bash
mongosh
db.serverStatus().connections
```

### View Slow Queries
```bash
db.setProfilingLevel(1, { slowms: 100 })
db.system.profile.find().pretty()
```

---

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Djongo Documentation](https://nesdis.github.io/djongo/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [MongoDB University](https://university.mongodb.com/) - Free courses

---

**Your MongoDB setup is ready! 🎉**
