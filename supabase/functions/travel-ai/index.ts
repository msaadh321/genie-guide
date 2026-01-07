import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, query, message } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log(`Processing ${type} request:`, query || message);

    let systemPrompt = "";
    let userPrompt = "";

    if (type === "search") {
      systemPrompt = `You are a knowledgeable travel assistant specializing in tourism recommendations. 
When given a location, provide detailed recommendations for tourist spots and food places.

IMPORTANT: You must respond with valid JSON in exactly this format:
{
  "spots": [
    {
      "name": "Place Name",
      "description": "A detailed 2-3 sentence description of the place",
      "bestTime": "Best time to visit (e.g., 'Morning, Spring')",
      "rating": 4.5
    }
  ],
  "food": [
    {
      "name": "Restaurant/Food Place Name",
      "description": "A detailed 2-3 sentence description",
      "specialty": "Their signature dish or specialty",
      "type": "Restaurant type (e.g., Traditional, Fine Dining, Street Food, Cafe)"
    }
  ]
}

Provide 3-4 tourist spots and 3-4 food places. Make recommendations specific to the actual location mentioned.
Use real place names and authentic local recommendations when possible.
Ratings should be between 4.0 and 5.0.`;

      userPrompt = `Recommend tourist spots and food places in: ${query}`;
    } else if (type === "chat") {
      systemPrompt = `You are WanderAI, a friendly and knowledgeable travel assistant. 
You help travelers discover amazing destinations, hidden gems, local food, and travel tips.

Your personality:
- Enthusiastic about travel and exploration
- Knowledgeable about culture, history, and local customs
- Practical with tips and recommendations
- Use emojis sparingly to make responses engaging (🌍 🏔️ 🍜 ✨)

Format your responses with:
- Clear sections using **bold headers**
- Bullet points for lists
- Practical tips and pro tips
- Keep responses informative but concise (under 300 words)`;

      userPrompt = message;
    } else {
      throw new Error('Invalid request type. Use "search" or "chat".');
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    console.log("AI response received successfully");

    if (type === "search") {
      // Parse the JSON response for search queries
      try {
        // Extract JSON from the response (handle markdown code blocks)
        let jsonStr = content;
        const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          jsonStr = jsonMatch[1];
        }
        
        const parsed = JSON.parse(jsonStr);
        return new Response(JSON.stringify(parsed), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (parseError) {
        console.error("Failed to parse AI response as JSON:", parseError);
        // Return a fallback response
        return new Response(JSON.stringify({
          spots: [],
          food: [],
          rawResponse: content
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    } else {
      // Return raw text for chat
      return new Response(JSON.stringify({ response: content }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

  } catch (error) {
    console.error("Error in travel-ai function:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
