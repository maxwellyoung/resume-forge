"use client";

import React, { useState, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from "react-beautiful-dnd";
import {
  PlusCircle,
  Trash2,
  Download,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  GraduationCap,
  Award,
  Code,
} from "lucide-react";
import Link from "next/link";
import { usePDF } from "react-to-pdf";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <motion.div
    className="mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    {children}
  </motion.div>
);

interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  degree: string;
  field: string;
  school: string;
  graduationYear: string;
}

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => (
  <motion.div
    className="bg-white text-black p-8 rounded-lg shadow-lg"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    style={{ maxWidth: "800px", margin: "0 auto" }}
  >
    <h1 className="text-4xl font-bold mb-2 text-center">
      {data.name || "Your Name"}
    </h1>
    <p className="text-gray-600 mb-4 text-center">
      {data.email || "email@example.com"} | {data.phone || "(123) 456-7890"}
    </p>

    <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 pb-1">
      Professional Summary
    </h2>
    <p className="mb-4">
      {data.summary ||
        "A brief summary of your professional background and goals."}
    </p>

    <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 pb-1">
      Work Experience
    </h2>
    {data.experience.map((exp: Experience, index: number) => (
      <div key={index} className="mb-4">
        <h3 className="text-xl font-semibold">{exp.title || "Job Title"}</h3>
        <h4 className="text-lg font-medium">{exp.company || "Company Name"}</h4>
        <p className="text-sm text-gray-600 mb-1">
          {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
        </p>
        <p>{exp.description || "Job description and achievements."}</p>
      </div>
    ))}

    <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 pb-1 mt-4">
      Education
    </h2>
    {data.education.map((edu: Education, index: number) => (
      <div key={index} className="mb-3">
        <h3 className="text-xl font-semibold">
          {edu.degree || "Degree"} in {edu.field || "Field of Study"}
        </h3>
        <h4 className="text-lg font-medium">{edu.school || "School Name"}</h4>
        <p className="text-sm text-gray-600">
          {edu.graduationYear || "Graduation Year"}
        </p>
      </div>
    ))}

    <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 pb-1 mt-4">
      Skills
    </h2>
    <p>{data.skills.join(", ") || "List your key skills here."}</p>
  </motion.div>
);

const AnimatedStep = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

interface StepProps {
  resumeData: ResumeData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number | null,
    section?: keyof ResumeData | null
  ) => void;
  removeItem: (index: number, section: "experience" | "education") => void;
  addItem: (section: "experience" | "education") => void;
  onDragEnd: (result: DropResult, section: "experience" | "education") => void;
}

