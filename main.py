from fastapi import FastAPI, Request, UploadFile, File, Form, Body
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
import os
import secrets

import requests
from starlette.middleware.sessions import SessionMiddleware
from fastapi.responses import RedirectResponse

from fastapi.middleware.cors import CORSMiddleware





import tweepy
load_dotenv()
NEWS_API_KEY = os.getenv("NEWS_API_KEY")


X_CLIENT_ID = os.getenv("X_CLIENT_ID")
X_CLIENT_SECRET = os.getenv("X_CLIENT_SECRET")
X_API_KEY = os.getenv("X_API_KEY")
X_API_SECRET = os.getenv("X_API_SECRET")
X_BEARER_TOKEN = os.getenv("X_BEARER_TOKEN")

X_ACCESS_TOKEN = os.getenv("X_ACCESS_TOKEN")
X_ACCESS_TOKEN_SECRET = os.getenv("X_ACCESS_TOKEN_SECRET")






twitter_client = tweepy.Client(
    consumer_key=X_API_KEY,
    consumer_secret=X_API_SECRET,
    access_token=X_ACCESS_TOKEN,
    access_token_secret=X_ACCESS_TOKEN_SECRET,
)








import json
import re
import uuid
from datetime import datetime
from urllib.parse import quote
from collections import Counter
PDF_COUNT_FILE = "pdf_uploads/count.json"

import fitz
import feedparser
import hashlib
import base64

from urllib.parse import urlencode


from bs4 import BeautifulSoup
from dotenv import load_dotenv
from google import genai

# ===============================
# LOAD ENVIRONMENT
# ===============================

load_dotenv()

gemini_client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

















# ===============================
# FASTAPI
# ===============================
load_dotenv()
app = FastAPI()
X_CLIENT_ID = os.getenv("X_CLIENT_ID")









REDIRECT_URI = "https://threadcraft-ai-1.onrender.com/auth/callback"

AUTH_URL = "https://twitter.com/i/oauth2/authorize"

TOKEN_URL = "https://api.twitter.com/2/oauth2/token"



app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    SessionMiddleware,
    secret_key="threadcraft_super_secret_key"
)

app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static"
)

templates = Jinja2Templates(
    directory="templates"
)

# ===============================
# FILE PATHS
# ===============================

THREAD_FILE = "saved_threads/threads.json"

SCHEDULE_FILE = "scheduled_posts/schedule.json"

# ===============================
# THREAD HELPERS
# ===============================

def load_threads():

    os.makedirs("saved_threads", exist_ok=True)

    if not os.path.exists(THREAD_FILE):

        with open(THREAD_FILE, "w") as f:
            json.dump([], f)

    with open(THREAD_FILE, "r") as f:
        return json.load(f)


def save_threads(data):

    os.makedirs("saved_threads", exist_ok=True)

    with open(THREAD_FILE, "w") as f:
        json.dump(data, f, indent=4)

# ===============================
# SCHEDULE HELPERS
# ===============================

def load_schedule():

    os.makedirs("scheduled_posts", exist_ok=True)

    if not os.path.exists(SCHEDULE_FILE):

        with open(SCHEDULE_FILE, "w") as f:
            json.dump([], f)

    with open(SCHEDULE_FILE, "r") as f:
        return json.load(f)


def save_schedule(data):

    os.makedirs("scheduled_posts", exist_ok=True)

    with open(SCHEDULE_FILE, "w") as f:
        json.dump(data, f, indent=4)

# ===============================
# HOME
# ===============================






def generate_pkce():

    code_verifier = secrets.token_urlsafe(64)

    challenge = hashlib.sha256(
        code_verifier.encode()
    ).digest()

    code_challenge = base64.urlsafe_b64encode(
        challenge
    ).decode().replace("=", "")

    return code_verifier, code_challenge




@app.get("/", response_class=HTMLResponse)
async def home(request: Request):

    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )













# ===============================
# GENERATE THREAD
# ===============================

