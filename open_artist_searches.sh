#!/bin/bash
# Open all artist image searches in browser tabs
# This will open 63 tabs - you may want to do this in batches!

echo "================================================================================"
echo "ARTIST IMAGE SEARCH - BROWSER LAUNCHER"
echo "================================================================================"
echo ""
echo "This script will open DuckDuckGo image searches for all 63 artists."
echo ""
echo "Options:"
echo "  1. Open all 63 at once (will create 63 browser tabs)"
echo "  2. Open in batches of 10"
echo "  3. Open in batches of 20"
echo "  4. Cancel"
echo ""
read -p "Choose option (1-4): " choice

# Array of search URLs
urls=(
    "https://duckduckgo.com/?q=Vera+Molnar+computational+art&iax=images&ia=images"
    "https://duckduckgo.com/?q=Harold+Cohen+AARON+artwork&iax=images&ia=images"
    "https://duckduckgo.com/?q=Trevor+Paglen+artwork&iax=images&ia=images"
    "https://duckduckgo.com/?q=Sam+Lavigne+art+project&iax=images&ia=images"
    "https://duckduckgo.com/?q=Tega+Brain+artwork&iax=images&ia=images"
    "https://duckduckgo.com/?q=Zach+Lieberman+creative+coding&iax=images&ia=images"
    "https://duckduckgo.com/?q=American+Artist+artwork&iax=images&ia=images"
    "https://duckduckgo.com/?q=teamLab+installation&iax=images&ia=images"
    "https://duckduckgo.com/?q=Eric+Hu+typography+design&iax=images&ia=images"
    "https://duckduckgo.com/?q=Certain+Measures+architecture&iax=images&ia=images"
    "https://duckduckgo.com/?q=JODI+net+art&iax=images&ia=images"
    "https://duckduckgo.com/?q=Casey+Reas+processing+artwork&iax=images&ia=images"
    "https://duckduckgo.com/?q=Ian+Cheng+artwork&iax=images&ia=images"
    "https://duckduckgo.com/?q=Holly+Herndon+Mat+Dryhurst&iax=images&ia=images"
    "https://duckduckgo.com/?q=Aranda+Lasch+architecture&iax=images&ia=images"
    "https://duckduckgo.com/?q=Jenny+Sabin+architecture&iax=images&ia=images"
    "https://duckduckgo.com/?q=Neri+Oxman+design&iax=images&ia=images"
    "https://duckduckgo.com/?q=Matter+Design+architecture&iax=images&ia=images"
    "https://duckduckgo.com/?q=Nervous+System+jewelry+design&iax=images&ia=images"
    "https://duckduckgo.com/?q=Manfred+Mohr+algorithmic+art&iax=images&ia=images"
    "https://duckduckgo.com/?q=John+Maeda+design&iax=images&ia=images"
    "https://duckduckgo.com/?q=Muriel+Cooper+MIT+Media+Lab+design&iax=images&ia=images"
    "https://duckduckgo.com/?q=Golan+Levin+interactive+art&iax=images&ia=images"
    "https://duckduckgo.com/?q=Lauren+Lee+McCarthy+artwork&iax=images&ia=images"
    "https://duckduckgo.com/?q=Hito+Steyerl+video+art&iax=images&ia=images"
    "https://duckduckgo.com/?q=Pierre+Huyghe+installation&iax=images&ia=images"
    "https://duckduckgo.com/?q=Cory+Arcangel+artwork&iax=images&ia=images"
    "https://duckduckgo.com/?q=Cao+Fei+artwork&iax=images&ia=images"
    "https://duckduckgo.com/?q=Lu+Yang+artwork&iax=images&ia=images"
    "https://duckduckgo.com/?q=Rachel+Rossin+VR+art&iax=images&ia=images"
    "https://duckduckgo.com/?q=Ryoji+Ikeda+installation&iax=images&ia=images"
    "https://duckduckgo.com/?q=Ubermorgen+net+art&iax=images&ia=images"
    "https://duckduckgo.com/?q=Rafael+Rozendaal+website+art&iax=images&ia=images"
    "https://duckduckgo.com/?q=Auriea+Harvey+artwork&iax=images&ia=images"
    "https://duckduckgo.com/?q=Sougwen+Chung+drawing+robot&iax=images&ia=images"
    "https://duckduckgo.com/?q=Refik+Anadol+data+sculpture&iax=images&ia=images"
    "https://duckduckgo.com/?q=Mario+Klingemann+AI+art&iax=images&ia=images"
    "https://duckduckgo.com/?q=Stephanie+Dinkins+AI+artwork&iax=images&ia=images"
    "https://duckduckgo.com/?q=Anna+Ridler+AI+art&iax=images&ia=images"
    "https://duckduckgo.com/?q=Rafael+Lozano-Hemmer+installation&iax=images&ia=images"
    "https://duckduckgo.com/?q=Random+International+Rain+Room&iax=images&ia=images"
    "https://duckduckgo.com/?q=Jennifer+Steinkamp+projection&iax=images&ia=images"
    "https://duckduckgo.com/?q=Jim+Campbell+LED+sculpture&iax=images&ia=images"
    "https://duckduckgo.com/?q=Maya+Man+generative+art&iax=images&ia=images"
    "https://duckduckgo.com/?q=Surya+Mattu+data+journalism&iax=images&ia=images"
    "https://duckduckgo.com/?q=Roopa+Vasudevan+artwork&iax=images&ia=images"
    "https://duckduckgo.com/?q=Mimi+Onuoha+data+art&iax=images&ia=images"
    "https://duckduckgo.com/?q=Morehshin+Allahyari+3D+printing&iax=images&ia=images"
    "https://duckduckgo.com/?q=Ben+Fry+data+visualization&iax=images&ia=images"
    "https://duckduckgo.com/?q=Richard+The+typography&iax=images&ia=images"
    "https://duckduckgo.com/?q=Laura+Coombs+design&iax=images&ia=images"
    "https://duckduckgo.com/?q=Luna+Maurer+Conditional+Design&iax=images&ia=images"
    "https://duckduckgo.com/?q=Rune+Madsen+computational+design&iax=images&ia=images"
    "https://duckduckgo.com/?q=Giorgia+Lupi+data+humanization&iax=images&ia=images"
    "https://duckduckgo.com/?q=Jer+Thorp+data+visualization&iax=images&ia=images"
    "https://duckduckgo.com/?q=Laurel+Schwulst+web+design&iax=images&ia=images"
    "https://duckduckgo.com/?q=Metahaven+design+studio&iax=images&ia=images"
    "https://duckduckgo.com/?q=David+Reinfurt+O-R-G+design&iax=images&ia=images"
    "https://duckduckgo.com/?q=Mindy+Seu+Cyberfeminism+Index&iax=images&ia=images"
    "https://duckduckgo.com/?q=John+Provencher+design&iax=images&ia=images"
    "https://duckduckgo.com/?q=Bret+Victor+interface+design&iax=images&ia=images"
    "https://duckduckgo.com/?q=Tristan+Perich+sound+art+1-bit&iax=images&ia=images"
    "https://duckduckgo.com/?q=Mendi+Keith+Obadike+sound+art&iax=images&ia=images"
)

