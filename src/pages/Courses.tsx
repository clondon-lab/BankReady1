import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Signal, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { courses, type Course } from '../data/courses';

const levelColors: Record<string, string> = {
  Beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  Intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const courseColors: Record<string, string> = {
  blue: 'from-blue-600/20 to-blue-800/10 border-blue-500/20',
  green: 'from-emerald-600/20 to-emerald-800/10 border-emerald-500/20',
  purple: 'from-purple-600/20 to-purple-800/10 border-purple-500/20',
  yellow: 'from-amber-600/20 to-amber-800/10 border-amber-500/20',
  red: 'from-red-600/20 to-red-800/10 border-red-500/20',
};

function CourseCard({ course }: { course: Course }) {
  const [expanded, setExpanded] = useState(false);
  const totalLessons = course.sections.reduce((acc, s) => acc + s.lessons.length, 0);

  return (
    <div className={`bg-gradient-to-br ${courseColors[course.color] || courseColors.blue} border rounded-2xl overflow-hidden`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{course.icon}</span>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${levelColors[course.level]}`}>
            {course.level}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">{course.description}</p>

        <div className="flex items-center gap-4 text-sm text-slate-400 mb-5">
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen size={14} />
            {totalLessons} lessons
          </span>
          <span className="flex items-center gap-1.5">
            <Signal size={14} />
            {course.sections.length} sections
          </span>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/courses/${course.id}`}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Start Course <ChevronRight size={16} />
          </Link>
          <button
            onClick={() => setExpanded(!expanded)}
            className="bg-white/5 hover:bg-white/10 text-slate-400 py-2.5 px-3 rounded-xl transition-all"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-white/10 bg-black/20 p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Course Sections</p>
          <div className="space-y-2">
            {course.sections.map((section, i) => (
              <div key={section.id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-white/10 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="text-white text-sm font-medium">{section.title}</p>
                  <p className="text-slate-400 text-xs">{section.lessons.length} lesson{section.lessons.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Courses() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-3">Courses</h1>
        <p className="text-slate-400 max-w-2xl">
          Structured modules covering every technical topic tested in IB interviews. Based on BIWS 400 Questions and WSP Red Book frameworks.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
