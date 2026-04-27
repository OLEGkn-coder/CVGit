import React, { useState, useEffect, useRef } from 'react';

export default function AIInterviewSimulator() {
  const [stage, setStage] = useState('setup');
  const [interviewType, setInterviewType] = useState('');
  const [level, setLevel] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [questionHistory, setQuestionHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const answerRef = useRef(null);

  const interviewTypes = [
    { id: 'frontend', label: 'Frontend Developer', icon: '🎨' },
    { id: 'backend', label: 'Backend Developer', icon: '⚙️' },
    { id: 'fullstack', label: 'Full Stack Developer', icon: '🔧' },
    { id: 'data', label: 'Data Scientist', icon: '📊' },
    { id: 'devops', label: 'DevOps Engineer', icon: '🚀' },
    { id: 'ml', label: 'ML Engineer', icon: '🤖' }
  ];

  const levels = [
    { id: 'junior', label: 'Junior', color: 'green' },
    { id: 'mid', label: 'Middle', color: 'blue' },
    { id: 'senior', label: 'Senior', color: 'purple' }
  ];

  const startInterview = async () => {
    if (!interviewType || !level) return;
    
    setStage('interview');
    setQuestionCount(1);
    await generateQuestion(true);
  };

  const generateQuestion = async (isFirst = false) => {
    setIsLoading(true);
    setCurrentQuestion('');
    setFeedback('');

    const context = isFirst 
      ? `Generate a technical interview question for a ${level} ${interviewType} position. Make it challenging but appropriate for the level.`
      : `Based on the previous answers, generate the next technical interview question for a ${level} ${interviewType} position. Question ${questionCount + 1} of the interview.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            ...questionHistory.flatMap(h => [
              { role: "user", content: `Question: ${h.question}` },
              { role: "assistant", content: `Answer: ${h.answer}` }
            ]),
            { 
              role: "user", 
              content: context + " Format: Just provide the question directly, no preamble. Keep it concise and specific." 
            }
          ],
        })
      });

      const data = await response.json();
      const question = data.content[0]?.text || "Could not generate question";
      setCurrentQuestion(question);
    } catch (error) {
      setCurrentQuestion("Error generating question. Please try again.");
    }
    
    setIsLoading(false);
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return;

    setIsLoading(true);
    setFeedback('');

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            { 
              role: "user", 
              content: `You are a technical interviewer. Evaluate this answer to the interview question.

Question: ${currentQuestion}

Candidate's Answer: ${userAnswer}

Provide constructive feedback: what was good, what could be improved, and a score out of 10. Be encouraging but honest. Keep feedback concise (3-4 sentences max).` 
            }
          ],
        })
      });

      const data = await response.json();
      const feedbackText = data.content[0]?.text || "Could not generate feedback";
      setFeedback(feedbackText);

      setQuestionHistory([...questionHistory, {
        question: currentQuestion,
        answer: userAnswer,
        feedback: feedbackText
      }]);

      setUserAnswer('');
      setQuestionCount(prev => prev + 1);
    } catch (error) {
      setFeedback("Error getting feedback. Please try again.");
    }

    setIsLoading(false);
  };

  const nextQuestion = async () => {
    setFeedback('');
    setUserAnswer('');
    await generateQuestion(false);
  };

  const endInterview = () => {
    setStage('results');
  };

  const restart = () => {
    setStage('setup');
    setInterviewType('');
    setLevel('');
    setCurrentQuestion('');
    setUserAnswer('');
    setFeedback('');
    setQuestionHistory([]);
    setQuestionCount(0);
  };

  useEffect(() => {
    if (stage === 'interview' && feedback && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [feedback, stage]);

  if (stage === 'setup') {
    return (
      <div style={{ padding: '2rem 0' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '500', marginBottom: '0.5rem' }}>AI Interview Simulator</h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>
            Practice technical interviews with AI-generated questions and instant feedback
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '0.75rem' }}>
            Choose interview type
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
            {interviewTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setInterviewType(type.id)}
                style={{
                  padding: '12px',
                  background: interviewType === type.id ? 'var(--color-background-info)' : 'var(--color-background-secondary)',
                  border: interviewType === type.id ? '0.5px solid var(--color-border-info)' : '0.5px solid var(--color-border-tertiary)',
                  borderRadius: 'var(--border-radius-md)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: '400',
                  color: interviewType === type.id ? 'var(--color-text-info)' : 'var(--color-text-primary)',
                  transition: 'all 0.15s'
                }}
              >
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{type.icon}</div>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '0.75rem' }}>
            Select experience level
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {levels.map(lvl => (
              <button
                key={lvl.id}
                onClick={() => setLevel(lvl.id)}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  background: level === lvl.id ? `var(--color-background-${lvl.color})` : 'transparent',
                  border: level === lvl.id ? `0.5px solid var(--color-border-${lvl.color})` : '0.5px solid var(--color-border-secondary)',
                  borderRadius: 'var(--border-radius-md)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: level === lvl.id ? `var(--color-text-${lvl.color})` : 'var(--color-text-primary)',
                  transition: 'all 0.15s'
                }}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={startInterview}
          disabled={!interviewType || !level}
          style={{
            width: '100%',
            padding: '12px',
            background: interviewType && level ? 'var(--color-background-info)' : 'var(--color-background-secondary)',
            border: '0.5px solid var(--color-border-secondary)',
            borderRadius: 'var(--border-radius-md)',
            cursor: interviewType && level ? 'pointer' : 'not-allowed',
            fontSize: '14px',
            fontWeight: '500',
            color: interviewType && level ? 'var(--color-text-info)' : 'var(--color-text-secondary)',
            opacity: interviewType && level ? 1 : 0.6
          }}
        >
          Start interview
        </button>
      </div>
    );
  }

  if (stage === 'interview') {
    return (
      <div style={{ padding: '2rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
              {interviewTypes.find(t => t.id === interviewType)?.label} · {levels.find(l => l.id === level)?.label}
            </div>
            <div style={{ fontSize: '18px', fontWeight: '500' }}>
              Question {questionCount}
            </div>
          </div>
          <button
            onClick={endInterview}
            style={{
              padding: '6px 12px',
              background: 'transparent',
              border: '0.5px solid var(--color-border-secondary)',
              borderRadius: 'var(--border-radius-md)',
              cursor: 'pointer',
              fontSize: '13px',
              color: 'var(--color-text-secondary)'
            }}
          >
            End interview
          </button>
        </div>

        <div style={{ 
          background: 'var(--color-background-secondary)', 
          borderRadius: 'var(--border-radius-lg)',
          padding: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          {isLoading && !currentQuestion ? (
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
              Generating question...
            </div>
          ) : (
            <div style={{ fontSize: '15px', lineHeight: '1.6' }}>
              {currentQuestion}
            </div>
          )}
        </div>

        {currentQuestion && !feedback && (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '0.5rem' }}>
              Your answer
            </label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={6}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                lineHeight: '1.6',
                borderRadius: 'var(--border-radius-md)',
                border: '0.5px solid var(--color-border-tertiary)',
                background: 'var(--color-background-primary)',
                color: 'var(--color-text-primary)',
                resize: 'vertical',
                fontFamily: 'var(--font-sans)'
              }}
            />
            <button
              onClick={submitAnswer}
              disabled={!userAnswer.trim() || isLoading}
              style={{
                marginTop: '0.75rem',
                padding: '10px 20px',
                background: userAnswer.trim() ? 'var(--color-background-info)' : 'var(--color-background-secondary)',
                border: '0.5px solid var(--color-border-secondary)',
                borderRadius: 'var(--border-radius-md)',
                cursor: userAnswer.trim() && !isLoading ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                fontWeight: '500',
                color: userAnswer.trim() ? 'var(--color-text-info)' : 'var(--color-text-secondary)',
                opacity: userAnswer.trim() && !isLoading ? 1 : 0.6
              }}
            >
              {isLoading ? 'Evaluating...' : 'Submit answer'}
            </button>
          </div>
        )}

        {feedback && (
          <div ref={answerRef} style={{ marginBottom: '1.5rem' }}>
            <div style={{ 
              background: 'var(--color-background-success)',
              border: '0.5px solid var(--color-border-success)',
              borderRadius: 'var(--border-radius-lg)',
              padding: '1.25rem',
              marginBottom: '1rem'
            }}>
              <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--color-text-success)', marginBottom: '0.5rem' }}>
                Feedback
              </div>
              <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--color-text-success)' }}>
                {feedback}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={nextQuestion}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  background: 'var(--color-background-info)',
                  border: '0.5px solid var(--color-border-info)',
                  borderRadius: 'var(--border-radius-md)',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--color-text-info)',
                  opacity: isLoading ? 0.6 : 1
                }}
              >
                Next question
              </button>
              <button
                onClick={endInterview}
                style={{
                  padding: '10px 16px',
                  background: 'transparent',
                  border: '0.5px solid var(--color-border-secondary)',
                  borderRadius: 'var(--border-radius-md)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--color-text-secondary)'
                }}
              >
                Finish
              </button>
            </div>
          </div>
        )}

        {questionHistory.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '0.75rem' }}>
              Previous questions
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {questionHistory.map((item, idx) => (
                <details key={idx} style={{ 
                  background: 'var(--color-background-secondary)',
                  borderRadius: 'var(--border-radius-md)',
                  border: '0.5px solid var(--color-border-tertiary)',
                  padding: '12px'
                }}>
                  <summary style={{ 
                    cursor: 'pointer', 
                    fontSize: '13px',
                    fontWeight: '500',
                    color: 'var(--color-text-secondary)',
                    listStyle: 'none'
                  }}>
                    <span style={{ marginRight: '8px' }}>▸</span>
                    Question {idx + 1}
                  </summary>
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '0.5px solid var(--color-border-tertiary)' }}>
                    <div style={{ fontSize: '13px', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>
                      {item.question}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>
                      {item.feedback.substring(0, 100)}...
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (stage === 'results') {
    const totalQuestions = questionHistory.length;
    
    return (
      <div style={{ padding: '2rem 0' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '500', marginBottom: '0.5rem' }}>Interview complete</h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>
            You answered {totalQuestions} question{totalQuestions !== 1 ? 's' : ''}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
          {questionHistory.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--color-background-primary)',
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 'var(--border-radius-lg)',
                padding: '1.25rem'
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
                Question {idx + 1}
              </div>
              <div style={{ fontSize: '14px', marginBottom: '1rem', lineHeight: '1.6' }}>
                {item.question}
              </div>
              <div style={{ 
                background: 'var(--color-background-secondary)',
                borderRadius: 'var(--border-radius-md)',
                padding: '12px',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
                  Your answer
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--color-text-primary)' }}>
                  {item.answer}
                </div>
              </div>
              <div style={{ 
                background: 'var(--color-background-success)',
                border: '0.5px solid var(--color-border-success)',
                borderRadius: 'var(--border-radius-md)',
                padding: '12px'
              }}>
                <div style={{ fontSize: '12px', color: 'var(--color-text-success)', marginBottom: '6px' }}>
                  Feedback
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--color-text-success)' }}>
                  {item.feedback}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={restart}
          style={{
            width: '100%',
            padding: '12px',
            background: 'var(--color-background-info)',
            border: '0.5px solid var(--color-border-info)',
            borderRadius: 'var(--border-radius-md)',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--color-text-info)'
          }}
        >
          Start new interview
        </button>
      </div>
    );
  }
}
