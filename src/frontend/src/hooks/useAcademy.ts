import {
  ACADEMY_COURSES,
  ACADEMY_STATS,
  CERTIFICATION_BADGES,
  IDEA_SUBMISSIONS,
  TRAINING_TRACKS,
} from "@/data/academyData";
import type {
  AcademyCourse,
  CertLevel,
  CertificationBadge,
  CourseCategory,
  CourseLevel,
  IdeaStage,
  IdeaSubmission,
  TrackCategory,
  TrainingTrack,
} from "@/data/academyTypes";
import { useMemo, useState } from "react";

// ─── useCourses ───────────────────────────────────────────────────────────────

export function useCourses(
  initCategory?: CourseCategory,
  initLevel?: CourseLevel,
) {
  const [categoryFilter, setCategoryFilter] = useState<CourseCategory | "all">(
    initCategory ?? "all",
  );
  const [levelFilter, setLevelFilter] = useState<CourseLevel | "all">(
    initLevel ?? "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<AcademyCourse | null>(
    null,
  );

  const filteredCourses = useMemo(() => {
    return ACADEMY_COURSES.filter((course) => {
      const matchCat =
        categoryFilter === "all" || course.category === categoryFilter;
      const matchLevel = levelFilter === "all" || course.level === levelFilter;
      const matchSearch =
        !searchQuery ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchLevel && matchSearch;
    });
  }, [categoryFilter, levelFilter, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ACADEMY_COURSES.length };
    for (const course of ACADEMY_COURSES) {
      counts[course.category] = (counts[course.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  return {
    filteredCourses,
    categoryCounts,
    categoryFilter,
    setCategoryFilter,
    levelFilter,
    setLevelFilter,
    searchQuery,
    setSearchQuery,
    selectedCourse,
    openCourse: setSelectedCourse,
    closeCourse: () => setSelectedCourse(null),
  };
}

// ─── useIdeas ─────────────────────────────────────────────────────────────────

export function useIdeas(initCategory?: CourseCategory, initStage?: IdeaStage) {
  const [categoryFilter, setCategoryFilter] = useState<CourseCategory | "all">(
    initCategory ?? "all",
  );
  const [stageFilter, setStageFilter] = useState<IdeaStage | "all">(
    initStage ?? "all",
  );
  const [submitOpen, setSubmitOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<IdeaSubmission | null>(null);

  const filteredIdeas = useMemo(() => {
    return IDEA_SUBMISSIONS.filter((idea) => {
      const matchCat =
        categoryFilter === "all" || idea.category === categoryFilter;
      const matchStage = stageFilter === "all" || idea.stage === stageFilter;
      return matchCat && matchStage;
    }).sort((a, b) => b.votes - a.votes);
  }, [categoryFilter, stageFilter]);

  const stageCounts = useMemo(() => {
    const counts: Record<string, number> = { all: IDEA_SUBMISSIONS.length };
    for (const idea of IDEA_SUBMISSIONS) {
      counts[idea.stage] = (counts[idea.stage] ?? 0) + 1;
    }
    return counts;
  }, []);

  return {
    filteredIdeas,
    stageCounts,
    categoryFilter,
    setCategoryFilter,
    stageFilter,
    setStageFilter,
    submitOpen,
    openSubmit: () => setSubmitOpen(true),
    closeSubmit: () => setSubmitOpen(false),
    selectedIdea,
    openIdea: setSelectedIdea,
    closeIdea: () => setSelectedIdea(null),
  };
}

// ─── useTrainingTracks ────────────────────────────────────────────────────────

export function useTrainingTracks(initCategory?: TrackCategory) {
  const [categoryFilter, setCategoryFilter] = useState<TrackCategory | "all">(
    initCategory ?? "all",
  );
  const [selectedTrack, setSelectedTrack] = useState<TrainingTrack | null>(
    null,
  );
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyTrack, setApplyTrack] = useState<TrainingTrack | null>(null);

  const filteredTracks = useMemo(() => {
    return TRAINING_TRACKS.filter((track) => {
      return categoryFilter === "all" || track.category === categoryFilter;
    });
  }, [categoryFilter]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: TRAINING_TRACKS.length };
    for (const track of TRAINING_TRACKS) {
      counts[track.category] = (counts[track.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  return {
    filteredTracks,
    categoryCounts,
    categoryFilter,
    setCategoryFilter,
    selectedTrack,
    openTrack: setSelectedTrack,
    closeTrack: () => setSelectedTrack(null),
    applyOpen,
    applyTrack,
    openApply: (track: TrainingTrack) => {
      setApplyTrack(track);
      setApplyOpen(true);
    },
    closeApply: () => {
      setApplyOpen(false);
      setApplyTrack(null);
    },
  };
}

// ─── useCertifications ────────────────────────────────────────────────────────

export function useCertifications() {
  const [selectedCert, setSelectedCert] = useState<CertificationBadge | null>(
    null,
  );
  const [expandedCriteria, setExpandedCriteria] = useState<string | null>(null);

  const allCerts = CERTIFICATION_BADGES;
  const ffCerts = CERTIFICATION_BADGES.filter((c) => c.ffRecognition);

  const certsByLevel = useMemo(() => {
    const grouped: Record<CertLevel, CertificationBadge[]> = {
      foundation: [],
      practitioner: [],
      expert: [],
      master: [],
    };
    for (const cert of CERTIFICATION_BADGES) {
      grouped[cert.level].push(cert);
    }
    return grouped;
  }, []);

  return {
    allCerts,
    ffCerts,
    certsByLevel,
    selectedCert,
    openCert: setSelectedCert,
    closeCert: () => setSelectedCert(null),
    expandedCriteria,
    toggleCriteria: (id: string) =>
      setExpandedCriteria((prev) => (prev === id ? null : id)),
  };
}

// ─── useAcademyStats ──────────────────────────────────────────────────────────

export function useAcademyStats() {
  return ACADEMY_STATS;
}
