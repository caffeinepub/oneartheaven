import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { TRAINING_TRACKS } from "@/data/academyData";
import {
  CERT_LEVEL_CONFIG,
  COURSE_CATEGORY_CONFIG,
  COURSE_LEVEL_CONFIG,
  IDEA_STAGE_CONFIG,
  TRACK_CATEGORY_CONFIG,
} from "@/data/academyTypes";
import {
  useAcademyStats,
  useCertifications,
  useCourses,
  useIdeas,
  useTrainingTracks,
} from "@/hooks/useAcademy";
import {
  Award,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Coins,
  GraduationCap,
  Lightbulb,
  Route,
  Search,
  Star,
  ThumbsUp,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Hero ──────────────────────────────────────────────────────────────────

function AcademyHero() {
  const stats = useAcademyStats();
  const statItems = [
    {
      label: "Courses",
      value: stats.totalCourses.toString(),
      icon: BookOpen,
      color: "oklch(0.72 0.16 75)",
    },
    {
      label: "Learners",
      value: stats.totalLearners.toLocaleString(),
      icon: Users,
      color: "oklch(0.65 0.16 195)",
    },
    {
      label: "Ideas",
      value: stats.ideasSubmitted.toLocaleString(),
      icon: Lightbulb,
      color: "oklch(0.62 0.18 270)",
    },
    {
      label: "Certifications",
      value: stats.certificationsIssued.toLocaleString(),
      icon: Award,
      color: "oklch(0.68 0.18 160)",
    },
    {
      label: "Nations",
      value: stats.nationsReached.toLocaleString(),
      icon: GraduationCap,
      color: "oklch(0.65 0.18 25)",
    },
    {
      label: "Instructors",
      value: stats.instructors.toString(),
      icon: Star,
      color: "oklch(0.76 0.18 75)",
    },
  ];

  return (
    <section
      data-ocid="academy.hero.section"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.10 0.04 275) 0%, oklch(0.08 0.06 255) 40%, oklch(0.07 0.05 220) 100%)",
      }}
    >
      {/* Decorative glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 30%, oklch(0.72 0.16 75 / 0.09) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 35% 40% at 15% 75%, oklch(0.62 0.18 270 / 0.08) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, oklch(0.8 0.04 260) 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, oklch(0.8 0.04 260) 0px, transparent 1px, transparent 40px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
          style={{
            borderColor: "oklch(0.72 0.16 75 / 0.35)",
            background: "oklch(0.72 0.16 75 / 0.08)",
          }}
        >
          <GraduationCap
            className="h-3.5 w-3.5"
            style={{ color: "oklch(0.72 0.16 75)" }}
          />
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "oklch(0.72 0.16 75)" }}
          >
            Phase 9 — Academy
          </span>
          <span
            className="inline-block w-2 h-2 rounded-full animate-pulse"
            style={{ background: "oklch(0.68 0.18 160)" }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-hero-xl font-display mb-5"
          style={{ color: "oklch(0.96 0.01 260)" }}
        >
          Learn.{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.16 75), oklch(0.76 0.18 75))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Incubate.
          </span>{" "}
          Lead.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "oklch(0.68 0.05 260)" }}
        >
          World-class governance education, idea incubation, and FinFracFran™
          certification pathways — accessible to every citizen on the planet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {[
            { label: "Browse Courses", anchor: "#courses", primary: true },
            { label: "Idea Incubator", anchor: "#incubator", primary: false },
            { label: "Training Tracks", anchor: "#training", primary: false },
          ].map((cta) => (
            <a key={cta.anchor} href={cta.anchor}>
              <Button
                size="lg"
                data-ocid={`academy.hero.${cta.label.toLowerCase().replace(/ /g, "-")}.button`}
                style={{
                  background: cta.primary
                    ? "oklch(0.72 0.16 75)"
                    : "transparent",
                  color: cta.primary
                    ? "oklch(0.08 0.04 260)"
                    : "oklch(0.72 0.16 75)",
                  border: cta.primary
                    ? "none"
                    : "1.5px solid oklch(0.72 0.16 75 / 0.5)",
                  fontWeight: 600,
                }}
              >
                {cta.label}
              </Button>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + idx * 0.07 }}
                className="rounded-xl p-4 text-center"
                style={{
                  background: "oklch(0.12 0.04 260 / 0.7)",
                  border: `1px solid ${item.color.replace(")", " / 0.25)")}`,
                  backdropFilter: "blur(8px)",
                }}
              >
                <Icon
                  className="h-4 w-4 mx-auto mb-1.5"
                  style={{ color: item.color }}
                />
                <div
                  className="text-xl font-bold font-display"
                  style={{ color: item.color }}
                >
                  {item.value}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: "oklch(0.52 0.04 260)" }}
                >
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Course Catalog (Part C) ───────────────────────────────────────────

function CourseCatalog() {
  const {
    filteredCourses,
    categoryCounts,
    categoryFilter,
    setCategoryFilter,
    levelFilter,
    setLevelFilter,
    searchQuery,
    setSearchQuery,
    selectedCourse,
    openCourse,
    closeCourse,
  } = useCourses();

  const categories = [
    "all",
    "governance",
    "finfracfran",
    "climate",
    "health",
    "peace",
    "technology",
    "leadership",
    "solutions",
    "culture",
    "finance",
  ] as const;
  const levels = [
    "all",
    "beginner",
    "intermediate",
    "advanced",
    "expert",
  ] as const;

  return (
    <section
      id="courses"
      data-ocid="academy.courses.section"
      className="py-16 sm:py-20"
      style={{ background: "oklch(0.09 0.04 265)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: "oklch(0.72 0.16 75)" }}
            >
              Course Catalog
            </div>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold"
              style={{ color: "oklch(0.94 0.02 260)" }}
            >
              12 Courses. 10 Categories.
            </h2>
          </div>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "oklch(0.52 0.04 260)" }}
            />
            <input
              data-ocid="courses.search_input"
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg text-sm w-64"
              style={{
                background: "oklch(0.13 0.04 265)",
                border: "1px solid oklch(0.22 0.04 265)",
                color: "oklch(0.88 0.02 260)",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Category tabs */}
        <div
          data-ocid="courses.category.tab"
          className="flex flex-wrap gap-2 mb-4"
        >
          {categories.map((cat) => {
            const isActive = categoryFilter === cat;
            const config = cat !== "all" ? COURSE_CATEGORY_CONFIG[cat] : null;
            return (
              <button
                type="button"
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: isActive
                    ? config
                      ? `${config.color.replace(")", " / 0.18)")}`
                      : "oklch(0.72 0.16 75 / 0.18)"
                    : "oklch(0.14 0.04 265)",
                  color: isActive
                    ? (config?.color ?? "oklch(0.72 0.16 75)")
                    : "oklch(0.55 0.04 265)",
                  border: isActive
                    ? `1px solid ${config ? `${config.color.replace(")", " / 0.45)")}` : "oklch(0.72 0.16 75 / 0.45)"}`
                    : "1px solid transparent",
                }}
              >
                {cat === "all" ? "📚" : config?.emoji}{" "}
                {cat === "all" ? "All" : config?.label}
                <span
                  className="ml-0.5 px-1.5 rounded-full text-[10px]"
                  style={{
                    background: "oklch(0.18 0.04 265)",
                    color: "oklch(0.52 0.04 260)",
                  }}
                >
                  {categoryCounts[cat] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Level pills */}
        <div
          data-ocid="courses.level.tab"
          className="flex flex-wrap gap-2 mb-8"
        >
          {levels.map((level) => {
            const isActive = levelFilter === level;
            const config = level !== "all" ? COURSE_LEVEL_CONFIG[level] : null;
            return (
              <button
                type="button"
                key={level}
                onClick={() => setLevelFilter(level)}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: isActive
                    ? config
                      ? `${config.color.replace(")", " / 0.18)")}`
                      : "oklch(0.72 0.16 75 / 0.12)"
                    : "transparent",
                  color: isActive
                    ? (config?.color ?? "oklch(0.72 0.16 75)")
                    : "oklch(0.48 0.04 260)",
                  border: `1px solid ${isActive ? (config ? `${config.color.replace(")", " / 0.4)")}` : "oklch(0.72 0.16 75 / 0.4)") : "oklch(0.22 0.04 265)"}`,
                }}
              >
                {level === "all"
                  ? "All Levels"
                  : COURSE_LEVEL_CONFIG[level].label}
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        {filteredCourses.length === 0 ? (
          <div
            data-ocid="courses.empty_state"
            className="flex flex-col items-center justify-center gap-4 rounded-xl py-16 px-8 text-center border border-white/8"
            style={{ background: "oklch(0.12 0.04 265)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10"
              style={{ background: "oklch(0.16 0.04 265)" }}
            >
              <BookOpen
                className="w-6 h-6"
                style={{ color: "oklch(0.35 0.04 260)" }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <p
                className="font-semibold text-sm"
                style={{ color: "oklch(0.7 0.04 260)" }}
              >
                No courses found
              </p>
              <p
                className="text-xs max-w-xs mx-auto"
                style={{ color: "oklch(0.45 0.04 260)" }}
              >
                No courses match your current filters. Try adjusting the
                category, level, or search query.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              data-ocid="courses.empty_state.button"
              onClick={() => {
                setCategoryFilter("all");
                setLevelFilter("all");
                setSearchQuery("");
              }}
              className="mt-1 border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourses.map((course, idx) => {
              const catConfig = COURSE_CATEGORY_CONFIG[course.category];
              const levelConfig = COURSE_LEVEL_CONFIG[course.level];
              return (
                <motion.div
                  key={course.id}
                  data-ocid={`courses.item.${idx + 1}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="rounded-2xl p-5 flex flex-col gap-3 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    background: "oklch(0.12 0.04 265)",
                    border: "1px solid oklch(0.18 0.04 265)",
                  }}
                  onClick={() => openCourse(course)}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        background: `${catConfig.color.replace(")", " / 0.12)")}`,
                        color: catConfig.color,
                        border: `1px solid ${catConfig.color.replace(")", " / 0.3)")}`,
                      }}
                    >
                      {catConfig.emoji} {catConfig.label}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {course.ffTag && (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{
                            background: "oklch(0.72 0.16 75 / 0.15)",
                            color: "oklch(0.72 0.16 75)",
                            border: "1px solid oklch(0.72 0.16 75 / 0.35)",
                          }}
                        >
                          FF™
                        </span>
                      )}
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          background: `${levelConfig.color.replace(")", " / 0.12)")}`,
                          color: levelConfig.color,
                          border: `1px solid ${levelConfig.color.replace(")", " / 0.3)")}`,
                        }}
                      >
                        {levelConfig.label}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="font-display text-base font-bold leading-snug"
                    style={{ color: "oklch(0.92 0.02 260)" }}
                  >
                    {course.title}
                  </h3>

                  <p
                    className="text-xs leading-relaxed line-clamp-2"
                    style={{ color: "oklch(0.60 0.04 260)" }}
                  >
                    {course.description}
                  </p>

                  <div
                    className="flex items-center gap-3 text-xs"
                    style={{ color: "oklch(0.52 0.04 260)" }}
                  >
                    <span>{course.instructor}</span>
                    <span>·</span>
                    <span>{course.durationHours}h</span>
                    <span>·</span>
                    <span>{course.modules.length} modules</span>
                  </div>

                  <div
                    className="flex items-center justify-between mt-auto pt-2"
                    style={{ borderTop: "1px solid oklch(0.18 0.04 265)" }}
                  >
                    <div className="flex items-center gap-1">
                      <Star
                        className="h-3.5 w-3.5"
                        style={{ color: "oklch(0.72 0.16 75)" }}
                      />
                      <span
                        className="text-xs font-semibold"
                        style={{ color: "oklch(0.72 0.16 75)" }}
                      >
                        {course.rating.toFixed(1)}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.45 0.04 260)" }}
                      >
                        &nbsp;· {course.enrollmentCount.toLocaleString()}{" "}
                        enrolled
                      </span>
                    </div>
                    <button
                      type="button"
                      data-ocid={`courses.view.button.${idx + 1}`}
                      className="text-xs font-semibold px-3 py-1 rounded-lg transition-colors duration-200"
                      style={{
                        background: "oklch(0.16 0.05 265)",
                        color: "oklch(0.72 0.16 75)",
                        border: "1px solid oklch(0.72 0.16 75 / 0.3)",
                      }}
                    >
                      View Course
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Course Detail Sheet */}
      <Sheet open={!!selectedCourse} onOpenChange={() => closeCourse()}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl overflow-y-auto"
          style={{
            background: "oklch(0.10 0.04 265)",
            borderLeft: "1px solid oklch(0.20 0.05 265)",
          }}
          data-ocid="courses.sheet"
        >
          {selectedCourse && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: `${COURSE_CATEGORY_CONFIG[selectedCourse.category].color.replace(")", " / 0.15)")}`,
                      color:
                        COURSE_CATEGORY_CONFIG[selectedCourse.category].color,
                      border: `1px solid ${COURSE_CATEGORY_CONFIG[selectedCourse.category].color.replace(")", " / 0.35)")}`,
                    }}
                  >
                    {COURSE_CATEGORY_CONFIG[selectedCourse.category].emoji}{" "}
                    {COURSE_CATEGORY_CONFIG[selectedCourse.category].label}
                  </span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: `${COURSE_LEVEL_CONFIG[selectedCourse.level].color.replace(")", " / 0.12)")}`,
                      color: COURSE_LEVEL_CONFIG[selectedCourse.level].color,
                    }}
                  >
                    {COURSE_LEVEL_CONFIG[selectedCourse.level].label}
                  </span>
                  {selectedCourse.ffTag && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: "oklch(0.72 0.16 75 / 0.15)",
                        color: "oklch(0.72 0.16 75)",
                        border: "1px solid oklch(0.72 0.16 75 / 0.35)",
                      }}
                    >
                      FinFracFran™
                    </span>
                  )}
                </div>
                <SheetTitle
                  className="font-display text-xl font-bold leading-snug"
                  style={{ color: "oklch(0.94 0.02 260)" }}
                >
                  {selectedCourse.title}
                </SheetTitle>
              </SheetHeader>

              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "oklch(0.65 0.04 260)" }}
              >
                {selectedCourse.description}
              </p>

              {/* Instructor */}
              <div
                className="rounded-xl p-4 mb-6"
                style={{
                  background: "oklch(0.13 0.04 265)",
                  border: "1px solid oklch(0.20 0.04 265)",
                }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "oklch(0.52 0.04 260)" }}
                >
                  Instructor
                </div>
                <div
                  className="font-semibold mb-1"
                  style={{ color: "oklch(0.90 0.02 260)" }}
                >
                  {selectedCourse.instructor}
                </div>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.58 0.04 260)" }}
                >
                  {selectedCourse.instructorBio}
                </p>
              </div>

              {/* Modules */}
              <div className="mb-6">
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "oklch(0.52 0.04 260)" }}
                >
                  Modules ({selectedCourse.modules.length})
                </div>
                <div className="flex flex-col gap-2">
                  {selectedCourse.modules.map((mod, i) => (
                    <div
                      key={mod.id}
                      className="flex items-center gap-3 rounded-lg px-3 py-2"
                      style={{ background: "oklch(0.13 0.04 265)" }}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                        style={{
                          background: "oklch(0.72 0.16 75 / 0.15)",
                          color: "oklch(0.72 0.16 75)",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span
                        className="text-sm flex-1"
                        style={{ color: "oklch(0.80 0.02 260)" }}
                      >
                        {mod.title}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.45 0.04 260)" }}
                      >
                        {mod.durationMinutes}m
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SDGs */}
              {selectedCourse.sdgs.length > 0 && (
                <div className="mb-6">
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: "oklch(0.52 0.04 260)" }}
                  >
                    SDG Alignment
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.sdgs.map((sdg) => (
                      <span
                        key={sdg}
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          background: "oklch(0.65 0.16 195 / 0.15)",
                          color: "oklch(0.65 0.16 195)",
                        }}
                      >
                        SDG {sdg}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="flex gap-3">
                <Button
                  data-ocid="courses.enroll.button"
                  className="flex-1 font-semibold"
                  style={{
                    background: "oklch(0.72 0.16 75)",
                    color: "oklch(0.08 0.04 260)",
                  }}
                  onClick={() => {
                    toast.success(`Enrolled in “${selectedCourse.title}”`);
                    closeCourse();
                  }}
                >
                  Enroll Now
                </Button>
                <Button
                  data-ocid="courses.wishlist.button"
                  variant="outline"
                  onClick={() => toast.success("Added to wishlist")}
                  style={{
                    borderColor: "oklch(0.25 0.04 265)",
                    color: "oklch(0.65 0.04 260)",
                  }}
                >
                  Wishlist
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}

// ─── Idea Incubator (Part D) ──────────────────────────────────────────

function IdeaIncubator() {
  const {
    filteredIdeas,
    stageCounts,
    stageFilter,
    setStageFilter,
    submitOpen,
    openSubmit,
    closeSubmit,
    selectedIdea,
    openIdea,
    closeIdea,
  } = useIdeas();

  const stages = [
    "all",
    "draft",
    "review",
    "incubating",
    "piloting",
    "adopted",
  ] as const;

  const [submitForm, setSubmitForm] = useState({
    title: "",
    category: "",
    problem: "",
    solution: "",
    ffPotential: false,
  });

  function handleSubmit() {
    if (
      !submitForm.title.trim() ||
      !submitForm.category ||
      submitForm.problem.length < 50
    ) {
      toast.error(
        "Please fill in all required fields (min 50 chars for problem statement).",
      );
      return;
    }
    toast.success(
      "Idea submitted! Our team will review it within 5 business days.",
    );
    closeSubmit();
    setSubmitForm({
      title: "",
      category: "",
      problem: "",
      solution: "",
      ffPotential: false,
    });
  }

  return (
    <section
      id="incubator"
      data-ocid="academy.incubator.section"
      className="py-16 sm:py-20"
      style={{ background: "oklch(0.08 0.05 255)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <div
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: "oklch(0.62 0.18 270)" }}
            >
              Idea Incubator
            </div>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold"
              style={{ color: "oklch(0.94 0.02 260)" }}
            >
              From Idea to Global Impact
            </h2>
          </div>
          <Dialog
            open={submitOpen}
            onOpenChange={(o) => (o ? openSubmit() : closeSubmit())}
          >
            <DialogTrigger asChild>
              <Button
                data-ocid="incubator.submit.open_modal_button"
                style={{
                  background: "oklch(0.62 0.18 270)",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Submit Your Idea
              </Button>
            </DialogTrigger>
            <DialogContent
              style={{
                background: "oklch(0.10 0.04 265)",
                border: "1px solid oklch(0.20 0.05 265)",
              }}
              data-ocid="incubator.submit.dialog"
            >
              <DialogHeader>
                <DialogTitle style={{ color: "oklch(0.94 0.02 260)" }}>
                  Submit a New Idea
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-2">
                <div>
                  <Label style={{ color: "oklch(0.72 0.04 260)" }}>
                    Title *
                  </Label>
                  <Input
                    data-ocid="incubator.submit.title.input"
                    value={submitForm.title}
                    onChange={(e) =>
                      setSubmitForm((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="Your idea title..."
                    style={{
                      background: "oklch(0.13 0.04 265)",
                      borderColor: "oklch(0.22 0.04 265)",
                      color: "oklch(0.90 0.02 260)",
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: "oklch(0.72 0.04 260)" }}>
                    Category *
                  </Label>
                  <Select
                    value={submitForm.category}
                    onValueChange={(v) =>
                      setSubmitForm((p) => ({ ...p, category: v }))
                    }
                  >
                    <SelectTrigger
                      data-ocid="incubator.submit.category.select"
                      style={{
                        background: "oklch(0.13 0.04 265)",
                        borderColor: "oklch(0.22 0.04 265)",
                        color: "oklch(0.90 0.02 260)",
                      }}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent
                      style={{ background: "oklch(0.12 0.04 265)" }}
                    >
                      {Object.entries(COURSE_CATEGORY_CONFIG).map(
                        ([key, cfg]) => (
                          <SelectItem key={key} value={key}>
                            {cfg.emoji} {cfg.label}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label style={{ color: "oklch(0.72 0.04 260)" }}>
                    Problem Statement * (min 50 chars)
                  </Label>
                  <Textarea
                    data-ocid="incubator.submit.problem.textarea"
                    value={submitForm.problem}
                    onChange={(e) =>
                      setSubmitForm((p) => ({ ...p, problem: e.target.value }))
                    }
                    placeholder="Describe the problem your idea addresses..."
                    rows={3}
                    style={{
                      background: "oklch(0.13 0.04 265)",
                      borderColor: "oklch(0.22 0.04 265)",
                      color: "oklch(0.90 0.02 260)",
                    }}
                  />
                  <p
                    className="text-xs mt-1"
                    style={{
                      color:
                        submitForm.problem.length >= 50
                          ? "oklch(0.68 0.18 160)"
                          : "oklch(0.52 0.04 260)",
                    }}
                  >
                    {submitForm.problem.length}/50 min
                  </p>
                </div>
                <div>
                  <Label style={{ color: "oklch(0.72 0.04 260)" }}>
                    Proposed Solution
                  </Label>
                  <Textarea
                    data-ocid="incubator.submit.solution.textarea"
                    value={submitForm.solution}
                    onChange={(e) =>
                      setSubmitForm((p) => ({ ...p, solution: e.target.value }))
                    }
                    placeholder="Describe your proposed solution..."
                    rows={3}
                    style={{
                      background: "oklch(0.13 0.04 265)",
                      borderColor: "oklch(0.22 0.04 265)",
                      color: "oklch(0.90 0.02 260)",
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  data-ocid="incubator.submit.cancel_button"
                  variant="outline"
                  onClick={closeSubmit}
                  style={{
                    borderColor: "oklch(0.25 0.04 265)",
                    color: "oklch(0.65 0.04 260)",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  data-ocid="incubator.submit.submit_button"
                  onClick={handleSubmit}
                  style={{ background: "oklch(0.62 0.18 270)", color: "white" }}
                >
                  Submit Idea
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stage filter */}
        <div
          data-ocid="incubator.stage.tab"
          className="flex flex-wrap gap-2 mb-8"
        >
          {stages.map((stage) => {
            const isActive = stageFilter === stage;
            const config = stage !== "all" ? IDEA_STAGE_CONFIG[stage] : null;
            return (
              <button
                type="button"
                key={stage}
                onClick={() => setStageFilter(stage)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: isActive
                    ? config
                      ? `${config.color.replace(")", " / 0.15)")}`
                      : "oklch(0.62 0.18 270 / 0.15)"
                    : "oklch(0.12 0.04 265)",
                  color: isActive
                    ? (config?.color ?? "oklch(0.62 0.18 270)")
                    : "oklch(0.52 0.04 260)",
                  border: isActive
                    ? `1px solid ${config ? `${config.color.replace(")", " / 0.4)")}` : "oklch(0.62 0.18 270 / 0.4)"}`
                    : "1px solid oklch(0.20 0.04 265)",
                }}
              >
                {stage === "all" ? "All" : config?.label}
                <span
                  className="ml-1.5 px-1.5 rounded-full text-[10px]"
                  style={{
                    background: "oklch(0.16 0.04 265)",
                    color: "oklch(0.48 0.04 260)",
                  }}
                >
                  {stageCounts[stage] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIdeas.map((idea, idx) => {
            const stageConfig = IDEA_STAGE_CONFIG[idea.stage];
            const catConfig = COURSE_CATEGORY_CONFIG[idea.category];
            return (
              <motion.div
                key={idea.id}
                data-ocid={`incubator.item.${idx + 1}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="rounded-2xl p-5 flex flex-col gap-3 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: "oklch(0.11 0.04 265)",
                  border: "1px solid oklch(0.18 0.04 265)",
                }}
                onClick={() => openIdea(idea)}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: `${stageConfig.color.replace(")", " / 0.12)")}`,
                      color: stageConfig.color,
                      border: `1px solid ${stageConfig.color.replace(")", " / 0.3)")}`,
                    }}
                  >
                    {stageConfig.label}
                  </span>
                  {idea.ffPotential && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: "oklch(0.72 0.16 75 / 0.15)",
                        color: "oklch(0.72 0.16 75)",
                        border: "1px solid oklch(0.72 0.16 75 / 0.35)",
                      }}
                    >
                      FF™
                    </span>
                  )}
                </div>
                <h3
                  className="font-display text-sm font-bold leading-snug"
                  style={{ color: "oklch(0.92 0.02 260)" }}
                >
                  {idea.title}
                </h3>
                <p
                  className="text-xs leading-relaxed line-clamp-2"
                  style={{ color: "oklch(0.58 0.04 260)" }}
                >
                  {idea.description}
                </p>
                <div
                  className="flex items-center justify-between text-xs"
                  style={{ color: "oklch(0.48 0.04 260)" }}
                >
                  <span>
                    {catConfig.emoji} {catConfig.label}
                  </span>
                  <span style={{ color: "oklch(0.62 0.18 270)" }}>
                    ▲ {idea.votes.toLocaleString()} votes
                  </span>
                </div>
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.45 0.04 260)" }}
                >
                  by {idea.submitter} · {idea.submitterRegion}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Idea Detail Sheet */}
      <Sheet open={!!selectedIdea} onOpenChange={() => closeIdea()}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl overflow-y-auto"
          style={{
            background: "oklch(0.10 0.04 265)",
            borderLeft: "1px solid oklch(0.20 0.05 265)",
          }}
          data-ocid="incubator.sheet"
        >
          {selectedIdea && (
            <>
              <SheetHeader className="mb-5">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: `${IDEA_STAGE_CONFIG[selectedIdea.stage].color.replace(")", " / 0.12)")}`,
                      color: IDEA_STAGE_CONFIG[selectedIdea.stage].color,
                    }}
                  >
                    {IDEA_STAGE_CONFIG[selectedIdea.stage].label}
                  </span>
                  {selectedIdea.ffPotential && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: "oklch(0.72 0.16 75 / 0.15)",
                        color: "oklch(0.72 0.16 75)",
                      }}
                    >
                      FinFracFran™ Potential
                    </span>
                  )}
                </div>
                <SheetTitle
                  className="font-display text-xl font-bold"
                  style={{ color: "oklch(0.94 0.02 260)" }}
                >
                  {selectedIdea.title}
                </SheetTitle>
              </SheetHeader>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "oklch(0.65 0.04 260)" }}
              >
                {selectedIdea.description}
              </p>
              <div
                className="flex items-center gap-4 mb-5 text-sm"
                style={{ color: "oklch(0.55 0.04 260)" }}
              >
                <span>
                  Submitted by{" "}
                  <strong style={{ color: "oklch(0.80 0.02 260)" }}>
                    {selectedIdea.submitter}
                  </strong>
                </span>
                <span>·</span>
                <span>{selectedIdea.submitterRegion}</span>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <ThumbsUp
                  className="h-4 w-4"
                  style={{ color: "oklch(0.62 0.18 270)" }}
                />
                <span
                  className="font-bold"
                  style={{ color: "oklch(0.62 0.18 270)" }}
                >
                  {selectedIdea.votes.toLocaleString()}
                </span>
                <span
                  className="text-sm"
                  style={{ color: "oklch(0.52 0.04 260)" }}
                >
                  community votes
                </span>
                <Button
                  data-ocid="incubator.upvote.button"
                  size="sm"
                  className="ml-auto"
                  onClick={() => toast.success("Vote recorded!")}
                  style={{
                    background: "oklch(0.62 0.18 270 / 0.15)",
                    color: "oklch(0.62 0.18 270)",
                    border: "1px solid oklch(0.62 0.18 270 / 0.35)",
                  }}
                >
                  Upvote
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}

