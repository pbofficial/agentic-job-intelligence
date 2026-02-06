const results = $input.first().json.organic;
if (!results || results.length === 0) return [];

return results.map(item => {
  let company = "Unknown";
  let platform = "Other"; 
  let location = "Unknown";

  const urlString = item.link || ""; 
  const rawTitle = item.title || "";
  const snippet = item.snippet || "";

  // [Logic to extract Company/Platform/Location from URL strings]
  // ... (Paste the rest of the parsing logic from your node here)
  
  return {
    title: rawTitle.split(" at ")[0].split(" - ")[0].trim(),
    company: company,
    platform: platform,
    location: location,
    url: urlString,
    snippet: snippet,
    date_posted_text: item.date || "Unknown", 
    date_found: new Date().toISOString().split('T')[0]
  };
});