@app.post("/generate")
async def generate(

    article: str = Form(""),
    trend: str = Form(""),
    tone: str = Form("Professional"),
    length: str = Form("Medium"),
    file: UploadFile = File(None)

):

    text = article

    if file:

        pdf_bytes = await file.read()

        count = load_pdf_count()

        save_pdf_count(count + 1)

        pdf = fitz.open(
            stream=pdf_bytes,
            filetype="pdf"
        )

        text = ""

        for page in pdf:
            text += page.get_text()

    if "Short" in length:
        tweet_count = 5

    elif "Medium" in length:
        tweet_count = 10

    elif "Long" in length:
        tweet_count = 20

    else:
        tweet_count = 10

    prompt = f"""
You are ThreadCraft AI, an expert Twitter/X content strategist.

Generate EXACTLY {tweet_count} tweets.

STRICT RULES:

- Return EXACTLY {tweet_count} tweets.
- Never generate more than {tweet_count} tweets.
- Never generate fewer than {tweet_count} tweets.
- Number every tweet like:

1/
2/
3/
...
{tweet_count}/

- Stop immediately after tweet {tweet_count}.
- Return ONLY the Twitter thread.

Tone:
{tone}

Trending Topic:
{trend}

User Content:
{text}

Each tweet must:

- Under 280 characters
- Strong hook
- Easy to read
- End with curiosity or CTA whenever appropriate
- Use relevant hashtags

Return ONLY the completed Twitter thread.
"""

    try:
        print("Calling Gemini...")
        response = gemini_client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt
        )
        print("Gemini replied successfully")
        thread = response.text

        score_prompt = f"""
You are an expert Twitter/X growth strategist.

Analyze this thread.

Return ONLY valid JSON.

Example:

{{
"overall":94,
"hook":96,
"readability":89,
"virality":91,
"engagement":90
}}

Thread:

{thread}
"""

        try:
            score_response = gemini_client.models.generate_content(
                model="gemini-3.5-flash",
                contents=score_prompt
            )

            json_text = re.sub(
                r"```json|```",
                "",
                score_response.text
            ).strip()

            scores = json.loads(json_text)

        except Exception:

            scores = {
                "overall": 90,
                "hook": 90,
                "readability": 90,
                "virality": 90,
                "engagement": 90
            }

       

        return {
            "success": True,
            "thread": thread,
            "scores": scores
        }

    except Exception as e:

        import traceback

        traceback.print_exc()

        return {
            "success": False,
            "message": "AI service is temporarily unavailable. Please try again later.",
            "thread": "",
            "scores": {
                "overall": 0,
                "hook": 0,
                "readability": 0,
                "virality": 0,
                "engagement": 0
            }
        }


    # ===============================
# SAVE THREAD
# ===============================

@app.post("/save-thread")
async def save_thread(

    title: str = Form("Untitled Thread"),
   thread: str = Form(""),
   tone: str = Form("Professional")

):

    threads = load_threads()

    threads.append({

    "id": str(uuid.uuid4()),
    "title": title,
    "thread": thread,
    "tone": tone,
    "created": datetime.now().strftime("%d %b %Y %I:%M %p")

})

    save_threads(threads)

    return {

        "message": "Saved Successfully"

    }


# ===============================
# SCHEDULE THREAD
# ===============================

@app.post("/schedule-thread")
async def schedule_thread(

    title: str = Form(...),
    thread: str = Form(...),
    date: str = Form(...),
    time: str = Form(...)

):

    posts = load_schedule()

    posts.append({

        "id": str(uuid.uuid4()),
        "title": title,
        "thread": thread,
        "date": date,
        "time": time,
        "status": "Scheduled",
        "created": datetime.now().strftime("%d %b %Y %I:%M %p")

    })

    save_schedule(posts)

    return {

        "message": "Thread Scheduled Successfully"

    }


# ===============================
# PDF UPLOAD
# ===============================

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    pdf_bytes = await file.read()

    pdf = fitz.open(
        stream=pdf_bytes,
        filetype="pdf"
    )

    extracted_text = ""

    for page in pdf:
        extracted_text += page.get_text()

    return {

        "filename": file.filename,
        "text": extracted_text

    }


# ===============================
# LOGIN
# ===============================

@app.get("/login", response_class=HTMLResponse)
async def login(request: Request):

    return templates.TemplateResponse(
        request=request,
        name="login.html"
    )




# ===============================
# AI NEWS
# ===============================

def get_ai_news():

    feed = feedparser.parse(
        "https://techcrunch.com/category/artificial-intelligence/feed/"
    )

    news = []

    for item in feed.entries[:9]:

        news.append({

            "title": item.title,

            "summary": BeautifulSoup(
                item.summary,
                "html.parser"
            ).get_text(),

            "link": item.link

        })

    return news


# ===============================
# SEARCH NEWS
# ===============================

def search_news(query):

    url = "https://newsapi.org/v2/everything"

    params = {
        "q": query,
        "language": "en",
        "sortBy": "relevancy",
        "pageSize": 10,
        "domains": "bbc.com,reuters.com,theverge.com,techcrunch.com,cnbc.com",
        "apiKey": NEWS_API_KEY
    }

    response = requests.get(url, params=params)

    data = response.json()

    news = []

    for article in data.get("articles", []):

        news.append({

            "title": article.get("title", "No Title"),

            "summary": article.get("description", "No description available."),

            "link": article.get("url", "#")

        })

    return news





