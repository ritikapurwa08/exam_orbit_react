import { CenterLayout } from "../components/layout/CenterLayout";
import { motion } from "framer-motion";
import { Link, useSearchParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Icons } from "../components/ui/icons";
import { getSubjectById, getQuestions, type Question } from "../data/subjects";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function TestInterface() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const subjectId = searchParams.get("subject") || "rajasthan_geography";
  const topicId = searchParams.get("topic") || "physical_features";

  const subject = getSubjectById(subjectId);
  const topic = subject?.topics.find(t => t.id === topicId);

  const addHistory = useMutation(api.history.addTestHistory);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [marked, setMarked] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    getQuestions(subjectId, topicId).then((data) => {
      setQuestions(data);
      setIsLoading(false);
    });
  }, [subjectId, topicId]);

  const handleFinish = async () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswerIndex) score++;
    });

    try {
      await addHistory({
        subjectId,
        topicId,
        score,
        totalQuestions: questions.length,
        timeSpent,
        userAnswers: questions.map((_, idx) => answers[idx] ?? -1), // Map answers or -1 for unattempted
      });
      navigate(`/topics?subject=${subjectId}`);
    } catch (err) {
      console.error("Failed to submit score", err);
    }
  };

  if (isLoading) {
    return (
      <CenterLayout>
        <div className="flex justify-center items-center py-20">
          <Icons.refreshCcw className="animate-spin size-8 text-primary" />
        </div>
      </CenterLayout>
    );
  }

  if (questions.length === 0) {
    return (
      <CenterLayout>
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Icons.alertCircle className="size-12 text-muted-foreground opacity-50" />
          <h2 className="text-2xl font-bold">No questions available</h2>
          <Link to={`/topics?subject=${subjectId}`} className="text-primary hover:underline font-medium">Go back to topics</Link>
        </div>
      </CenterLayout>
    );
  }

  const currentQ = questions[currentIndex];
  // Convert 0-indexed answers back into A, B, C, D equivalent if needed, but we use index.
  const alphabet = ["A", "B", "C", "D", "E"];

  return (
    <CenterLayout hideNav>
      <div className="w-full flex-1 flex flex-col gap-6 overflow-hidden max-h-[100dvh]">

        {/* Sticky Header / Progress Section specific to Test */}
        <header className="shrink-0 bg-card/80 backdrop-blur-xl border-b border-x rounded-b-2xl px-6 py-4 shadow-sm flex items-center justify-between z-40">
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <span className="hover:text-foreground cursor-pointer transition-colors" onClick={() => navigate(-1)}>{subject?.name || "Subject"}</span>
              <Icons.chevronRight className="size-4" />
              <span className="text-foreground">{topic?.name || "Topic"}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-primary">
              <div className="flex gap-1 bg-muted px-3 py-1.5 rounded-lg font-bold font-mono tracking-wider tabular-nums">
                <span>⏱</span>
              </div>
            </div>
            <button onClick={handleFinish} className="bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground px-4 py-2 rounded-lg text-sm font-bold transition-colors">
              Finish Test
            </button>
          </div>
        </header>

        {/* Thin Progress Bar positioned right under header */}
        <div className="h-1.5 w-full bg-muted overflow-hidden -mt-6 rounded-b-2xl shadow-sm z-30">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full bg-primary"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-4 flex-1 min-h-0 overflow-hidden pb-4">
          {/* Main Question Area (flex-1) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 overflow-y-auto custom-scrollbar pr-2"
          >
            <div className="bg-card/60 backdrop-blur-xl p-8 rounded-2xl border shadow-sm min-h-max">
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted px-2 py-1 rounded">Question {currentIndex + 1} of {questions.length}</span>
                <button
                  onClick={() => {
                    setMarked(prev => prev.includes(currentIndex) ? prev.filter(i => i !== currentIndex) : [...prev, currentIndex]);
                  }}
                  className={`flex items-center gap-2 transition-colors group ${marked.includes(currentIndex) ? 'text-amber-500' : 'text-muted-foreground hover:text-amber-500'}`}
                >
                  <Icons.bookmark className={`size-4 ${marked.includes(currentIndex) ? 'fill-current' : 'group-hover:fill-current'}`} />
                  <span className="text-xs font-bold">{marked.includes(currentIndex) ? 'MARKED' : 'MARK FOR REVIEW'}</span>
                </button>
              </div>

              <div className="prose prose-slate max-w-none mb-8">
                <h2 className="text-xl font-semibold leading-relaxed">
                  {currentQ.text}
                </h2>
              </div>

              {/* Options */}
              <div className="grid gap-3">
                {currentQ.options.map((opt, index) => {
                  const isSelected = answers[currentIndex] === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setAnswers(prev => ({ ...prev, [currentIndex]: index }))}
                      className={`group flex items-center justify-between w-full p-4 rounded-xl border-2 transition-all text-left ${isSelected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-muted hover:border-primary/50 bg-card/40"
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`size-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground border group-hover:bg-primary group-hover:text-primary-foreground"
                          }`}>
                          {alphabet[index]}
                        </span>
                        <span className={`font-medium ${isSelected ? "text-foreground font-semibold" : "text-muted-foreground group-hover:text-foreground"}`}>
                          {opt}
                        </span>
                      </div>
                      <span className="hidden sm:inline-block text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded border">
                        [{index + 1}]
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-muted/50">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 text-muted-foreground font-bold px-4 py-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
                >
                  <Icons.arrowLeft className="size-4" />
                  Previous
                </button>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      const newA = { ...answers };
                      delete newA[currentIndex];
                      setAnswers(newA);
                    }}
                    className="text-muted-foreground font-bold px-4 py-2 hover:text-foreground transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => {
                      if (currentIndex < questions.length - 1) {
                        setCurrentIndex(prev => prev + 1);
                      } else {
                        handleFinish();
                      }
                    }}
                    className="bg-primary text-primary-foreground px-8 py-2.5 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 transform"
                  >
                    {currentIndex === questions.length - 1 ? "Submit" : "Next"}
                    {currentIndex < questions.length - 1 && <Icons.arrowRight className="size-4" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side / Navigation Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-72 shrink-0 flex flex-col gap-6 overflow-y-auto custom-scrollbar"
          >
            <div className="bg-card/60 backdrop-blur-xl p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-sm mb-6 flex items-center justify-between">
                Overview
                <span className="text-[10px] bg-muted px-2 py-0.5 rounded uppercase text-muted-foreground">{questions.length} Total</span>
              </h3>

              <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {questions.map((_, i) => {
                  const num = i + 1;
                  const formattedNum = num.toString().padStart(2, '0');

                  let stateClass = "border border-muted text-muted-foreground hover:border-primary/50";
                  let indicator = null;

                  if (currentIndex === i) {
                    stateClass = "bg-primary/10 ring-2 ring-primary border-transparent text-primary";
                  } else if (answers[i] !== undefined) {
                    stateClass = "bg-primary text-primary-foreground border-primary";
                  }

                  if (marked.includes(i)) {
                    indicator = <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-amber-500 rounded-full shadow-sm"></span>;
                  }

                  return (
                    <button
                      key={num}
                      onClick={() => setCurrentIndex(i)}
                      className={`relative aspect-square flex items-center justify-center rounded-lg text-xs font-bold transition-all hover:scale-105 ${stateClass}`}
                    >
                      {formattedNum}
                      {indicator}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-muted/50 space-y-3">
                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                  <div className="size-3 bg-primary rounded-sm"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                  <div className="size-3 border border-muted rounded-sm"></div>
                  <span>Unvisited</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                  <div className="size-3 border border-muted rounded-sm relative">
                    <span className="absolute top-[-2px] right-[-2px] w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  </div>
                  <span>Marked for Review</span>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/10 text-foreground p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-xs uppercase tracking-widest mb-3 text-primary opacity-80 flex items-center gap-2">
                <Icons.lightbulb className="size-4" />
                Pro Tip
              </h4>
              <p className="text-sm leading-relaxed font-medium">Use number keys <span className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono font-bold">1-5</span> to quickly select options and <span className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono font-bold">Enter</span> for next.</p>
            </div>
          </motion.aside>

        </div>
      </div>
    </CenterLayout>
  );
}

