import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language = "fr" } = await req.json();
    console.log("Received chat request:", { language, messageCount: messages?.length });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // System prompts for each language
    const systemPrompts = {
      fr: `Tu es le guide virtuel officiel du Musée des Civilisations Noires à Dakar. 
Quand on te parle d'une œuvre, réponds avec son histoire, sa signification, son origine, et son artiste si possible.
Utilise un ton pédagogique, respectueux, et engageant.
Si tu connais l'œuvre dans ta base, donne des détails historiques précis.`,
      
      en: `You are an expert virtual guide for the Museum of Black Civilizations.
You have extensive knowledge of the collections, African history, and are passionate about African culture.
Respond concisely, educationally, and engagingly.
You can discuss history, artworks, African civilizations, and help visitors.
Use a warm and welcoming tone.`,
      
      wo: `Yaw moy gëm-gëm bu njëkk ci Musée bu Yéenal Ñuul.
Danga xam lu bari ci liggéey yi, nataal bu Afrig, te danga bëgg nataal bu Afrig.
Jaale ci njëkk, jàngal te teg ay sa téere.
Mënnga wax ci nataal, liggéey, yéenal Afrig, te wante jigéen yu dem.
Jëfandikoo téere bu njool te bu ànd ak jàmm.`
    };

    const systemPrompt = systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.fr;

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
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    console.log("AI response received successfully");

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
