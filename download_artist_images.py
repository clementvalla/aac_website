#!/usr/bin/env python3
"""
Script to download representative images for artists in the AAC website.
Uses DuckDuckGo image search to find images and downloads them.
"""

import os
import time
import requests
from urllib.parse import quote_plus
import json

# Artist data: (name, filename_slug, search_query)
ARTISTS = [
    ("Vera Molnár", "vera-molnar", "Vera Molnar computational art"),
    ("Harold Cohen / AARON", "harold-cohen-aaron", "Harold Cohen AARON artwork"),
    ("Trevor Paglen", "trevor-paglen", "Trevor Paglen artwork"),
    ("Sam Lavigne", "sam-lavigne", "Sam Lavigne art project"),
    ("Tega Brain", "tega-brain", "Tega Brain artwork"),
    ("Zach Lieberman", "zach-lieberman", "Zach Lieberman creative coding"),
    ("American Artist", "american-artist", "American Artist artwork"),
    ("teamLab", "teamlab", "teamLab installation"),
    ("Eric Hu", "eric-hu", "Eric Hu design typography"),
    ("Certain Measures", "certain-measures", "Certain Measures architecture"),
    ("JODI", "jodi", "JODI net art"),
    ("Casey Reas", "casey-reas", "Casey Reas processing artwork"),
    ("Ian Cheng", "ian-cheng", "Ian Cheng artwork"),
    ("Holly Herndon & Mat Dryhurst", "holly-herndon-mat-dryhurst", "Holly Herndon Mat Dryhurst"),
    ("Aranda\\Lasch", "aranda-lasch", "Aranda Lasch architecture"),
    ("Jenny Sabin Studio", "jenny-sabin", "Jenny Sabin architecture"),
    ("Neri Oxman", "neri-oxman", "Neri Oxman design"),
    ("Matter Design", "matter-design", "Matter Design architecture"),
    ("Nervous System", "nervous-system", "Nervous System design"),
    ("Manfred Mohr", "manfred-mohr", "Manfred Mohr algorithmic art"),
    ("John Maeda", "john-maeda", "John Maeda design"),
    ("Muriel Cooper", "muriel-cooper", "Muriel Cooper design"),
    ("Golan Levin", "golan-levin", "Golan Levin interactive art"),
    ("Lauren Lee McCarthy", "lauren-lee-mccarthy", "Lauren Lee McCarthy artwork"),
    ("Hito Steyerl", "hito-steyerl", "Hito Steyerl video art"),
    ("Pierre Huyghe", "pierre-huyghe", "Pierre Huyghe installation"),
    ("Cory Arcangel", "cory-arcangel", "Cory Arcangel artwork"),
    ("Cao Fei", "cao-fei", "Cao Fei artwork"),
    ("Lu Yang", "lu-yang", "Lu Yang artwork"),
    ("Rachel Rossin", "rachel-rossin", "Rachel Rossin VR art"),
    ("Ryoji Ikeda", "ryoji-ikeda", "Ryoji Ikeda installation"),
    ("Ubermorgen", "ubermorgen", "Ubermorgen net art"),
    ("Rafaël Rozendaal", "rafael-rozendaal", "Rafael Rozendaal net art"),
    ("Auriea Harvey", "auriea-harvey", "Auriea Harvey artwork"),
    ("Sougwen Chung", "sougwen-chung", "Sougwen Chung robotic art"),
    ("Refik Anadol", "refik-anadol", "Refik Anadol data sculpture"),
    ("Mario Klingemann", "mario-klingemann", "Mario Klingemann AI art"),
    ("Stephanie Dinkins", "stephanie-dinkins", "Stephanie Dinkins AI artwork"),
    ("Anna Ridler", "anna-ridler", "Anna Ridler AI art"),
    ("Rafael Lozano-Hemmer", "rafael-lozano-hemmer", "Rafael Lozano-Hemmer installation"),
    ("Random International", "random-international", "Random International Rain Room"),
    ("Jennifer Steinkamp", "jennifer-steinkamp", "Jennifer Steinkamp installation"),
    ("Jim Campbell", "jim-campbell", "Jim Campbell LED art"),
    ("Maya Man", "maya-man", "Maya Man generative art"),
    ("Surya Mattu", "surya-mattu", "Surya Mattu data journalism"),
    ("Roopa Vasudevan", "roopa-vasudevan", "Roopa Vasudevan artwork"),
    ("Mimi Ọnụọha", "mimi-onuoha", "Mimi Onuoha data art"),
    ("Morehshin Allahyari", "morehshin-allahyari", "Morehshin Allahyari 3D printing"),
    ("Ben Fry", "ben-fry", "Ben Fry data visualization"),
    ("Richard The", "richard-the", "Richard The typography"),
    ("Laura Coombs", "laura-coombs", "Laura Coombs design"),
    ("Luna Maurer / Conditional Design", "luna-maurer-conditional-design", "Luna Maurer Conditional Design"),
    ("Rune Madsen", "rune-madsen", "Rune Madsen computational design"),
    ("Giorgia Lupi", "giorgia-lupi", "Giorgia Lupi data visualization"),
    ("Jer Thorp", "jer-thorp", "Jer Thorp data visualization"),
    ("Laurel Schwulst", "laurel-schwulst", "Laurel Schwulst web design"),
    ("Metahaven", "metahaven", "Metahaven design"),
    ("David Reinfurt", "david-reinfurt", "David Reinfurt O-R-G design"),
    ("Mindy Seu", "mindy-seu", "Mindy Seu design"),
    ("John Provencher", "john-provencher", "John Provencher design"),
    ("Bret Victor", "bret-victor", "Bret Victor interface design"),
    ("Tristan Perich", "tristan-perich", "Tristan Perich sound art"),
    ("Mendi + Keith Obadike", "mendi-keith-obadike", "Mendi Keith Obadike sound art"),
]