const WorkExperienceStep: React.FC<StepProps> = memo(
  ({ resumeData, handleInputChange, removeItem, addItem, onDragEnd }) => (
    <FormSection title="Work Experience">
      <DragDropContext onDragEnd={(result) => onDragEnd(result, "experience")}>
        <Droppable droppableId="experiences">
          {(provided: DroppableProvided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {resumeData.experience.map((exp, index) => (
                <Draggable
                  key={`exp-${index}`}
                  draggableId={`exp-${index}`}
                  index={index}
                >
                  {(provided: DraggableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-gray-800 p-4 rounded-lg mb-4"
                    >
                      <Input
                        name="title"
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) =>
                          handleInputChange(e, index, "experience")
                        }
                        className="mb-3 bg-gray-700 text-white"
                      />
                      <Input
                        name="company"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) =>
                          handleInputChange(e, index, "experience")
                        }
                        className="mb-3 bg-gray-700 text-white"
                      />
                      <div className="flex gap-3 mb-3">
                        <Input
                          name="startDate"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={(e) =>
                            handleInputChange(e, index, "experience")
                          }
                          className="bg-gray-700 text-white"
                        />
                        <Input
                          name="endDate"
                          placeholder="End Date"
                          value={exp.endDate}
                          onChange={(e) =>
                            handleInputChange(e, index, "experience")
                          }
                          className="bg-gray-700 text-white"
                        />
                      </div>
                      <Textarea
                        name="description"
                        placeholder="Job Description"
                        value={exp.description}
                        onChange={(e) =>
                          handleInputChange(e, index, "experience")
                        }
                        className="mb-3 bg-gray-700 text-white"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeItem(index, "experience")}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button onClick={() => addItem("experience")} className="mt-4">
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
    </FormSection>
  )
);

WorkExperienceStep.displayName = "WorkExperienceStep";

const EducationStep: React.FC<StepProps> = memo(
  ({ resumeData, handleInputChange, removeItem, addItem, onDragEnd }) => (
    <FormSection title="Education Experience">
      <DragDropContext onDragEnd={(result) => onDragEnd(result, "education")}>
        <Droppable droppableId="education">
          {(provided: DroppableProvided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {resumeData.education.map((edu, index) => (
                <Draggable
                  key={`edu-${index}`}
                  draggableId={`edu-${index}`}
                  index={index}
                >
                  {(provided: DraggableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-gray-800 p-4 rounded-lg mb-4"
                    >
                      <Input
                        name="degree"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) =>
                          handleInputChange(e, index, "education")
                        }
                        className="mb-3 bg-gray-700 text-white"
                      />
                      <Input
                        name="field"
                        placeholder="Field of Study"
                        value={edu.field}
                        onChange={(e) =>
                          handleInputChange(e, index, "education")
                        }
                        className="mb-3 bg-gray-700 text-white"
                      />
                      <Input
                        name="school"
                        placeholder="School Name"
                        value={edu.school}
                        onChange={(e) =>
                          handleInputChange(e, index, "education")
                        }
                        className="mb-3 bg-gray-700 text-white"
                      />
                      <Input
                        name="graduationYear"
                        placeholder="Graduation Year"
                        value={edu.graduationYear}
                        onChange={(e) =>
                          handleInputChange(e, index, "education")
                        }
                        className="mb-3 bg-gray-700 text-white"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeItem(index, "education")}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button onClick={() => addItem("education")} className="mt-4">
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Education
      </Button>
    </FormSection>
  )
);

EducationStep.displayName = "EducationStep";

export default function Home() {
  const [step, setStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: [
      { title: "", company: "", startDate: "", endDate: "", description: "" },
    ],
    education: [{ degree: "", field: "", school: "", graduationYear: "" }],
    skills: [""],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number | null = null,
    section: keyof ResumeData | null = null
  ) => {
    const { name, value } = e.target;
    if (index !== null && section) {
      setResumeData((prev) => ({
        ...prev,
        [section]: (prev[section] as any[]).map((item: any, i: number) =>
          i === index ? { ...item, [name]: value } : item
        ),
      }));
    } else if (name === "skills") {
      setResumeData((prev) => ({
        ...prev,
        skills: value.split(",").map((skill: string) => skill.trim()),
      }));
    } else {
      setResumeData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addItem = (section: "experience" | "education") => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [
        ...prev[section],
        section === "experience"
          ? {
              title: "",
              company: "",
              startDate: "",
              endDate: "",
              description: "",
            }
          : { degree: "", field: "", school: "", graduationYear: "" },
      ],
    }));
  };

  const removeItem = (index: number, section: "experience" | "education") => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_: any, i: number) => i !== index),
    }));
  };

  const onDragEnd = (
    result: DropResult,
    section: "experience" | "education"
  ) => {
    if (!result.destination) return;

    setResumeData((prev) => {
      const items = [...prev[section]];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination!.index, 0, reorderedItem);

      return {
        ...prev,
        [section]: items,
      };
    });
  };

  const steps = [
    {
      title: "Personal Information",
      icon: <Briefcase className="w-6 h-6 mr-2" />,
      content: (
        <AnimatedStep>
          <FormSection title="Personal Details">
            <Input
              name="name"
              placeholder="Full Name"
              value={resumeData.name}
              onChange={handleInputChange}
              className="mb-3 bg-gray-800 text-white"
            />
            <Input
              name="email"
              placeholder="Email"
              value={resumeData.email}
              onChange={handleInputChange}
              className="mb-3 bg-gray-800 text-white"
            />
            <Input
              name="phone"
              placeholder="Phone"
              value={resumeData.phone}
              onChange={handleInputChange}
              className="mb-3 bg-gray-800 text-white"
            />
          </FormSection>
        </AnimatedStep>
      ),
    },
    {
      title: "Professional Summary",
      icon: <Award className="w-6 h-6 mr-2" />,
      content: (
        <AnimatedStep>
          <FormSection title="Professional Summary">
            <Textarea
              name="summary"
              placeholder="Write a brief summary of your professional background"
              value={resumeData.summary}
              onChange={handleInputChange}
              className="mb-3 bg-gray-800 text-white"
            />
          </FormSection>
        </AnimatedStep>
      ),
    },
    {
      title: "Work Experience",
      icon: <Briefcase className="w-6 h-6 mr-2" />,
      content: (
        <AnimatedStep>
          <WorkExperienceStep
            resumeData={resumeData}
            handleInputChange={handleInputChange}
            removeItem={removeItem}
            addItem={addItem}
            onDragEnd={onDragEnd}
          />
        </AnimatedStep>
      ),
    },
    {
      title: "Education",
      icon: <GraduationCap className="w-6 h-6 mr-2" />,
      content: (
        <AnimatedStep>
          <EducationStep
            resumeData={resumeData}
            handleInputChange={handleInputChange}
            removeItem={removeItem}
            addItem={addItem}
            onDragEnd={onDragEnd}
          />
        </AnimatedStep>
      ),
    },
    {
      title: "Skills",
      icon: <Code className="w-6 h-6 mr-2" />,
      content: (
        <AnimatedStep>
          <FormSection title="Skills">
            <Textarea
              name="skills"
              placeholder="Enter your skills, separated by commas"
              value={resumeData.skills.join(", ")}
              onChange={handleInputChange}
              className="mb-3 bg-gray-800 text-white"
            />
          </FormSection>
        </AnimatedStep>
      ),
    },
    {
      title: "Review & Export",
      icon: <Download className="w-6 h-6 mr-2" />,
      content: (
        <AnimatedStep>
          <FormSection title="Review Your Resume">
            <p className="text-lg mb-4">
              Great job! You&apos;ve completed all steps. Review your resume
              below and click the &quot;Export as PDF&quot; button when
              you&apos;re ready to download.
            </p>
            <Button onClick={() => toPDF()} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export as PDF
            </Button>
          </FormSection>
        </AnimatedStep>
      ),
    },
  ];

  const { toPDF, targetRef } = usePDF({ filename: "resume.pdf" });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 sticky top-0 bg-gray-950 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              ResumeForge
            </h1>
          </Link>
          <nav className="space-x-6">
            <Link
              href="/about"
              className="hover:text-blue-400 transition-colors"
            >
              About
            </Link>
            {/* <Link
              href="/templates"
              className="hover:text-blue-400 transition-colors"
            >
              Templates
            </Link>
            <Link
              href="/pricing"
              className="hover:text-blue-400 transition-colors"
            >
              Pricing
            </Link> */}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  {steps[step].icon}
                  {steps[step].title}
                </h2>
                {steps[step].content}
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-between mt-6">
              <Button
                onClick={() => setStep((prev) => Math.max(0, prev - 1))}
                disabled={step === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              {step < steps.length - 1 ? (
                <Button
                  onClick={() =>
                    setStep((prev) => Math.min(steps.length - 1, prev + 1))
                  }
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={() => toPDF()}>
                  <Download className="w-4 h-4 mr-2" />
                  Export as PDF
                </Button>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Preview</h2>
            <div ref={targetRef}>
              <ResumePreview data={resumeData} />
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-16 py-6 border-t border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-gray-400">
            &copy; 2023 ResumeForge. Build your future.
          </p>
          <Button onClick={() => toPDF()}>
            <Download className="w-4 h-4 mr-2" />
            Export as PDF
          </Button>
        </div>
      </footer>
    </div>
  );
}
