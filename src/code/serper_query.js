// ⚙️ CONFIGURATION
const MAX_PAGES = 5; 
// SECURITY: Use environment variable instead of hardcoding
const API_KEY = $env.SERPER_API_KEY; 

const QUERY_JSON = {
  "q": "(\"Data Product Manager\" OR \"Data Product Owner\" OR \"Technical Product Manager\" OR \"Senior Business Analyst\" OR \"Technical Business Analyst\" OR \"Data Strategist\") ( (\"Canada\" \"Remote\") OR \"United States\" ) site:greenhouse.io OR site:lever.co OR site:ashbyhq.com OR site:myworkdayjobs.com OR site:smartrecruiters.com OR site:jobright.ai OR site:wellfound.com OR site:builtin.com OR site:himalayas.app OR site:taleo.net OR site:icims.com OR site:jobvite.com -intitle:Director -intitle:VP -intitle:Principal -intitle:Intern -intitle:Junior -intitle:\"Entry Level\" -intitle:Staff -intitle:Head",
  "num": 20, 
  "tbs": "qdr:d2", // Past 2 days
  "gl": "us", 
  "hl": "en"
};

let allJobs = [];

for (let i = 0; i <= MAX_PAGES; i++) {
  const payload = { ...QUERY_JSON, page: i + 1 };
  
  try {
    const response = await this.helpers.httpRequest({
      method: 'POST',
      url: 'https://google.serper.dev/search',
      headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      json: true
    });

    const pageResults = response.organic || [];
    if (pageResults.length === 0) break;
    allJobs = allJobs.concat(pageResults);
    await new Promise(r => setTimeout(r, 500)); // Rate limit pause

  } catch (error) {
    break; 
  }
}

// DEDUPLICATION
const uniqueJobs = [];
const seenUrls = new Set();
for (const job of allJobs) {
  if (!seenUrls.has(job.link)) {
    seenUrls.add(job.link);
    uniqueJobs.push(job);
  }
}

return [{ json: { organic: uniqueJobs } }];