@app.get("/api/trends")
async def api_trends(q: str = ""):

    if q:
        news = search_news(q)
    else:
        news = get_ai_news()

    return news


# ===============================
# TREND EXPLORER
# ===============================

@app.get("/trends", response_class=HTMLResponse)
async def trends(
    request: Request,
    q: str = ""
):

    if q:
        news = search_news(q)
    else:
        news = get_ai_news()

    return templates.TemplateResponse(
        request=request,
        name="trends.html",
        context={
            "request": request,
            "news": news
        }
    )

# ===============================
# STUDIO
# ===============================

@app.get("/studio", response_class=HTMLResponse)
async def studio(

    request: Request,

    title: str = "",

    summary: str = ""

):

   return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={
            "title": title,
            "summary": summary
        }
    )



# ===============================
# THREAD LIBRARY
# ===============================

@app.get("/library")
async def library():

    threads = load_threads()

    return threads[::-1]


# ===============================
# SCHEDULER PAGE
# ===============================

@app.get("/scheduler", response_class=HTMLResponse)
async def scheduler(request: Request):

    posts = load_schedule()

    return templates.TemplateResponse(
        request=request,
        name="scheduler.html",
        context={
            "request": request,
            "posts": posts[::-1]
        }
    )







@app.get("/schedule")
async def schedule_api():

    posts = load_schedule()

    return posts[::-1]



















# ===============================
# POST THREAD TO X
# ===============================

@app.post("/post-x")
async def post_to_x(data: dict = Body(...)):

    try:
        response = twitter_client.create_tweet(
            text=data["thread"]
        )

        return {
            "message": "🎉 Posted successfully to X!",
            "tweet_id": response.data["id"]
        }

    except Exception as e:
        return {
            "message": "Unable to post to X. Please log in again or check your X account."
        }





# ===============================
# HEALTH CHECK
# ===============================








# ===============================
# ANALYTICS DASHBOARD
# ===============================






@app.get("/analytics-data")
async def analytics_data():

    threads = load_threads()
    posts = load_schedule()

    tone_counter = Counter()

    for t in threads:
        tone_counter[t.get("tone", "Professional")] += 1

    generated = len(threads)
    saved = len(threads)
    scheduled = len(posts)
    pdfs = load_pdf_count()

    weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    counter = Counter()




    for t in threads:

        date = datetime.strptime(
            t["created"],
            "%d %b %Y %I:%M %p"
        )

        day = weekdays[date.weekday()]

        counter[day] += 1




    weekly = []

    for day in weekdays:

        weekly.append(counter[day])




    recent_activity = []

    for t in threads[-4:][::-1]:
        recent_activity.append(
            f"{t['tone']} thread created on {t['created']}"
        )

    average_length = 0

    if len(threads) > 0:

        total = 0

        for t in threads:
            total += len(t["thread"].split("\n\n"))

        average_length = round(total / len(threads))

    most_used = "Professional"

    if len(tone_counter) > 0:
        most_used = tone_counter.most_common(1)[0][0]




    insights = []

    insights.append(
        f"Your most successful writing style is {most_used.lower()}."
    )

    insights.append(
        f"Your average thread contains {average_length} tweets."
    )

    if scheduled > 0:
        insights.append(
            f"{scheduled} scheduled post{'s' if scheduled != 1 else ''} are waiting for publication."
        )
    else:
        insights.append(
            "No scheduled posts. Schedule threads for consistent growth."
        )

    if generated >= 50:
        insights.append(
            "You're building a consistent publishing habit."
        )
    elif generated >= 20:
        insights.append(
            "You're gaining momentum. Keep publishing consistently."
        )
    else:
        insights.append(
            "Create a few more threads to unlock deeper analytics."
        )

        
    return {

        "generated": generated,
        "saved": saved,
        "scheduled": scheduled,
        "pdfs": pdfs,

        "weekly": weekly,

        "tones": {
            "Professional": tone_counter["Professional"],
            "Educational": tone_counter["Educational"],
            "Storytelling": tone_counter["Storytelling"],
            "Funny": tone_counter["Funny"],
            "Viral": tone_counter["Viral"],
            "Motivational": tone_counter["Motivational"]
        },

        "recentActivity": recent_activity,

        "insights": insights

    }







