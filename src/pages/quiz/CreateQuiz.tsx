
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, FilePlus, FileText, PieChart, Plus, Settings, Trash2, Users } from "lucide-react";
import { Question, QuestionType } from "@/types/quiz";

const CreateQuiz = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [quizData, setQuizData] = useState({
    title: "",
    topic: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    duration: 60, // minutes
    description: "",
    instructions: "",
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "q1",
      text: "",
      type: "multiple_choice" as QuestionType,
      options: ["", "", "", ""],
      correctAnswer: "",
      points: 1,
    },
  ]);
  
  const [participants, setParticipants] = useState<string[]>([""]);

  // Handle quiz details form input change
  const handleQuizDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuizData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle question data change
  const handleQuestionChange = (index: number, field: string, value: any) => {
    setQuestions((prev) => {
      const updatedQuestions = [...prev];
      (updatedQuestions[index] as any)[field] = value;
      return updatedQuestions;
    });
  };

  // Handle option change
  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    setQuestions((prev) => {
      const updatedQuestions = [...prev];
      if (!updatedQuestions[questionIndex].options) {
        updatedQuestions[questionIndex].options = [];
      }
      updatedQuestions[questionIndex].options![optionIndex] = value;
      return updatedQuestions;
    });
  };

  // Add new question
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: `q${prev.length + 1}`,
        text: "",
        type: "multiple_choice" as QuestionType,
        options: ["", "", "", ""],
        correctAnswer: "",
        points: 1,
      },
    ]);
  };

  // Remove question
  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast({
        title: "Cannot remove",
        description: "Quiz must have at least one question",
        variant: "destructive",
      });
    }
  };

  // Handle participant email change
  const handleParticipantChange = (index: number, value: string) => {
    setParticipants((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  // Add participant field
  const addParticipant = () => {
    setParticipants((prev) => [...prev, ""]);
  };

  // Remove participant field
  const removeParticipant = (index: number) => {
    if (participants.length > 1) {
      setParticipants((prev) => prev.filter((_, i) => i !== index));
    } else {
      setParticipants([""]); // Keep at least one empty field
    }
  };

  // Go to next step
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  // Go to previous step
  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Quiz created successfully",
        description: "Your quiz has been created and invitations will be sent.",
      });
      
      // In a real app, you would redirect to the dashboard or quiz detail page
      // history.push('/quiz/dashboard');
    } catch (error) {
      toast({
        title: "Error creating quiz",
        description: "There was an error creating your quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Same as in Dashboard */}
      <aside className="bg-franchise-blue text-white w-64 min-h-screen flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Quiz Platform</h1>
          <p className="text-gray-300 text-sm mt-1">Manager Dashboard</p>
        </div>
        
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-1">
            <Link to="/quiz/dashboard" 
              className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-franchise-blue/30 rounded-md">
              <PieChart className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link to="/quiz/create" 
              className="flex items-center px-4 py-3 text-white bg-franchise-blue/30 rounded-md">
              <FilePlus className="mr-3 h-5 w-5" />
              Create Quiz
            </Link>
            <Link to="/quiz/reports" 
              className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-franchise-blue/30 rounded-md">
              <FileText className="mr-3 h-5 w-5" />
              Reports
            </Link>
            <Link to="/quiz/settings" 
              className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-franchise-blue/30 rounded-md">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </div>
        </nav>
        
        <div className="p-4 border-t border-franchise-blue/30">
          <Link to="/quiz/login" className="flex items-center px-4 py-2 text-gray-300 hover:text-white rounded-md">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="User" 
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-400">john@example.com</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-8">
        <Link to="/quiz/dashboard" className="flex items-center text-franchise-teal hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Create New Quiz</h1>
          <p className="text-gray-600">Design your quiz, add questions, and invite participants</p>
        </header>

        {/* Step indicators */}
        <div className="flex mb-8">
          <div className={`flex-1 text-center ${step >= 1 ? 'text-franchise-teal' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-franchise-teal text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <p className="mt-2 text-sm">Quiz Details</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className={`h-1 w-full ${step >= 2 ? 'bg-franchise-teal' : 'bg-gray-200'}`}></div>
          </div>
          <div className={`flex-1 text-center ${step >= 2 ? 'text-franchise-teal' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-franchise-teal text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <p className="mt-2 text-sm">Questions</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className={`h-1 w-full ${step >= 3 ? 'bg-franchise-teal' : 'bg-gray-200'}`}></div>
          </div>
          <div className={`flex-1 text-center ${step >= 3 ? 'text-franchise-teal' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-franchise-teal text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </div>
            <p className="mt-2 text-sm">Participants</p>
          </div>
        </div>

        {/* Step 1: Quiz Details */}
        {step === 1 && (
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">Quiz Title</label>
                      <Input 
                        id="title" 
                        name="title"
                        value={quizData.title}
                        onChange={handleQuizDataChange}
                        placeholder="e.g. JavaScript Fundamentals Quiz"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="topic" className="text-sm font-medium">Topic/Subject</label>
                      <Input 
                        id="topic" 
                        name="topic"
                        value={quizData.topic}
                        onChange={handleQuizDataChange}
                        placeholder="e.g. Web Development"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center">
                        <Calendar className="mr-2 h-4 w-4" /> Start Date & Time
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <Input 
                          type="date" 
                          name="startDate"
                          value={quizData.startDate}
                          onChange={handleQuizDataChange}
                          required
                        />
                        <Input 
                          type="time" 
                          name="startTime"
                          value={quizData.startTime}
                          onChange={handleQuizDataChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center">
                        <Calendar className="mr-2 h-4 w-4" /> End Date & Time
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <Input 
                          type="date" 
                          name="endDate"
                          value={quizData.endDate}
                          onChange={handleQuizDataChange}
                          required
                        />
                        <Input 
                          type="time" 
                          name="endTime"
                          value={quizData.endTime}
                          onChange={handleQuizDataChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <Clock className="mr-2 h-4 w-4" /> Duration (minutes)
                    </label>
                    <Input 
                      type="number" 
                      name="duration"
                      value={quizData.duration}
                      onChange={handleQuizDataChange}
                      min={5}
                      max={180}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Quiz Description (Optional)</label>
                    <Textarea 
                      id="description" 
                      name="description"
                      value={quizData.description}
                      onChange={handleQuizDataChange}
                      placeholder="Brief description of the quiz"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="instructions" className="text-sm font-medium">Instructions for Participants</label>
                    <Textarea 
                      id="instructions" 
                      name="instructions"
                      value={quizData.instructions}
                      onChange={handleQuizDataChange}
                      placeholder="Instructions that will be shown to participants before starting the quiz"
                      rows={4}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button type="submit" className="bg-franchise-teal hover:bg-franchise-teal/90">
                    Continue to Questions
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Questions */}
        {step === 2 && (
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                {questions.map((question, index) => (
                  <div key={question.id} className="mb-8 p-6 border rounded-lg bg-white shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Question {index + 1}</h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Question Text</label>
                        <Textarea
                          value={question.text}
                          onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                          placeholder="Enter your question here"
                          rows={2}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Question Type</label>
                          <select
                            value={question.type}
                            onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                            className="w-full h-10 px-3 py-2 text-base border border-input bg-background rounded-md"
                            required
                          >
                            <option value="multiple_choice">Multiple Choice</option>
                            <option value="true_false">True/False</option>
                            <option value="short_answer">Short Answer</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Points</label>
                          <Input
                            type="number"
                            value={question.points}
                            onChange={(e) => handleQuestionChange(index, 'points', parseInt(e.target.value))}
                            min={1}
                            max={10}
                            required
                          />
                        </div>
                      </div>
                      
                      {/* Options for Multiple Choice questions */}
                      {question.type === 'multiple_choice' && (
                        <div className="space-y-3">
                          <label className="text-sm font-medium">Options</label>
                          {question.options?.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center gap-3">
                              <input
                                type="radio"
                                name={`correct_${question.id}`}
                                checked={question.correctAnswer === option}
                                onChange={() => handleQuestionChange(index, 'correctAnswer', option)}
                                className="w-4 h-4"
                              />
                              <Input
                                value={option}
                                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                placeholder={`Option ${optionIndex + 1}`}
                                required
                              />
                            </div>
                          ))}
                          <div className="text-sm text-gray-500 mt-1">
                            * Select the radio button next to the correct answer
                          </div>
                        </div>
                      )}
                      
                      {/* Options for True/False questions */}
                      {question.type === 'true_false' && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Correct Answer</label>
                          <div className="flex space-x-4">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`tf_${question.id}`}
                                value="True"
                                checked={question.correctAnswer === 'True'}
                                onChange={() => handleQuestionChange(index, 'correctAnswer', 'True')}
                                className="w-4 h-4"
                                required
                              />
                              <span>True</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`tf_${question.id}`}
                                value="False"
                                checked={question.correctAnswer === 'False'}
                                onChange={() => handleQuestionChange(index, 'correctAnswer', 'False')}
                                className="w-4 h-4"
                                required
                              />
                              <span>False</span>
                            </label>
                          </div>
                        </div>
                      )}
                      
                      {/* For Short Answer questions */}
                      {question.type === 'short_answer' && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Correct Answer (Keywords)</label>
                          <Input
                            value={typeof question.correctAnswer === 'string' ? question.correctAnswer : ''}
                            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                            placeholder="Enter keywords separated by commas"
                            required
                          />
                          <div className="text-sm text-gray-500">
                            Enter keywords that must be in the answer, separated by commas
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={addQuestion}
                  className="w-full py-6 border-dashed flex items-center justify-center"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Another Question
                </Button>
                
                <div className="flex justify-between mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    Back to Quiz Details
                  </Button>
                  <Button type="submit" className="bg-franchise-teal hover:bg-franchise-teal/90">
                    Continue to Participants
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Participants */}
        {step === 3 && (
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-franchise-teal" /> Add Participants
                  </h3>
                  
                  <div className="space-y-4">
                    {participants.map((email, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => handleParticipantChange(index, e.target.value)}
                          placeholder="participant@example.com"
                          className="flex-1"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeParticipant(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addParticipant}
                    className="mt-4"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Another Participant
                  </Button>
                </div>
                
                <div className="border-t pt-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 mb-6">
                    <p className="font-medium">What happens next?</p>
                    <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                      <li>Each participant will receive a unique quiz link via email</li>
                      <li>Quiz links will only be active during the scheduled time</li>
                      <li>Proctoring features will be enabled during quiz attempts</li>
                      <li>You can track responses in real-time from your dashboard</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    Back to Questions
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-franchise-blue hover:bg-franchise-blue/90"
                  >
                    {isSubmitting ? "Creating Quiz..." : "Create & Send Invitations"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