// ─── Part E: Training Tracks & Certifications ────────────────────────────

function ApplyTrackDialog({
  open,
  onClose,
  preselectedTrack,
}: {
  open: boolean;
  onClose: () => void;
  preselectedTrack: string;
}) {
  const [name, setName] = useState("");
  const [background, setBackground] = useState("");
  const [track, setTrack] = useState(preselectedTrack);

  function handleApply() {
    if (!name.trim() || background.length < 20 || !track) {
      toast.error("Please fill in all fields (min 20 chars for background).");
      return;
    }
    toast.success(
      `Application submitted for “${TRAINING_TRACKS.find((t) => t.id === track)?.name ?? track}” — we’ll be in touch within 3 business days!`,
    );
    onClose();
    setName("");
    setBackground("");
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        data-ocid="training.apply.dialog"
        style={{
          background: "oklch(0.10 0.04 265)",
          border: "1px solid oklch(0.20 0.05 265)",
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: "oklch(0.94 0.02 260)" }}>
            Apply for a Training Track
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <div>
            <Label style={{ color: "oklch(0.72 0.04 260)" }}>Full Name *</Label>
            <Input
              data-ocid="training.apply.name.input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              style={{
                background: "oklch(0.13 0.04 265)",
                borderColor: "oklch(0.22 0.04 265)",
                color: "oklch(0.90 0.02 260)",
              }}
            />
          </div>
          <div>
            <Label style={{ color: "oklch(0.72 0.04 260)" }}>
              Select Track *
            </Label>
            <Select value={track} onValueChange={setTrack}>
              <SelectTrigger
                data-ocid="training.apply.track.select"
                style={{
                  background: "oklch(0.13 0.04 265)",
                  borderColor: "oklch(0.22 0.04 265)",
                  color: "oklch(0.90 0.02 260)",
                }}
              >
                <SelectValue placeholder="Choose a training track" />
              </SelectTrigger>
              <SelectContent style={{ background: "oklch(0.12 0.04 265)" }}>
                {TRAINING_TRACKS.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {TRACK_CATEGORY_CONFIG[t.category].emoji} {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label style={{ color: "oklch(0.72 0.04 260)" }}>
              Professional Background * (min 20 chars)
            </Label>
            <Textarea
              data-ocid="training.apply.background.textarea"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="Tell us about your background, experience, and why you want to join this track..."
              rows={4}
              style={{
                background: "oklch(0.13 0.04 265)",
                borderColor: "oklch(0.22 0.04 265)",
                color: "oklch(0.90 0.02 260)",
              }}
            />
            <p
              className="text-xs mt-1"
              style={{
                color:
                  background.length >= 20
                    ? "oklch(0.68 0.18 160)"
                    : "oklch(0.52 0.04 260)",
              }}
            >
              {background.length}/20 min
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            data-ocid="training.apply.cancel_button"
            variant="outline"
            onClick={onClose}
            style={{
              borderColor: "oklch(0.25 0.04 265)",
              color: "oklch(0.65 0.04 260)",
            }}
          >
            Cancel
          </Button>
          <Button
            data-ocid="training.apply.submit_button"
            onClick={handleApply}
            style={{
              background: "oklch(0.72 0.16 75)",
              color: "oklch(0.08 0.04 260)",
              fontWeight: 600,
            }}
          >
            Submit Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function TrainingTracksAndCertifications() {
  const {
    filteredTracks,
    categoryCounts,
    categoryFilter,
    setCategoryFilter,
    applyOpen,
    applyTrack,
    openApply,
    closeApply,
  } = useTrainingTracks();

  const { allCerts, expandedCriteria, toggleCriteria } = useCertifications();

  const trackCategories = [
    "all",
    "governance",
    "finfracfran",
    "climate",
    "technology",
    "leadership",
    "peacebuilding",
  ] as const;

  return (
    <section
      id="training"
      data-ocid="academy.training.section"
      className="py-16 sm:py-20"
      style={{ background: "oklch(0.09 0.045 265)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: "oklch(0.72 0.18 65)" }}
            >
              Training Tracks
            </div>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold"
              style={{ color: "oklch(0.94 0.02 260)" }}
            >
              Structured Pathways to Mastery
            </h2>
            <p
              className="text-sm mt-2 max-w-lg"
              style={{ color: "oklch(0.60 0.04 260)" }}
            >
              Multi-week learning journeys combining courses, live sessions, and
              real-world projects. Each track culminates in globally recognized
              certification.
            </p>
          </div>
          <Button
            data-ocid="training.apply.open_modal_button"
            onClick={() => openApply(TRAINING_TRACKS[0])}
            style={{
              background: "oklch(0.72 0.18 65)",
              color: "oklch(0.08 0.04 260)",
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            <Route className="h-4 w-4 mr-2" />
            Apply for a Track
          </Button>
        </div>

        {/* Category filter tabs */}
        <div
          data-ocid="training.category.tab"
          className="flex flex-wrap gap-2 mb-8"
        >
          {trackCategories.map((cat) => {
            const isActive = categoryFilter === cat;
            const config = cat !== "all" ? TRACK_CATEGORY_CONFIG[cat] : null;
            return (
              <button
                type="button"
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: isActive
                    ? config
                      ? `${config.color.replace(")", " / 0.16)")}`
                      : "oklch(0.72 0.18 65 / 0.16)"
                    : "oklch(0.13 0.04 265)",
                  color: isActive
                    ? (config?.color ?? "oklch(0.72 0.18 65)")
                    : "oklch(0.52 0.04 260)",
                  border: isActive
                    ? `1px solid ${config ? `${config.color.replace(")", " / 0.45)")}` : "oklch(0.72 0.18 65 / 0.45)"}`
                    : "1px solid transparent",
                }}
              >
                {cat === "all" ? "📊" : config?.emoji}
                <span>{cat === "all" ? "All Tracks" : config?.label}</span>
                <span
                  className="px-1.5 rounded-full text-[10px]"
                  style={{
                    background: "oklch(0.17 0.04 265)",
                    color: "oklch(0.48 0.04 260)",
                  }}
                >
                  {categoryCounts[cat] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Training Track Cards */}
        <AnimatePresence mode="popLayout">
          {filteredTracks.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              data-ocid="training.empty_state"
              className="flex flex-col items-center justify-center gap-4 rounded-xl py-16 px-8 text-center border border-white/8"
              style={{ background: "oklch(0.12 0.04 265)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10"
                style={{ background: "oklch(0.16 0.04 265)" }}
              >
                <Route
                  className="w-6 h-6"
                  style={{ color: "oklch(0.35 0.04 260)" }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <p
                  className="font-semibold text-sm"
                  style={{ color: "oklch(0.7 0.04 260)" }}
                >
                  No training tracks found
                </p>
                <p
                  className="text-xs max-w-xs mx-auto"
                  style={{ color: "oklch(0.45 0.04 260)" }}
                >
                  No tracks match the selected category. Try viewing all tracks.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                data-ocid="training.empty_state.button"
                onClick={() => setCategoryFilter("all")}
                className="mt-1 border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all"
              >
                Show All Tracks
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
              {filteredTracks.map((track, idx) => {
                const catConfig = TRACK_CATEGORY_CONFIG[track.category];
                return (
                  <motion.div
                    key={track.id}
                    data-ocid={`training.item.${idx + 1}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, delay: idx * 0.06 }}
                    className="rounded-2xl p-5 flex flex-col gap-4 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{
                      background: "oklch(0.12 0.04 265)",
                      border: `1px solid ${catConfig.color.replace(")", " / 0.2)")}`,
                    }}
                  >
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{
                          background: `${catConfig.color.replace(")", " / 0.12)")}`,
                          border: `1px solid ${catConfig.color.replace(")", " / 0.3)")}`,
                        }}
                      >
                        {catConfig.emoji}
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${catConfig.color.replace(")", " / 0.12)")}`,
                            color: catConfig.color,
                            border: `1px solid ${catConfig.color.replace(")", " / 0.3)")}`,
                          }}
                        >
                          {catConfig.label}
                        </span>
                        {track.ffTierRequired && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize"
                            style={{
                              background: "oklch(0.72 0.16 75 / 0.12)",
                              color: "oklch(0.72 0.16 75)",
                              border: "1px solid oklch(0.72 0.16 75 / 0.3)",
                            }}
                          >
                            FF™ {track.ffTierRequired}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & description */}
                    <div>
                      <h3
                        className="font-display text-base font-bold leading-snug mb-2"
                        style={{ color: "oklch(0.92 0.02 260)" }}
                      >
                        {track.name}
                      </h3>
                      <p
                        className="text-xs leading-relaxed line-clamp-3"
                        style={{ color: "oklch(0.58 0.04 260)" }}
                      >
                        {track.description}
                      </p>
                    </div>

                    {/* Meta row */}
                    <div
                      className="grid grid-cols-3 gap-2 rounded-xl p-3"
                      style={{ background: "oklch(0.10 0.04 265)" }}
                    >
                      {[
                        { label: "Weeks", value: track.totalWeeks.toString() },
                        {
                          label: "Modules",
                          value: track.moduleCount.toString(),
                        },
                        {
                          label: "Enrolled",
                          value: track.enrollmentCount.toLocaleString(),
                        },
                      ].map((m) => (
                        <div key={m.label} className="text-center">
                          <div
                            className="text-base font-bold font-display"
                            style={{ color: catConfig.color }}
                          >
                            {m.value}
                          </div>
                          <div
                            className="text-[10px]"
                            style={{ color: "oklch(0.45 0.04 260)" }}
                          >
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Target audience */}
                    <div
                      className="rounded-lg px-3 py-2 flex items-start gap-2"
                      style={{ background: "oklch(0.10 0.04 265)" }}
                    >
                      <Users
                        className="h-3.5 w-3.5 mt-0.5 flex-shrink-0"
                        style={{ color: "oklch(0.52 0.04 260)" }}
                      />
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.60 0.04 260)" }}
                      >
                        {track.targetAudience}
                      </span>
                    </div>

                    {/* Certifications earned */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Award
                        className="h-3.5 w-3.5"
                        style={{ color: "oklch(0.72 0.16 75)" }}
                      />
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.52 0.04 260)" }}
                      >
                        Earns {track.certifications.length} certification
                        {track.certifications.length > 1 ? "s" : ""}
                      </span>
                    </div>

                    {/* CTA */}
                    <Button
                      data-ocid={`training.apply.button.${idx + 1}`}
                      className="w-full mt-auto font-semibold"
                      onClick={() => openApply(track)}
                      style={{
                        background: `${catConfig.color.replace(")", " / 0.14)")}`,
                        color: catConfig.color,
                        border: `1px solid ${catConfig.color.replace(")", " / 0.35)")}`,
                      }}
                    >
                      Apply for Track
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* ── Certifications Subsection ── */}
        <div
          className="h-px mb-14"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.72 0.16 75 / 0.3), oklch(0.62 0.18 270 / 0.2), transparent)",
          }}
        />

        <div className="mb-10">
          <div
            className="text-xs font-semibold tracking-widest uppercase mb-2"
            style={{ color: "oklch(0.76 0.18 75)" }}
          >
            Certification Badges
          </div>
          <h2
            className="font-display text-2xl sm:text-3xl font-bold mb-3"
            style={{ color: "oklch(0.94 0.02 260)" }}
          >
            Globally Recognised Credentials
          </h2>
          <p
            className="text-sm max-w-lg"
            style={{ color: "oklch(0.60 0.04 260)" }}
          >
            Each badge signals verified competency. FinFracFran™-recognised
            credentials unlock tier progression and franchise eligibility.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allCerts.map((cert, idx) => {
            const levelConfig = CERT_LEVEL_CONFIG[cert.level];
            const isExpanded = expandedCriteria === cert.id;

            return (
              <motion.div
                key={cert.id}
                data-ocid={`training.cert.item.${idx + 1}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="rounded-2xl flex flex-col overflow-hidden"
                style={{
                  background: "oklch(0.12 0.04 265)",
                  border: `1px solid ${levelConfig.color.replace(")", " / 0.25)")}`,
                }}
              >
                {/* Level stripe */}
                <div
                  className="h-1 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${levelConfig.color}, ${levelConfig.color.replace(")", " / 0.3)")})`,
                  }}
                />

                <div className="p-4 flex flex-col gap-3 flex-1">
                  {/* Badge icon + level */}
                  <div className="flex items-start justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: levelConfig.bgColor,
                        border: `1.5px solid ${levelConfig.color.replace(")", " / 0.4)")}`,
                      }}
                    >
                      <Award
                        className="h-6 w-6"
                        style={{ color: levelConfig.color }}
                      />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: levelConfig.bgColor,
                          color: levelConfig.color,
                          border: `1px solid ${levelConfig.color.replace(")", " / 0.35)")}`,
                        }}
                      >
                        {levelConfig.label}
                      </span>
                      {cert.ffRecognition && (
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: "oklch(0.72 0.16 75 / 0.12)",
                            color: "oklch(0.72 0.16 75)",
                            border: "1px solid oklch(0.72 0.16 75 / 0.3)",
                          }}
                        >
                          FF™ Recognised
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <h3
                    className="font-display text-sm font-bold leading-snug"
                    style={{ color: "oklch(0.92 0.02 260)" }}
                  >
                    {cert.name}
                  </h3>

                  {/* Issuing body */}
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.52 0.04 260)" }}
                  >
                    {cert.issuingBody}
                  </p>

                  {/* Description */}
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "oklch(0.60 0.04 260)" }}
                  >
                    {cert.description}
                  </p>

                  {/* Earned count */}
                  <div
                    className="flex items-center gap-1.5 text-xs mt-auto"
                    style={{ color: "oklch(0.48 0.04 260)" }}
                  >
                    <Users className="h-3.5 w-3.5" />
                    <span>{cert.earnedCount.toLocaleString()} earned</span>
                  </div>

                  {/* Criteria toggle */}
                  <button
                    type="button"
                    data-ocid={`training.cert.criteria.button.${idx + 1}`}
                    onClick={() => toggleCriteria(cert.id)}
                    className="flex items-center justify-between w-full rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 mt-1"
                    style={{
                      background: isExpanded
                        ? levelConfig.bgColor
                        : "oklch(0.10 0.04 265)",
                      color: isExpanded
                        ? levelConfig.color
                        : "oklch(0.55 0.04 260)",
                      border: isExpanded
                        ? `1px solid ${levelConfig.color.replace(")", " / 0.35)")}`
                        : "1px solid oklch(0.18 0.04 265)",
                    }}
                  >
                    <span>View Badge Criteria</span>
                    {isExpanded ? (
                      <ChevronUp className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </button>

                  {/* Expandable criteria panel */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="criteria"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="rounded-xl p-3 mt-1"
                          style={{
                            background: "oklch(0.10 0.04 265)",
                            border: `1px solid ${levelConfig.color.replace(")", " / 0.2)")}`,
                          }}
                        >
                          <div
                            className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                            style={{ color: levelConfig.color }}
                          >
                            Criteria
                          </div>
                          <ul className="flex flex-col gap-1.5">
                            {cert.criteria.map((criterion, ci) => (
                              <li
                                key={criterion.slice(0, 20)}
                                className="flex items-start gap-2 text-xs"
                                style={{ color: "oklch(0.65 0.04 260)" }}
                              >
                                <span
                                  className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5"
                                  style={{
                                    background: levelConfig.bgColor,
                                    color: levelConfig.color,
                                  }}
                                >
                                  {ci + 1}
                                </span>
                                {criterion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Apply Dialog */}
      <ApplyTrackDialog
        open={applyOpen}
        onClose={closeApply}
        preselectedTrack={applyTrack?.id ?? ""}
      />
    </section>
  );
}

// ─── Academy Page ────────────────────────────────────────────────────────────────

export function AcademyPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(0.09 0.04 265)" }}
    >
      <AcademyHero />
      <CourseCatalog />
      <IdeaIncubator />
      <TrainingTracksAndCertifications />
    </main>
  );
}
