import { useCallback, useState } from "react";
import BoothamVideoScreen from "./components/BoothamVideoScreen";
import CheckingScreen from "./components/CheckingScreen";
import EntranceScreen from "./components/EntranceScreen";
import KidFormScreen from "./components/KidFormScreen";
import ResultPosterScreen from "./components/ResultPosterScreen";
import VisitorCounter from "./components/VisitorCounter";
import "./styles.css";

export type KidDetails = {
  name: string;
  age: string;
  className: string;
};

const emptyKid: KidDetails = { name: "", age: "", className: "" };

export default function App() {
  const [step, setStep] = useState(0);
  const [kid, setKid] = useState<KidDetails>(emptyKid);
  const next = useCallback(() => setStep((current) => current + 1), []);

  const restart = () => {
    setKid(emptyKid);
    setStep(2);
  };

  return (
    <main className="app-shell">
      <VisitorCounter />
      {step === 0 && <EntranceScreen onNext={next} />}
      {step === 1 && <BoothamVideoScreen onNext={next} />}
      {step === 2 && <KidFormScreen kid={kid} setKid={setKid} onSubmit={next} />}
      {step === 3 && <CheckingScreen onComplete={next} />}
      {step === 4 && <ResultPosterScreen kid={kid} onRestart={restart} />}
    </main>
  );
}
