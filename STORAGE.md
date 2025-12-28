# Storage Strategy for Render Deployment

## Current Status (Ephemeral Storage)

**Render uses ephemeral `/tmp` storage** - files are deleted on:
- Container restart
- New deployment
- Service scaling

**Current behavior:**
- Reports generated during analysis are accessible during the session
- Files disappear after 10-30 minutes or on redeploy
- Fine for **hackathon demos** where users view reports immediately

## For Production (If Needed)

### Option 1: Cloudflare R2 (Recommended)
**Best for:** Production deployment with persistent storage

```bash
# Install R2 SDK
pip install boto3

# Configuration
R2_ENDPOINT = "https://<account-id>.r2.cloudflarestorage.com"
R2_ACCESS_KEY = "<access-key>"
R2_SECRET_KEY = "<secret-key>"
R2_BUCKET = "ds-agent-reports"
```

**Code changes needed:**
```python
# In src/storage/artifact_store.py
import boto3

def upload_to_r2(local_path: str, r2_key: str):
    s3 = boto3.client(
        's3',
        endpoint_url=os.getenv('R2_ENDPOINT'),
        aws_access_key_id=os.getenv('R2_ACCESS_KEY'),
        aws_secret_access_key=os.getenv('R2_SECRET_KEY')
    )
    s3.upload_file(local_path, os.getenv('R2_BUCKET'), r2_key)
    # Return public URL
    return f"https://reports.yourdomain.com/{r2_key}"
```

**Cost:** ~$0.015/GB storage + $0.36/million Class B operations (very cheap)

### Option 2: Render Persistent Disks
**Best for:** Simple persistent storage without external dependencies

- Add persistent disk in Render dashboard
- Mount at `/data`
- Change `OUTPUT_DIR` to `/data/outputs`
- **Cost:** $0.25/GB/month (more expensive than R2)
- **Limitation:** Disk size is fixed, can't easily scale

### Option 3: Browser-Side Download (Current + Enhancement)
**Best for:** Hackathon/Demo where users download immediately

```typescript
// Auto-download reports after generation
const downloadReport = async (reportPath: string) => {
  const response = await fetch(reportPath);
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = reportPath.split('/').pop() || 'report.html';
  a.click();
};
```

**Pros:**
- No storage costs
- Works with ephemeral Render storage
- User has permanent copy

**Cons:**
- Large files (reports can be 5-50MB)
- Can't re-access after browser close

## Recommendation for DevSprint Hackathon

**Keep current ephemeral storage** because:
1. ✅ No cost or setup complexity
2. ✅ Reports accessible during demo session
3. ✅ Judges can view reports immediately after generation
4. ✅ If needed, add "Download Report" button for permanent copy

**After hackathon** (if going to production):
- Use **Cloudflare R2** for cost-effective persistent storage
- Keep reports for 30 days with auto-cleanup
- Estimated cost: ~$1-5/month for typical usage

## Current File Serving

Reports are served via FastAPI endpoint:
```python
# src/api/app.py
@app.get("/outputs/{file_path:path}")
async def serve_output_file(file_path: str):
    file_full_path = Path(f"./outputs/{file_path}")
    return FileResponse(file_full_path, media_type="text/html")
```

Works perfectly for ephemeral storage during active sessions.
