#!/bin/bash
# Simple version - opens all artist searches in browser
# Opens in batches to avoid overwhelming the browser

echo "======================================================================"
echo "OPENING ARTIST IMAGE SEARCHES"
echo "======================================================================"
echo ""
echo "This will open image searches in batches of 10."
echo "Press ENTER after each batch to continue, or Ctrl+C to stop."
echo ""
read -p "Press ENTER to start..."

# Array of URLs with artist names
declare -a searches=(
    "Nam June Paik|https://duckduckgo.com/?q=Nam+June+Paik+video+art&iax=images&ia=images"
    "Vera Molnár|https://duckduckgo.com/?q=Vera+Molnar+computational+art&iax=images&ia=images"
    "Harold Cohen / AARON|https://duckduckgo.com/?q=Harold+Cohen+AARON+artwork&iax=images&ia=images"
    "Trevor Paglen|https://duckduckgo.com/?q=Trevor+Paglen+artwork&iax=images&ia=images"
    "Sam Lavigne|https://duckduckgo.com/?q=Sam+Lavigne+art+project&iax=images&ia=images"
    "Tega Brain|https://duckduckgo.com/?q=Tega+Brain+artwork&iax=images&ia=images"
    "Zach Lieberman|https://duckduckgo.com/?q=Zach+Lieberman+creative+coding&iax=images&ia=images"
    "American Artist|https://duckduckgo.com/?q=American+Artist+artwork&iax=images&ia=images"
    "teamLab|https://duckduckgo.com/?q=teamLab+installation&iax=images&ia=images"
    "Eric Hu|https://duckduckgo.com/?q=Eric+Hu+typography+design&iax=images&ia=images"
    "Certain Measures|https://duckduckgo.com/?q=Certain+Measures+architecture&iax=images&ia=images"
    "JODI|https://duckduckgo.com/?q=JODI+net+art&iax=images&ia=images"
    "Casey Reas|https://duckduckgo.com/?q=Casey+Reas+processing+artwork&iax=images&ia=images"
    "Ian Cheng|https://duckduckgo.com/?q=Ian+Cheng+artwork&iax=images&ia=images"
    "Holly Herndon & Mat Dryhurst|https://duckduckgo.com/?q=Holly+Herndon+Mat+Dryhurst&iax=images&ia=images"
    "Aranda\\Lasch|https://duckduckgo.com/?q=Aranda+Lasch+architecture&iax=images&ia=images"
    "Jenny Sabin Studio|https://duckduckgo.com/?q=Jenny+Sabin+architecture&iax=images&ia=images"
    "Neri Oxman|https://duckduckgo.com/?q=Neri+Oxman+design&iax=images&ia=images"
    "Manfred Mohr|https://duckduckgo.com/?q=Manfred+Mohr+algorithmic+art&iax=images&ia=images"
    "John Maeda|https://duckduckgo.com/?q=John+Maeda+design&iax=images&ia=images"
    "Muriel Cooper|https://duckduckgo.com/?q=Muriel+Cooper+MIT+Media+Lab+design&iax=images&ia=images"
    "Golan Levin|https://duckduckgo.com/?q=Golan+Levin+interactive+art&iax=images&ia=images"
    "Lauren Lee McCarthy|https://duckduckgo.com/?q=Lauren+Lee+McCarthy+artwork&iax=images&ia=images"
    "Hito Steyerl|https://duckduckgo.com/?q=Hito+Steyerl+video+art&iax=images&ia=images"
    "Pierre Huyghe|https://duckduckgo.com/?q=Pierre+Huyghe+installation&iax=images&ia=images"
    "Cory Arcangel|https://duckduckgo.com/?q=Cory+Arcangel+artwork&iax=images&ia=images"
    "Cao Fei|https://duckduckgo.com/?q=Cao+Fei+artwork&iax=images&ia=images"
    "Lu Yang|https://duckduckgo.com/?q=Lu+Yang+artwork&iax=images&ia=images"
    "Rachel Rossin|https://duckduckgo.com/?q=Rachel+Rossin+VR+art&iax=images&ia=images"
    "Ryoji Ikeda|https://duckduckgo.com/?q=Ryoji+Ikeda+installation&iax=images&ia=images"
    "Rafaël Rozendaal|https://duckduckgo.com/?q=Rafael+Rozendaal+website+art&iax=images&ia=images"
    "Auriea Harvey|https://duckduckgo.com/?q=Auriea+Harvey+artwork&iax=images&ia=images"
    "Sougwen Chung|https://duckduckgo.com/?q=Sougwen+Chung+drawing+robot&iax=images&ia=images"
    "Refik Anadol|https://duckduckgo.com/?q=Refik+Anadol+data+sculpture&iax=images&ia=images"
    "Mario Klingemann|https://duckduckgo.com/?q=Mario+Klingemann+AI+art&iax=images&ia=images"
    "Stephanie Dinkins|https://duckduckgo.com/?q=Stephanie+Dinkins+AI+artwork&iax=images&ia=images"
    "Anna Ridler|https://duckduckgo.com/?q=Anna+Ridler+AI+art&iax=images&ia=images"
    "Rafael Lozano-Hemmer|https://duckduckgo.com/?q=Rafael+Lozano-Hemmer+installation&iax=images&ia=images"
    "Random International|https://duckduckgo.com/?q=Random+International+Rain+Room&iax=images&ia=images"
    "Jennifer Steinkamp|https://duckduckgo.com/?q=Jennifer+Steinkamp+projection&iax=images&ia=images"
    "Jim Campbell|https://duckduckgo.com/?q=Jim+Campbell+LED+sculpture&iax=images&ia=images"
    "Maya Man|https://duckduckgo.com/?q=Maya+Man+generative+art&iax=images&ia=images"
    "Roopa Vasudevan|https://duckduckgo.com/?q=Roopa+Vasudevan+artwork&iax=images&ia=images"
    "Mimi Ọnụọha|https://duckduckgo.com/?q=Mimi+Onuoha+data+art&iax=images&ia=images"
    "Morehshin Allahyari|https://duckduckgo.com/?q=Morehshin+Allahyari+3D+printing&iax=images&ia=images"
    "Ben Fry|https://duckduckgo.com/?q=Ben+Fry+data+visualization&iax=images&ia=images"
    "Richard The|https://duckduckgo.com/?q=Richard+The+typography&iax=images&ia=images"
    "Jer Thorp|https://duckduckgo.com/?q=Jer+Thorp+data+visualization&iax=images&ia=images"
    "Laurel Schwulst|https://duckduckgo.com/?q=Laurel+Schwulst+web+design&iax=images&ia=images"
    "Metahaven|https://duckduckgo.com/?q=Metahaven+design+studio&iax=images&ia=images"
    "Mindy Seu|https://duckduckgo.com/?q=Mindy+Seu+Cyberfeminism+Index&iax=images&ia=images"
    "John Provencher|https://duckduckgo.com/?q=John+Provencher+design&iax=images&ia=images"
    "Bret Victor|https://duckduckgo.com/?q=Bret+Victor+interface+design&iax=images&ia=images"
    "Tristan Perich|https://duckduckgo.com/?q=Tristan+Perich+sound+art+1-bit&iax=images&ia=images"
    "Mendi + Keith Obadike|https://duckduckgo.com/?q=Mendi+Keith+Obadike+sound+art&iax=images&ia=images"
)

total=${#searches[@]}
batch_size=10
counter=0

echo ""
echo "Total artists: $total"
echo "Opening in batches of $batch_size"
echo ""

for item in "${searches[@]}"; do
    # Split on pipe
    name="${item%%|*}"
    url="${item#*|}"

    counter=$((counter + 1))

    echo "[$counter/$total] Opening: $name"
    /usr/bin/open "$url"
    sleep 0.5

    # Pause after each batch
    if [ $((counter % batch_size)) -eq 0 ] && [ $counter -lt $total ]; then
        echo ""
        echo "--- Opened $counter/$total searches ---"
        echo "Save images as: images/artists/[artist-slug].jpg"
        echo ""
        read -p "Press ENTER for next batch (Ctrl+C to stop)..."
        echo ""
    fi
done

echo ""
echo "======================================================================"
echo "Done! Opened $total image searches."
echo ""
echo "For each tab:"
echo "  1. Find a good representative work image"
echo "  2. Right-click -> Save Image As..."
echo "  3. Save to: images/artists/[filename].jpg"
echo ""
echo "Run './download_artist_images.sh' to see exact filenames needed."
echo "======================================================================"
