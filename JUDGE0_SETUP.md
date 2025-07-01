# 🚀 Judge0 Setup Guide (Simplest & Cheapest)

## What is Judge0?

Judge0 is an **open-source code execution engine** that supports 60+ programming languages including Go, C, C++, Java, Python, JavaScript, Rust, and more. It's perfect for your use case!

## 🎯 Why Judge0?

- ✅ **Free to self-host** or use hosted service
- ✅ **Supports Go, C, C++, Java, Rust** (all compiled languages)
- ✅ **Secure sandboxed execution**
- ✅ **No Docker management needed**
- ✅ **Pay-per-request pricing**

## 🚀 Quick Setup (3 Options)

### Option 1: Use RapidAPI (Easiest - 5 minutes)

1. **Sign up for RapidAPI Judge0**

   ```bash
   # Go to: https://rapidapi.com/judge0-official/api/judge0-ce/
   # Click "Subscribe to Test"
   # Get your API key
   ```

2. **Add environment variables**

   ```env
   NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key_here
   NEXT_PUBLIC_JUDGE0_URL=https://judge0-ce.p.rapidapi.com
   ```

3. **Done!** Your app now supports Go, C, C++, Java, Rust, etc.

**Cost:** ~$0.01 per execution (very cheap!)

---

### Option 2: Self-host on Google Cloud Run (Free tier)

1. **Deploy Judge0 to Cloud Run**

   ```bash
   # Clone Judge0
   git clone https://github.com/judge0/judge0.git
   cd judge0

   # Deploy to Cloud Run
   gcloud run deploy judge0 \
     --image judge0/judge0:latest \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --memory 2Gi \
     --cpu 2 \
     --max-instances 10
   ```

2. **Get your Cloud Run URL**

   ```bash
   # Your URL will be: https://judge0-xxxxx-uc.a.run.app
   ```

3. **Update environment variables**
   ```env
   NEXT_PUBLIC_JUDGE0_URL=https://judge0-xxxxx-uc.a.run.app
   ```

**Cost:** Free tier (2 million requests/month)

---

### Option 3: Use Judge0.com (Hosted service)

1. **Sign up at judge0.com**
2. **Get your API key and URL**
3. **Update environment variables**
   ```env
   NEXT_PUBLIC_JUDGE0_URL=https://your-instance.judge0.com
   NEXT_PUBLIC_JUDGE0_API_KEY=your_api_key
   ```

**Cost:** $10/month for 100,000 executions

---

## 🔧 Environment Variables

Add these to your `.env.local`:

```env
# For RapidAPI
NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key_here
NEXT_PUBLIC_JUDGE0_URL=https://judge0-ce.p.rapidapi.com

# OR for self-hosted
NEXT_PUBLIC_JUDGE0_URL=https://your-judge0-instance.com
NEXT_PUBLIC_JUDGE0_API_KEY=your_api_key_here
```

## 🧪 Test the Setup

1. **Start your development server**

   ```bash
   npm run dev
   ```

2. **Login with your authorized email**

3. **Try running Go code:**

   ```go
   package main

   import "fmt"

   func main() {
       fmt.Println("Hello from Go!")
   }
   ```

4. **Try running C code:**

   ```c
   #include <stdio.h>

   int main() {
       printf("Hello from C!\n");
       return 0;
   }
   ```

## 📊 Supported Languages

| Language   | ID  | Status     |
| ---------- | --- | ---------- |
| Go         | 60  | ✅ Working |
| C          | 50  | ✅ Working |
| C++        | 54  | ✅ Working |
| Python     | 71  | ✅ Working |
| JavaScript | 63  | ✅ Working |
| Java       | 62  | ✅ Working |
| Rust       | 73  | ✅ Working |

## 🔒 Security Features

- **Sandboxed execution** - Code runs in isolated containers
- **Resource limits** - CPU, memory, and time limits
- **Network isolation** - No internet access
- **File system restrictions** - Read-only access

## 💰 Cost Comparison

| Option       | Setup Time | Monthly Cost | Requests  |
| ------------ | ---------- | ------------ | --------- |
| RapidAPI     | 5 min      | ~$5-10       | 500-1000  |
| Cloud Run    | 15 min     | $0           | 2M (free) |
| Judge0.com   | 5 min      | $10          | 100K      |
| VPS + Docker | 2 hours    | $20-40       | Unlimited |

## 🚨 Troubleshooting

### "Authentication required" error

- Make sure you're logged in with an authorized email
- Check Firebase authentication is working

### "Language not supported" error

- Verify the language ID in `useJudge0Execution.ts`
- Check Judge0 API is responding

### "Execution timeout" error

- Increase the `maxAttempts` in the polling loop
- Check Judge0 server performance

### "API key invalid" error

- Verify your RapidAPI key is correct
- Check the API key has Judge0 access

## 🎯 Next Steps

1. **Choose your Judge0 option** (recommend RapidAPI for testing)
2. **Add environment variables**
3. **Test with different languages**
4. **Deploy your static frontend to Vercel**
5. **Monitor usage and costs**

---

**That's it!** You now have a scalable, secure, and cheap code execution backend without managing any servers! 🎉
