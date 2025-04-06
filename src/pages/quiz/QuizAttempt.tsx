
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, Video } from "lucide-react";
import { Question } from "@/types/quiz";

// Demo quiz data - would come from API in real app
const demoQuizData = {
  id: "quiz123",
  title: "JavaScript Fundamentals",
  duration: 30, // minutes
  questions: [
    {
      id: "q1",
      text: "What is JavaScript?",
      type: "multiple_choice" as const,
      options: [
        "A markup language",
        "A programming language",
        "A database",
        "A server"
      ],
      correctAnswer: "A programming language",
      points: 1
    },
    {
      id: "q2",
      text: "Which of the following is not a JavaScript data type?",
      type: "multiple_choice" as const,
      options: [
        "String",
        "Boolean",
        "Float",
        "Object"
      ],
      correctAnswer: "Float",
      points: 2
    },
    {
      id: "q3",
      text: "JavaScript is a case-sensitive language.",
      type: "true_false" as const,
      correctAnswer: "True",
      points: 1
    },
    {
      id: "q4",
      text: "What method can be used to add an element at the end of an array?",
      type: "short_answer" as const,
      correctAnswer: "push",
      points: 2
    }
  ],
  instructions: "This quiz tests your knowledge of basic JavaScript concepts. You have 30 minutes to complete all questions. Your camera and microphone will be active during the quiz for proctoring purposes."
};