@app.get("/analytics", response_class=HTMLResponse)
async def analytics(request: Request):

    threads = load_threads()

    posts = load_schedule()


    tone_counter = Counter()

    for t in threads:
        tone_counter[t.get("tone", "Professional")] += 1

    professional = tone_counter["Professional"]

    educational = tone_counter["Educational"]

    storytelling = tone_counter["Storytelling"]

    funny = tone_counter["Funny"]

    viral = tone_counter["Viral"]

    motivational = tone_counter["Motivational"]

    generated = len(threads)

    saved = len(threads)

    scheduled = len(posts)

    pdfs = load_pdf_count()

    return templates.TemplateResponse(
        request=request,
        name="analytics.html",
        context={
            "request": request,

            "generated": generated,
            "saved": saved,
            "scheduled": scheduled,
            "pdfs": pdfs,

            "professional": professional,
            "educational": educational,
            "storytelling": storytelling,
            "funny": funny,
            "viral": viral,
            "motivational": motivational
        }
    )














@app.get("/health")
async def health():

    return {

        "status": "healthy",

        "service": "ThreadCraft AI",

        "ai": "Gemini 2.5 Flash"

    }



def load_pdf_count():

    os.makedirs("pdf_uploads", exist_ok=True)

    if not os.path.exists(PDF_COUNT_FILE):
        with open(PDF_COUNT_FILE, "w") as f:
            json.dump({"count": 0}, f)

    with open(PDF_COUNT_FILE, "r") as f:
        return json.load(f)["count"]


def save_pdf_count(count):

    os.makedirs("pdf_uploads", exist_ok=True)

    with open(PDF_COUNT_FILE, "w") as f:
        json.dump({"count": count}, f, indent=4)









@app.post("/improve-thread")
async def improve_thread(request: Request):

    try:

        data = await request.json()

        thread = data["thread"]

        prompt = f"""
You are an expert Twitter/X copywriter.

Rewrite the following Twitter thread.

Rules:

- Keep the same topic.
- Never invent facts.
- Make the hook stronger.
- Increase engagement.
- Improve readability.
- Make every tweet punchier.
- Keep tweet numbering.
- Keep under 280 characters.
- Keep hashtags.

Return ONLY the improved thread.

Thread:

{thread}
"""

        response = gemini_client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt

        )

        improved_thread = response.text

        score_prompt = f"""
You are an expert Twitter/X growth strategist.

Analyze this thread.

Return ONLY valid JSON.

Example:

{{
"overall":94,
"hook":96,
"readability":89,
"virality":91,
"engagement":90
}}

Thread:

{improved_thread}
"""

        try:
            score_response = gemini_client.models.generate_content(
                model="gemini-3.5-flash",
                contents=score_prompt
            )

            json_text = re.sub(
                r"```json|```",
                "",
                score_response.text
            ).strip()

            scores = json.loads(json_text)

        except Exception:

            scores = {
                "overall": 90,
                "hook": 90,
                "readability": 90,
                "virality": 90,
                "engagement": 90
            }

        return {
            "thread": improved_thread,
            "scores": scores
        }

   

    except Exception as e:

        import traceback

        traceback.print_exc()

        return {
            "success": False,
            "message": "AI service is temporarily unavailable. Please try again later."
        }






@app.get("/login-x")
async def login_x(request: Request):

    state = secrets.token_urlsafe(16)

    code_verifier, code_challenge = generate_pkce()

    request.session["oauth_state"] = state
    request.session["code_verifier"] = code_verifier

    params = {

        "response_type": "code",

        "client_id": X_CLIENT_ID,

        "redirect_uri": REDIRECT_URI,

        "scope": "tweet.read tweet.write users.read offline.access",

        "state": state,

        "code_challenge": code_challenge,

        "code_challenge_method": "S256"

    }

    login_url = AUTH_URL + "?" + urlencode(params)

    return RedirectResponse(login_url)









@app.get("/auth/callback")
async def auth_callback(request: Request):

    code = request.query_params.get("code")
    state = request.query_params.get("state")

    if state != request.session.get("oauth_state"):
        return {"message": "Invalid state"}

    code_verifier = request.session.get("code_verifier")

    response = requests.post(

        TOKEN_URL,

        auth=(X_CLIENT_ID, X_CLIENT_SECRET),

        data={

            "grant_type": "authorization_code",

            "code": code,

            "redirect_uri": REDIRECT_URI,

            "code_verifier": code_verifier,

        },

        headers={
            "Content-Type": "application/x-www-form-urlencoded",
        },

    )

    token = response.json()

    print(token)

    request.session["token"] = token
    print("SESSION AFTER LOGIN =", request.session)

    return RedirectResponse("http://127.0.0.1:3000")





    