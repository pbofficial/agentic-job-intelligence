const raw = $json.output || "";
if (!raw) return { json: { error: "No output from AI", category: "Mismatch" } };

const cleaned = raw.replace(/```json/g, "").replace(/```/g, "").trim();

try {
  return { json: JSON.parse(cleaned) };
} catch (e) {
  return { 
    json: { 
      error: "JSON Parse Failed", 
      rawText: raw, 
      category: "Mismatch", 
      match_score: 0 
    } 
  };
}