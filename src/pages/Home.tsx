import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  const [lang, setLang] = useState("fr");

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentLang={lang} onLanguageChange={setLang} />
      <Hero lang={lang} />
      <Chatbot lang={lang} />
    </div>
  );
}
