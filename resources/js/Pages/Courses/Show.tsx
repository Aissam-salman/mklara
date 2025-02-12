import {Course} from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import {Tree} from "@/Components/ui/file-tree";
import generateTreeCourse from "@/Components/GenerateTreeCourse";
import CreateSectionForm from "@/Pages/Courses/Partials/CreateSectionForm";

interface PageProps {
  course: Course;
}

const Show = ({course}: PageProps) => {


  return (
    <Authenticated>
      <Head title={course.title}/>
      <div className="container mx-auto p-4">
        <img src={course.image} alt="" hidden={!course.image} className={"w-full object-cover h-52"}/>
        <h1 className="text-4xl font-bold">{course.title}</h1>
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
        <div
          className="relative flex h-[300px] w-1/2 flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
          <div className={"absolute z-30 top-2 left-2"}>
            <CreateSectionForm course={course}/>
          </div>
          <Tree
            className="overflow-hidden rounded-md bg-background p-2"
            initialExpandedItems={[`course-${course.id}`]} // Déplie le cours
            elements={generateTreeCourse(course)} // Génère la structure dynamique
          />
        </div>
      </div>
    </Authenticated>
  );
}

export default Show;
