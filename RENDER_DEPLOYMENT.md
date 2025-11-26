# Deploying BioGram to Render

This guide explains how to deploy your Django BioGram application to Render for free.

## Prerequisites

1. **GitHub Account** - You'll need to push your code to GitHub
2. **Render Account** - Sign up at https://render.com (free)

## Step 1: Push Your Code to GitHub

If your code isn't on GitHub yet:

```bash
git init
git add .
git commit -m "Initial commit: BioGram health platform"
git remote add origin https://github.com/YOUR_USERNAME/biogram.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username and create a new repository on GitHub first.

If your code is already on GitHub, just ensure all changes are committed and pushed:

```bash
git status
git add .
git commit -m "Add Render deployment configuration"
git push
```

## Step 2: Deploy to Render

1. **Go to Render Dashboard**
   - Visit https://render.com
   - Log in or sign up (free account)

2. **Create New Blueprint**
   - Click "New +" button → "Blueprint"
   - Connect your GitHub account (authorize Render)
   - Select the `biogram` repository

3. **Select Branch**
   - Choose `main` branch (or your primary branch)

4. **Review Configuration**
   - Render will auto-detect `render.yaml`
   - Review the configuration:
     - Service name: `biogram`
     - Python version: 3.11.0
     - Build command: `./build.sh`
     - Start command: `gunicorn biogram.wsgi:application --bind 0.0.0.0:$PORT`

5. **Deploy**
   - Click "Deploy Blueprint"
   - Wait 5-10 minutes for initial deployment
   - Watch the logs for any issues

## Step 3: Access Your Application

Once deployed, your app will be available at:
```
https://biogram-YOUR_ID.onrender.com
```

You can find this URL in the Render dashboard under your service.

## Step 4: Create Admin User (Optional but Recommended)

The `build.sh` script includes commented code to auto-create a superuser. To enable it:

1. Edit `build.sh`
2. Uncomment the superuser creation section
3. Update the credentials (username, email, password)
4. Push to GitHub: `git push`
5. Render will auto-redeploy

Alternatively, create a superuser after deployment:

```bash
# Access Render shell from dashboard
python manage.py createsuperuser
```

Then access admin at: `https://biogram-YOUR_ID.onrender.com/admin`

## Environment Variables

Render automatically sets these from `render.yaml`:

- `SECRET_KEY` - Auto-generated secure key
- `DEBUG` - Set to `False` (production mode)
- `DATABASE_URL` - Managed by Render PostgreSQL
- `ALLOWED_HOSTS` - `.onrender.com`
- `CSRF_TRUSTED_ORIGINS` - `https://*.onrender.com`

You can add additional environment variables in the Render dashboard if needed.

## Important Notes

### Free Tier Limitations

- **Cold starts**: App goes to sleep after 15 minutes of inactivity
  - First request after sleep takes 15-30 seconds to wake up
  - Solution: Keep-alive services (paid tier or third-party service)

- **Database**: Free PostgreSQL is maintained for 90 days
  - After 90 days, you'll need to create a new database instance
  - Solution: Upgrade to paid tier for persistent DB

### Upgrading Beyond Free Tier

When you're ready for production:

1. **Upgrade Service Plan**
   - Paid plans start at $7/month
   - No more cold starts
   - Better performance

2. **Upgrade Database**
   - PostgreSQL paid plans start at $15/month
   - Persistent storage without 90-day limit

3. **Custom Domain**
   - Available on all plans
   - Add your own domain: `biogram.yourdomain.com`

## Troubleshooting

### Build Fails

Check the deployment logs in Render dashboard:
- Missing dependencies? Update `requirements.txt`
- Python version issues? Check `render.yaml` PYTHON_VERSION
- File permissions? Ensure `build.sh` is executable

### App Won't Start

- Check logs for error messages
- Verify `DEBUG=False` is set
- Ensure `SECRET_KEY` is generated
- Check database connection string

### Database Issues

- Migrations didn't run? Check `build.sh` - it runs `manage.py migrate`
- Permission denied? PostgreSQL user permissions in Render dashboard
- No tables? Run migrations manually in Render shell

### Static Files Not Loading

- Built into `build.sh`: runs `collectstatic --no-input`
- WhiteNoise middleware configured in `settings.py`
- Check `/static/` in Render logs

## Advanced Configuration

### Monitoring

Render provides free monitoring:
- Dashboard shows uptime, errors, and logs
- Set up email alerts in settings

### Custom Domain

1. Go to your service in Render dashboard
2. Settings → Custom domains
3. Add your domain and follow DNS instructions

### Environment-Specific Settings

For production-only features:

```python
# In biogram/settings.py
if not DEBUG:
    # Production-only settings
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
```

## Support & Resources

- **Render Docs**: https://render.com/docs
- **Django Deployment**: https://docs.djangoproject.com/en/5.2/howto/deployment/
- **Gunicorn Docs**: https://docs.gunicorn.org/

## Next Steps

1. Deploy to Render using these instructions
2. Test all features in production
3. Monitor logs and performance
4. Set up custom domain when ready
5. Plan upgrade path if needed

---

**Your BioGram app is ready to be hosted for free on Render!** 🚀