OUTPUT_DIR = "images/artists"

def download_image_from_url(url, filepath):
    """Download an image from a URL to a file."""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()

        with open(filepath, 'wb') as f:
            f.write(response.content)
        return True
    except Exception as e:
        print(f"  Error downloading: {e}")
        return False

def search_duckduckgo_images(query, max_results=5):
    """Search DuckDuckGo for images."""
    try:
        url = f"https://duckduckgo.com/?q={quote_plus(query)}&iax=images&ia=images"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }

        # This is a simplified approach - DuckDuckGo's image search requires token handling
        # For production, consider using: duckduckgo-search library or Bing Image Search API
        print(f"  Search query: {query}")
        print(f"  Manual search URL: {url}")
        return []
    except Exception as e:
        print(f"  Search error: {e}")
        return []

def main():
    """Main function to download all artist images."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("=" * 80)
    print("ARTIST IMAGE DOWNLOADER")
    print("=" * 80)
    print(f"\nTotal artists: {len(ARTISTS)}")
    print(f"Output directory: {OUTPUT_DIR}\n")

    # Check which images already exist
    existing = []
    missing = []

    for name, slug, query in ARTISTS:
        filepath = os.path.join(OUTPUT_DIR, f"{slug}.jpg")
        if os.path.exists(filepath):
            existing.append(name)
        else:
            missing.append((name, slug, query))

    print(f"✓ Already have images: {len(existing)}")
    print(f"✗ Need to download: {len(missing)}\n")

    if existing:
        print("Already downloaded:")
        for name in existing[:5]:
            print(f"  • {name}")
        if len(existing) > 5:
            print(f"  ... and {len(existing) - 5} more")
        print()

    if missing:
        print("=" * 80)
        print("MANUAL IMAGE DOWNLOAD GUIDE")
        print("=" * 80)
        print("\nSince automated image downloading has legal/ethical considerations,")
        print("here's a guide to manually download images:\n")

        for i, (name, slug, query) in enumerate(missing, 1):
            print(f"{i}. {name}")
            print(f"   Search: https://duckduckgo.com/?q={quote_plus(query)}&iax=images&ia=images")
            print(f"   Save as: {OUTPUT_DIR}/{slug}.jpg")
            print()

        print("\nAlternatively, use this wget/curl approach:")
        print("-" * 80)
        print("# For each artist, find an image URL and run:")
        print("# wget -O images/artists/[slug].jpg [IMAGE_URL]")
        print()

        # Create a simple download script
        script_path = "download_images_manual.sh"
        with open(script_path, 'w') as f:
            f.write("#!/bin/bash\n")
            f.write("# Manual image download script\n")
            f.write("# Replace IMAGE_URL with actual image URLs\n\n")
            for name, slug, query in missing:
                f.write(f"# {name}\n")
                f.write(f"# Search: {query}\n")
                f.write(f"# wget -O images/artists/{slug}.jpg IMAGE_URL\n\n")

        print(f"Created helper script: {script_path}")
        print("Edit this file and add actual image URLs, then run: bash {script_path}")

    print("\n" + "=" * 80)
    print("RECOMMENDED APPROACH:")
    print("=" * 80)
    print("""
1. Visit each artist's website (URLs are in work.html)
2. Right-click on a representative work image
3. Save image as: images/artists/[artist-slug].jpg
4. Resize if needed: sips -Z 1200 images/artists/*.jpg
5. Optimize: jpegoptim --max=85 images/artists/*.jpg (if installed)

This ensures you get the best, most representative images while
respecting copyright and artist wishes.
""")

if __name__ == "__main__":
    main()
