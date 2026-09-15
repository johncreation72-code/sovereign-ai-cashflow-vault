#!/usr/bin/env python3
"""
SOVEREIGN AUTONOMOUS SYNDICATION ENGINE
Automated Reddit Poster across 6 High-Intent Communities
"""

import sys
import json
import time
import urllib.request
import urllib.parse
import base64

STORE_LINK = "https://whop.com/checkout/plan_UL1yNCSJUr2Ka"

# Master Campaigns Matrix (14.4M Total Reach)
CAMPAIGNS = [
    {
        "subreddit": "SideHustle",
        "title": "I tested 20+ AI side hustles over the past 6 months. Here are the only 3 that actually make $100/day without upfront capital.",
        "body": f"""Hey everyone,

Tired of generic videos telling people to sell AI coloring books or dropship low-margin junk, I spent the last 6 months testing practical zero-cost AI systems to see what actually works. Here are the top 3 high-yield models:

1. The Local Clinic "Missed Call Auto-Responder":
Small businesses lose thousands when they miss calls. You can connect a free Twilio or no-code webhook that auto-texts missed callers within 5 seconds with a booking link. 
Pricing: $199/mo retainer per clinic. 2 clinics = $400/mo recurring.

2. Real Estate Multi-Asset Generation:
Realtors hate writing listing descriptions, social carousels, and video walk-through scripts for every house. With a structured prompt, you generate the entire marketing package in 90 seconds. Charge $75 per listing.

3. Negative Review Competitor Extraction:
Scrape 10 negative reviews from a client's competitor on Google Maps, run it through AI, and output a "Market Vulnerability Report" showing them how to steal those dissatisfied customers.

If anyone wants the complete document with all 50 copy-paste workflows and exact prompts, I compiled it into a clean master PDF guide. 

Direct access link: {STORE_LINK}

Drop any questions below, happy to explain how the automations work!"""
    },
    {
        "subreddit": "ChatGPT",
        "title": "99% of people use ChatGPT for generic text. Here are 3 enterprise prompt architectures that replace $500 services.",
        "body": f"""Most ChatGPT users ask basic questions. The top 1% use structured chain-of-thought prompts to automate B2B services.

Here are 3 tested architectures:
1. Multi-Variable Cold Outreach Scraper & Personalizer
2. Automated Commercial Contract Risk Matrix
3. Local SEO Keyword & Google Maps Citation Map

Compiled all 50 full prompt frameworks into a master guide here: {STORE_LINK}

What workflows are you currently building with AI?"""
    },
    {
        "subreddit": "Passive_Income",
        "title": "How to build a 100% digital prompt asset and distribute it on autopilot (The $0 Setup Blueprint).",
        "body": f"""If you are looking to build true scalable income, high-margin digital toolkits delivered automatically via webhooks beat physical inventory every single time.

Key steps:
1. Package high-utility AI workflows
2. Free storefront checkout with instant crypto/card delivery
3. Algorithmic short-form and community distribution

Check out the full 2026 AI Cashflow Blueprint here: {STORE_LINK}"""
    },
    {
        "subreddit": "Entrepreneur",
        "title": "How solopreneurs are generating agency-level output with zero employees in 2026.",
        "body": f"""The 1-person enterprise is now reality. With modern AI prompt stacks, one founder can execute client acquisition, delivery, and reporting in under 30 minutes a day.

Full 50-workflow blueprint and SOPs here: {STORE_LINK}"""
    },
    {
        "subreddit": "MakeMoney",
        "title": "Stop buying expensive courses: 3 AI methods you can start today with $0 upfront.",
        "body": f"""Detailed breakdown of 3 zero-dollar AI workflows you can run today to make your first $100 online. 

Master guide with all 50 prompts: {STORE_LINK}"""
    },
    {
        "subreddit": "WorkOnline",
        "title": "3 remote AI services that local businesses are actively paying $200-$500/month for.",
        "body": f"""Local business owners don't have time to learn AI. Offering automated missed-call text-backs and review automation is an easy recurring retainer. 

Guide & templates: {STORE_LINK}"""
    }
]

def get_oauth_token(client_id, client_secret, username, password):
    """Authenticate with Reddit OAuth API"""
    url = "https://www.reddit.com/api/v1/access_token"
    auth = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode('utf-8')
    data = urllib.parse.urlencode({
        "grant_type": "password",
        "username": username,
        "password": password
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=data, headers={
        "Authorization": f"Basic {auth}",
        "User-Agent": "SovereignAutoDistributor/1.0"
    })
    
    try:
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read().decode('utf-8'))
            return res.get("access_token")
    except Exception as e:
        print(f"[-] Authentication Error: {e}")
        return None

def submit_post(token, subreddit, title, body):
    """Submit post to Reddit"""
    url = "https://oauth.reddit.com/api/submit"
    data = urllib.parse.urlencode({
        "sr": subreddit,
        "title": title,
        "text": body,
        "kind": "self",
        "resubmit": "true"
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=data, headers={
        "Authorization": f"Bearer {token}",
        "User-Agent": "SovereignAutoDistributor/1.0",
        "Content-Type": "application/x-www-form-urlencoded"
    })
    
    try:
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read().decode('utf-8'))
            return res
    except Exception as e:
        print(f"[-] Error posting to r/{subreddit}: {e}")
        return None

def main():
    print("===============================================================")
    print("⚡ SOVEREIGN AUTONOMOUS REDDIT SYNDICATION ENGINE (14.4M REACH)")
    print("===============================================================")
    print(f"Store Link: {STORE_LINK}")
    print(f"Total Target Communities: {len(CAMPAIGNS)}\n")
    
    # Check if config file exists
    config_file = "reddit_config.json"
    try:
        with open(config_file, "r") as f:
            cfg = json.load(f)
    except:
        print(f"[!] Config file '{config_file}' not found.")
        print("Please create 'reddit_config.json' with your Reddit credentials:")
        print(json.dumps({
            "client_id": "YOUR_REDDIT_APP_ID",
            "client_secret": "YOUR_REDDIT_SECRET",
            "username": "YOUR_REDDIT_USERNAME",
            "password": "YOUR_REDDIT_PASSWORD"
        }, indent=2))
        return

    print("[*] Authenticating with Reddit API...")
    token = get_oauth_token(cfg["client_id"], cfg["client_secret"], cfg["username"], cfg["password"])
    
    if not token:
        print("[-] Authentication failed. Please check your credentials in reddit_config.json")
        return
        
    print("[+] Successfully authenticated! Beginning automated syndication blast...\n")
    
    for idx, camp in enumerate(CAMPAIGNS, 1):
        sub = camp["subreddit"]
        print(f"[{idx}/{len(CAMPAIGNS)}] Dispatching campaign to r/{sub}...")
        result = submit_post(token, sub, camp["title"], camp["body"])
        
        if result and result.get("success", False):
            post_url = result.get("data", {}).get("url", "Live")
            print(f"    [+] SUCCESS! Live on r/{sub}: {post_url}")
        else:
            print(f"    [*] Response from r/{sub}: {result}")
            
        if idx < len(CAMPAIGNS):
            print("    [*] Sleeping 45 seconds to respect rate limits...")
            time.sleep(45)
            
    print("\n🎉 ALL CAMPAIGNS DISPATCHED ACROSS 14.4M AUDIENCE POOL!")

if __name__ == "__main__":
    main()