total=${#urls[@]}

open_batch() {
    local start=$1
    local end=$2
    local count=0

    for i in $(seq $start $end); do
        if [ $i -lt $total ]; then
            echo "Opening artist $(($i + 1))/$total..."
            open "${urls[$i]}"
            count=$((count + 1))
            # Small delay to avoid overwhelming the browser
            sleep 0.3
        fi
    done

    echo ""
    echo "Opened $count tabs."
}

case $choice in
    1)
        echo ""
        echo "Opening all 63 searches..."
        echo "WARNING: This will create 63 browser tabs!"
        echo ""
        read -p "Press ENTER to continue or Ctrl+C to cancel..."
        open_batch 0 $((total - 1))
        ;;
    2)
        batch_size=10
        total_batches=$(( (total + batch_size - 1) / batch_size ))

        for batch in $(seq 0 $((total_batches - 1))); do
            start=$((batch * batch_size))
            end=$((start + batch_size - 1))

            echo ""
            echo "=== Batch $(($batch + 1)) of $total_batches ==="
            echo "Opening artists $(($start + 1)) to $(($end + 1 < total ? $end + 1 : total))..."
            echo ""
            read -p "Press ENTER to open next batch (or Ctrl+C to stop)..."

            open_batch $start $end
        done
        ;;
    3)
        batch_size=20
        total_batches=$(( (total + batch_size - 1) / batch_size ))

        for batch in $(seq 0 $((total_batches - 1))); do
            start=$((batch * batch_size))
            end=$((start + batch_size - 1))

            echo ""
            echo "=== Batch $(($batch + 1)) of $total_batches ==="
            echo "Opening artists $(($start + 1)) to $(($end + 1 < total ? $end + 1 : total))..."
            echo ""
            read -p "Press ENTER to open next batch (or Ctrl+C to stop)..."

            open_batch $start $end
        done
        ;;
    4)
        echo "Cancelled."
        exit 0
        ;;
    *)
        echo "Invalid choice."
        exit 1
        ;;
esac

echo ""
echo "================================================================================"
echo "Done! For each artist:"
echo "  1. Find a representative work image"
echo "  2. Right-click → Save As → images/artists/[artist-slug].jpg"
echo "  3. Move to next tab"
echo ""
echo "Artist filenames are listed in: download_artist_images.sh"
echo "================================================================================"