const QuizAttempt = () => {
  const { toast } = useToast();
  const { quizId } = useParams();
  
  const [quiz] = useState(demoQuizData);
  const [currentStep, setCurrentStep] = useState<'welcome' | 'permissions' | 'quiz' | 'submitted'>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: string | string[]}>({});
  const [remainingTime, setRemainingTime] = useState(quiz.duration * 60); // in seconds
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  
  // Format remaining time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle countdown timer
  useEffect(() => {
    let timer: number;
    
    if (currentStep === 'quiz') {
      timer = window.setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            submitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentStep]);
  
  // Handle tab visibility change (prevent tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && currentStep === 'quiz') {
        setTabSwitchCount((prev) => prev + 1);
        toast({
          title: "Warning",
          description: "Leaving the quiz tab is not allowed and will be reported.",
          variant: "destructive",
        });
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentStep, toast]);
  
  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && currentStep === 'quiz') {
        toast({
          title: "Warning",
          description: "Exiting fullscreen mode is not allowed during the quiz.",
          variant: "destructive",
        });
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [currentStep, toast]);
  
  // Request camera and microphone permissions
  const requestPermissions = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setStream(mediaStream);
      setCurrentStep('quiz');
      
      // Request fullscreen mode
      try {
        await document.documentElement.requestFullscreen();
      } catch (error) {
        toast({
          title: "Warning",
          description: "Fullscreen mode is recommended for this quiz.",
        });
      }
      
    } catch (error) {
      toast({
        title: "Permission Error",
        description: "Camera and microphone access is required to proceed with the quiz.",
        variant: "destructive",
      });
    }
  };
  
  // Start quiz
  const startQuiz = () => {
    setCurrentStep('permissions');
  };
  
  // Handle answer change
  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };
  
  // Navigate to previous question
  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };
  
  // Submit quiz
  const submitQuiz = () => {
    // Stop media stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    // Exit fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    
    // In a real app, you would send the answers to the server here
    setCurrentStep('submitted');
    
    toast({
      title: "Quiz Submitted",
      description: "Your answers have been recorded. Thank you!",
    });
  };

  // Render current question
  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-4">
            <p className="font-medium text-lg">{question.text}</p>
            {question.options?.map((option, index) => (
              <label 
                key={index} 
                className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                  answers[question.id] === option 
                    ? 'border-franchise-teal bg-franchise-teal/5' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`q_${question.id}`}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => handleAnswerChange(question.id, option)}
                  className="w-4 h-4 mr-3"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'true_false':
        return (
          <div className="space-y-4">
            <p className="font-medium text-lg">{question.text}</p>
            <div className="flex space-x-4">
              <label 
                className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                  answers[question.id] === 'True' 
                    ? 'border-franchise-teal bg-franchise-teal/5' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`q_${question.id}`}
                  value="True"
                  checked={answers[question.id] === 'True'}
                  onChange={() => handleAnswerChange(question.id, 'True')}
                  className="w-4 h-4 mr-3"
                />
                <span>True</span>
              </label>
              <label 
                className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                  answers[question.id] === 'False' 
                    ? 'border-franchise-teal bg-franchise-teal/5' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`q_${question.id}`}
                  value="False"
                  checked={answers[question.id] === 'False'}
                  onChange={() => handleAnswerChange(question.id, 'False')}
                  className="w-4 h-4 mr-3"
                />
                <span>False</span>
              </label>
            </div>
          </div>
        );
      
      case 'short_answer':
        return (
          <div className="space-y-4">
            <p className="font-medium text-lg">{question.text}</p>
            <input
              type="text"
              value={answers[question.id] as string || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="Type your answer here..."
            />
          </div>
        );
      
      default:
        return <p>Question type not supported.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Welcome Screen */}
      {currentStep === 'welcome' && (
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="bg-franchise-blue text-white text-center py-8">
              <CardTitle className="text-3xl">
                {quiz.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="mb-8 text-center">
                <div className="w-16 h-16 rounded-full bg-franchise-teal/10 text-franchise-teal flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold mb-2">Welcome to your quiz</h2>
                <p className="text-gray-500">Quiz ID: {quizId}</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-bold mb-2">Important Instructions</h3>
                <p className="text-sm">{quiz.instructions}</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Clock className="w-5 h-5 mr-3 text-franchise-teal mt-0.5" />
                  <div>
                    <h4 className="font-medium">Time Limit</h4>
                    <p className="text-gray-600 text-sm">You have {quiz.duration} minutes to complete this quiz.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Video className="w-5 h-5 mr-3 text-franchise-teal mt-0.5" />
                  <div>
                    <h4 className="font-medium">Proctoring</h4>
                    <p className="text-gray-600 text-sm">Your camera and microphone will be active during the quiz. Please ensure you are in a quiet environment where you can be seen clearly.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                <h3 className="font-bold mb-2">Forbidden Actions</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Switching browser tabs or windows</li>
                  <li>Exiting fullscreen mode</li>
                  <li>Using additional devices</li>
                  <li>Receiving help from others</li>
                </ul>
              </div>
              
              <div className="text-center">
                <Button onClick={startQuiz} className="bg-franchise-teal hover:bg-franchise-teal/90 text-white px-8">
                  Start Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Permissions Screen */}
      {currentStep === 'permissions' && (
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">Camera & Microphone Access</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center mb-6">
                <Video className="w-12 h-12 text-gray-400" />
              </div>
              
              <p className="text-center mb-6 text-sm text-gray-600">
                We need access to your camera and microphone for proctoring purposes during the quiz.
                Please click "Allow" when prompted.
              </p>
              
              <Button 
                onClick={requestPermissions}
                className="w-full bg-franchise-blue hover:bg-franchise-blue/90"
              >
                Grant Permissions
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Quiz Screen */}
      {currentStep === 'quiz' && (
        <div className="max-w-4xl mx-auto">
          {/* Proctoring cam picture-in-picture */}
          {stream && (
            <div className="fixed bottom-4 right-4 w-48 h-36 bg-black rounded-lg shadow-lg overflow-hidden z-50 border-2 border-franchise-teal">
              <video 
                ref={video => {
                  if (video && stream) {
                    video.srcObject = stream;
                    video.play();
                  }
                }}
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-red-600 rounded-full w-2 h-2 animate-pulse"></div>
            </div>
          )}
          
          {/* Timer & Progress */}
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Question {currentQuestionIndex + 1}/{quiz.questions.length}</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-franchise-teal h-2 rounded-full" 
                  style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center font-mono bg-franchise-blue/5 px-3 py-1 rounded-lg">
              <Clock className="w-4 h-4 mr-1 text-franchise-blue" />
              <span className={`font-medium ${remainingTime < 300 ? 'text-red-500' : 'text-franchise-blue'}`}>
                {formatTime(remainingTime)}
              </span>
            </div>
          </div>
          
          <Card className="shadow">
            <CardContent className="p-6">
              {quiz.questions[currentQuestionIndex] && (
                <>
                  <div className="mb-2 text-gray-500 text-sm">
                    Points: {quiz.questions[currentQuestionIndex].points}
                  </div>
                  
                  <div className="mb-8">
                    {renderQuestion(quiz.questions[currentQuestionIndex])}
                  </div>
                  
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={previousQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>
                    
                    {currentQuestionIndex < quiz.questions.length - 1 ? (
                      <Button
                        onClick={nextQuestion}
                        className="bg-franchise-teal hover:bg-franchise-teal/90"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        onClick={submitQuiz}
                        className="bg-franchise-blue hover:bg-franchise-blue/90"
                      >
                        Submit Quiz
                      </Button>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          {/* Question Navigation */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                  ${currentQuestionIndex === index 
                    ? 'bg-franchise-teal text-white' 
                    : answers[quiz.questions[index].id] 
                      ? 'bg-franchise-blue/20 text-franchise-blue border border-franchise-blue/30' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Submitted Screen */}
      {currentStep === 'submitted' && (
        <div className="max-w-md mx-auto text-center">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Quiz Submitted</h2>
              <p className="mb-6 text-gray-600">
                Thank you for completing the quiz. Your responses have been recorded.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-bold mb-2">Summary</h3>
                <ul className="space-y-1 text-sm">
                  <li>Quiz: {quiz.title}</li>
                  <li>Questions answered: {Object.keys(answers).length}/{quiz.questions.length}</li>
                  <li>Time taken: {quiz.duration * 60 - remainingTime} seconds</li>
                </ul>
              </div>
              
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-franchise-teal hover:bg-franchise-teal/90"
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default QuizAttempt;
