import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  const [lang, setLang] = useState("fr");

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentLang={lang} onLanguageChange={setLang} />
      <Hero lang={lang} />
    </div>
  );
}
