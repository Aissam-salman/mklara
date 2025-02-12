import {Course} from "@/types";

interface PageProps {
  course: Course;
}

const Show = ({course}: PageProps) => {


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p className="text-gray-700">{course.description}</p>

      {course.sections && course.sections.length > 0 ? (
        <div className="mt-4">
          {course.sections.map((section) => (
            <div key={section.id} className="mb-6">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              {section.chapters && section.chapters.length > 0 ? (
                <ul className="list-disc ml-4">
                  {section.chapters.map((chapter) => (
                    <li key={chapter.id}>{chapter.title}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Aucun chapitre disponible.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">Aucune section disponible.</p>
      )}
    </div>
  );
}

export default Show;
