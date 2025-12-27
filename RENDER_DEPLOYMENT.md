# Render Deployment Guide

## Prerequisites

1. A [Render account](https://render.com/) (free tier available)
2. Your GitHub repository connected to Render
3. Google Gemini API key

## Quick Deploy (Recommended)

### Option 1: Using render.yaml (Infrastructure as Code)

1. **Push your code to GitHub** (already done)

2. **Create a new Web Service on Render:**
   - Go to https://dashboard.render.com/
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository: `Pulastya-B/DevSprint-Data-Science-Agent`
   - Render will automatically detect the `render.yaml` file
   - Click "Apply"

3. **Add Secret Environment Variable:**
   - Go to your service dashboard
   - Navigate to "Environment" tab
   - Add your `GOOGLE_API_KEY` (this is sensitive and not included in render.yaml)
   - Click "Save Changes"

4. **Deploy:**
   - Render will automatically build and deploy your application
   - Wait for the build to complete (~5-10 minutes for first deploy)
   - Your app will be available at: `https://data-science-agent.onrender.com`

### Option 2: Manual Setup

1. **Create a new Web Service:**
   - Go to https://dashboard.render.com/
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure the service:**
   - **Name:** `data-science-agent`
   - **Region:** Oregon (US West)
   - **Branch:** `main`
   - **Runtime:** Docker
   - **Plan:** Free (or Starter for production)

3. **Add Environment Variables:**
   ```
   LLM_PROVIDER=gemini
   GOOGLE_API_KEY=<your-api-key-here>
   GEMINI_MODEL=gemini-2.5-flash
   REASONING_EFFORT=medium
   CACHE_DB_PATH=/tmp/cache_db/cache.db
   CACHE_TTL_SECONDS=86400
   OUTPUT_DIR=/tmp/outputs
   DATA_DIR=/tmp/data
   MAX_PARALLEL_TOOLS=5
   MAX_RETRIES=3
   TIMEOUT_SECONDS=300
   PORT=8080
   ARTIFACT_BACKEND=local
   ```

4. **Configure Health Check:**
   - **Health Check Path:** `/api/health`

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for the build to complete

## Important Notes

### Free Tier Limitations

- **Spin down after inactivity:** Free tier services spin down after 15 minutes of inactivity
- **Cold starts:** First request after spin-down will take 30-60 seconds
- **Memory:** 512 MB RAM (may be tight for large ML models)
- **Build time:** Free tier has slower build times

### Upgrading to Paid Plan

For production use, consider upgrading to at least the **Starter plan ($7/month)**:
- No spin-down
- Faster builds
- More memory (512 MB → 2 GB)
- Better performance

### Storage Considerations

- Render uses **ephemeral storage** - files are lost on restart
- For persistent storage, consider:
  - Connecting to external storage (S3, GCS)
  - Using Render's persistent disk (paid plans only)
  - Storing only temporary analysis results

### Performance Optimization

1. **Use caching:** The app includes SQLite caching for repeated queries
2. **Monitor memory usage:** Large datasets may exceed free tier limits
3. **Optimize docker image:** The multi-stage build already optimizes image size
4. **Regional selection:** Choose a region close to your users

## Deployment Commands

### Manual Rebuild (if needed)
```bash
# Trigger rebuild via Render Dashboard
# or use Render API
curl -X POST https://api.render.com/v1/services/<service-id>/deploys \
  -H "Authorization: Bearer <your-api-key>"
```

### Check Logs
```bash
# View logs in Render Dashboard
# or use Render CLI
render logs -s data-science-agent
```

## Custom Domain (Optional)

1. Go to your service dashboard
2. Click "Settings" → "Custom Domain"
3. Add your domain (e.g., `agent.yourdomain.com`)
4. Update your DNS records as instructed
5. Render automatically provisions SSL certificates

## Troubleshooting

### Build Fails

**Issue:** Docker build timeout
- **Solution:** Increase build timeout in Render settings
- **Alternative:** Optimize Dockerfile to reduce build time

**Issue:** Out of memory during build
- **Solution:** Upgrade to paid plan with more memory
- **Alternative:** Reduce dependencies in requirements.txt

### App Crashes on Startup

**Issue:** Missing environment variables
- **Solution:** Verify all required env vars are set in Render dashboard

**Issue:** Port binding error
- **Solution:** Ensure app listens on `0.0.0.0` and PORT env variable

### Slow Performance

**Issue:** Cold starts on free tier
- **Solution:** Upgrade to paid plan to prevent spin-down
- **Workaround:** Use a cron job to ping your app every 10 minutes

**Issue:** Large dataset processing timeout
- **Solution:** Increase TIMEOUT_SECONDS env variable
- **Consider:** Processing large datasets asynchronously

## Monitoring

### Health Check
Your app exposes a health check endpoint at `/api/health`:
```bash
curl https://data-science-agent.onrender.com/api/health
```

### Logs
- View real-time logs in Render Dashboard
- Configure log drains for external monitoring (paid plans)

### Metrics
Render provides built-in metrics:
- CPU usage
- Memory usage
- Request count
- Response time

## Security Best Practices

1. **Never commit API keys** to Git (use environment variables)
2. **Enable CORS** only for trusted domains in production
3. **Use HTTPS** (Render provides this automatically)
4. **Rotate API keys** regularly
5. **Monitor usage** to detect anomalies

## Cost Estimation

### Free Tier
- Cost: $0/month
- Best for: Development, testing, hackathons
- Limitations: Spin-down, slower builds, 512MB RAM

### Starter Plan ($7/month)
- No spin-down
- 512MB RAM → 2GB RAM
- Faster builds
- Better for: Small production apps

### Standard Plan ($25/month)
- 4GB RAM
- High performance
- Best for: Production apps with moderate traffic

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] `render.yaml` committed to repository
- [ ] Render account created
- [ ] GitHub repository connected to Render
- [ ] Blueprint deployed (or manual service created)
- [ ] `GOOGLE_API_KEY` added as secret environment variable
- [ ] Health check endpoint verified
- [ ] Application accessible at Render URL
- [ ] Custom domain configured (optional)
- [ ] Monitoring and alerts set up

## Support

- **Render Documentation:** https://render.com/docs
- **Render Community:** https://community.render.com/
- **GitHub Issues:** https://github.com/Pulastya-B/DevSprint-Data-Science-Agent/issues

## Next Steps

After successful deployment:

1. **Test the deployment:**
   ```bash
   curl https://data-science-agent.onrender.com/api/health
   ```

2. **Upload a test dataset** via the web interface

3. **Monitor logs** for any errors

4. **Configure custom domain** (optional)

5. **Set up monitoring** and alerts

6. **Share your deployed app!** 🚀

---

**Your app will be live at:**
`https://data-science-agent.onrender.com`

(URL will be different if you choose a different service name)
