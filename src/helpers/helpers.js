//gibt die ersten 50 Wöter eines Strings wieder
export function ContentSnippet(content, count){
    return content.split(/\s+/).slice(0, count).join(" ")+"...";
}

export function SplitToListing (content){
  var answer = content.replace(/;/g , "\n");      //alle Semikolons im übermittelten String werden druch Newlines ersetzt
  return answer;
}
