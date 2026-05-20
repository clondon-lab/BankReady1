import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ChevronDown, CheckCircle, Clock, BookOpen } from 'lucide-react';
import { getCourseById, type Lesson } from '../data/courses';
import { supabase } from '../lib/supabase';

function LessonContent({ lesson, onClose }: { lesson: Lesson; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-slate-950 z-50 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to course
        </button>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Clock size={14} />
            {lesson.duration}
          </div>
          <h1 className="text-2xl font-bold text-white mb-6">{lesson.title}</h1>

          <div className="prose prose-invert max-w-none">
            {lesson.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return <h2 key={i} className="text-xl font-bold text-white mt-6 mb-3">{line.replace('## ', '')}</h2>;
              }
              if (line.startsWith('### ')) {
                return <h3 key={i} className="text-base font-bold text-amber-400 mt-4 mb-2">{line.replace('### ', '')}</h3>;
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-bold text-white my-1">{line.replace(/\*\*/g, '')}</p>;
              }
              if (line.startsWith('- ') || line.startsWith('* ')) {
                return (
                  <div key={i} className="flex items-start gap-2 my-1">
                    <span className="text-amber-400 mt-0.5 flex-shrink-0">•</span>
                    <span className="text-slate-300 text-sm"
                      dangerouslySetInnerHTML={{
                        __html: line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                      }}
                    />
                  </div>
                );
              }
              if (line.trim() === '') {
                return <div key={i} className="h-2" />;
              }
              return (
                <p key={i} className="text-slate-300 text-sm leading-relaxed my-1"
                  dangerouslySetInnerHTML={{
                    __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                  }}
                />
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800">
            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle size={18} className="text-green-400" />
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              {lesson.keyTakeaways.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">{i + 1}.</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = getCourseById(courseId || '');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set([course?.sections[0]?.id || '']));
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);
      const { data } = await supabase.from('completed_lessons').select('lesson_id');
      if (data) setCompletedLessons(new Set(data.map(r => r.lesson_id)));
    };
    load();
  }, []);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-slate-400">Course not found.</p>
        <Link to="/courses" className="text-amber-400 hover:underline mt-2 inline-block">Back to courses</Link>
      </div>
    );
  }

  const totalLessons = course.sections.reduce((acc, s) => acc + s.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progressPct = Math.round((completedCount / totalLessons) * 100);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openLesson = async (lesson: Lesson) => {
    setActiveLesson(lesson);
    setCompletedLessons(prev => new Set([...prev, lesson.id]));
    if (userId) {
      await supabase.from('completed_lessons')
        .upsert({ user_id: userId, lesson_id: lesson.id }, { onConflict: 'user_id,lesson_id' });
    }
  };

  return (
    <>
      {activeLesson && (
        <LessonContent lesson={activeLesson} onClose={() => setActiveLesson(null)} />
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/courses" className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors w-fit">
          <ArrowLeft size={18} />
          All Courses
        </Link>

        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-6">
          <div className="flex items-start gap-4">
            <span className="text-5xl">{course.icon}</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">{course.title}</h1>
              <p className="text-slate-400 text-sm mb-4">{course.description}</p>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5"><Clock size={14} />{course.duration}</span>
                <span className="flex items-center gap-1.5"><BookOpen size={14} />{totalLessons} lessons</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {course.level}
                </span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Progress</span>
              <span className="text-white font-medium">{completedCount}/{totalLessons} lessons</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {course.sections.map((section, sIdx) => (
            <div key={section.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 text-sm font-bold flex items-center justify-center">
                    {sIdx + 1}
                  </span>
                  <div className="text-left">
                    <p className="font-semibold text-white">{section.title}</p>
                    <p className="text-slate-400 text-xs">{section.lessons.length} lessons</p>
                  </div>
                </div>
                {expandedSections.has(section.id) ? (
                  <ChevronDown size={18} className="text-slate-400" />
                ) : (
                  <ChevronRight size={18} className="text-slate-400" />
                )}
              </button>

              {expandedSections.has(section.id) && (
                <div className="border-t border-slate-800">
                  {section.lessons.map((lesson, lIdx) => (
                    <button
                      key={lesson.id}
                      onClick={() => openLesson(lesson)}
                      className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-800/50 transition-colors border-b border-slate-800/50 last:border-0"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        completedLessons.has(lesson.id)
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {completedLessons.has(lesson.id) ? (
                          <CheckCircle size={16} />
                        ) : (
                          <span className="text-xs font-bold">{lIdx + 1}</span>
                        )}
                      </div>
                      <div className="text-left flex-1">
                        <p className={`text-sm font-medium ${completedLessons.has(lesson.id) ? 'text-slate-400' : 'text-white'}`}>
                          {lesson.title}
                        </p>
                        <p className="text-slate-500 text-xs flex items-center gap-1 mt-0.5">
                          <Clock size={11} />
                          {lesson.duration}
                        </p>
                      </div>
                      <ChevronRight size={16} className="text-slate-500 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
