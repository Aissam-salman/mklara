import {Course} from "@/types";


const generateTreeCourse = (course: Course) => {
  return [
    {
      id: `course-${course.id}`,
      isSelectable: false,
      name: course.title, // Affiche le titre du cours
      children: course.sections.map((section) => ({
        id: `section-${section.id}`,
        isSelectable: false,
        name: section.title, // Affiche le titre de la section
        children: section.chapters.map((chapter) => ({
          id: `chapter-${chapter.id}`,
          isSelectable: true,
          name: chapter.title, // Affiche le titre du chapitre
        })),
      })),
    },
  ];
};


export default generateTreeCourse;
