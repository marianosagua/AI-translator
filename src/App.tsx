import { useState } from "react";
import OpenAi from "openai";

const openai = new OpenAi({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const languages = ["French", "Spanish", "Japanese"];

function App() {
  const [text, settext] = useState("");
  const [language, setlanguage] = useState("");
  const [translatedText, settranslatedText] = useState<string | null>("");

  const messages = [
    {
      role: "system" as const,
      content: `I want you to be a translator. Translate the text between ### to ${language}.`,
    },
    {
      role: "user" as const,
      content: `
        ###${text}###
      `,
    },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const completitions = await openai.chat.completions.create({
        model: "gpt-4",
        messages,
        temperature: 0,
      });
      settranslatedText(completitions.choices[0].message.content);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartOver = () => {
    settext("");
    setlanguage("");
    settranslatedText("");
  };

  return (
    <form
      onSubmit={translatedText != "" ? undefined : handleSubmit}
      className="app"
    >
      <h1>Translator AI</h1>
      <p>{!translatedText ? "Translate text:" : "Original Text:"}</p>
      <textarea
        onChange={(e) => settext(e.target.value)}
        value={text}
        rows={4}
      />

      {translatedText == "" ? (
        <div className="app__controls">
          <p>Select language:</p>
          <div className="app__controls--languages">
            {languages.map((language) => (
              <label key={language}>
                <input type="checkbox" onChange={() => setlanguage(language)} />
                {language}
              </label>
            ))}
          </div>
          <button type="submit">Translate</button>
        </div>
      ) : (
        <div className="app__output">
          <p>Translated text:</p>
          <p>{translatedText}</p>
          <button type="button" onClick={handleStartOver}>
            Start Over
          </button>
        </div>
      )}
    </form>
  );
}

export default App;
