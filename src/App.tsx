import { useState } from "react";
import { Languages, Loader2, RotateCcw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Label } from "./components/ui/label";

const languages = ["French", "Spanish", "Japanese"];

function App() {
  const [text, settext] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [language, setlanguage] = useState("");
  const [translatedText, settranslatedText] = useState<string | null>("");
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setisLoading(true);

    try {
      const url = "https://openai-api-worker.marianosagua4343.workers.dev";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, language }),
      });

      if (!response.ok) {
        throw new Error("Worker error: " + response.statusText);
      }

      const data = await response.text();
      settranslatedText(data);
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  const handleStartOver = () => {
    settext("");
    setlanguage("");
    settranslatedText("");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black to-blue-950 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-black/40 backdrop-blur-xl border-blue-900/30">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2 text-white">
            <Languages className="w-8 h-8" />
            AI Translator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={translatedText ? "result" : "input"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <Label className="text-lg text-blue-100">
                    {!translatedText ? "Text to translate:" : "Original text:"}
                  </Label>
                  <Textarea
                    value={text}
                    onChange={(e) => settext(e.target.value)}
                    rows={4}
                    className="resize-none bg-blue-950/30 border-blue-900/50 text-white placeholder:text-blue-300/50 focus-visible:ring-blue-500"
                    placeholder="Enter your text here..."
                  />
                </div>

                {translatedText == "" ? (
                  <motion.div
                    className="space-y-6 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="space-y-2">
                      <Label className="text-lg text-blue-100">
                        Select language:
                      </Label>
                      <RadioGroup
                        value={language}
                        onValueChange={setlanguage}
                        className="flex flex-wrap gap-4"
                      >
                        {languages.map((lang) => (
                          <div
                            key={lang}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={lang}
                              id={lang}
                              className="border-blue-500 text-blue-500"
                            />
                            <Label
                              htmlFor={lang}
                              className="text-white hover:text-blue-300 transition-colors cursor-pointer"
                            >
                              {lang}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <Button
                      type="submit"
                      disabled={!text || !language || isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Translating...
                        </>
                      ) : (
                        "Translate"
                      )}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    className="space-y-6 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="space-y-2">
                      <Label className="text-lg text-blue-100">
                        Translated text:
                      </Label>
                      <div className="p-4 rounded-lg bg-blue-950/30 border border-blue-900/50 text-white min-h-[100px]">
                        {translatedText}
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={handleStartOver}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Start Over
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
