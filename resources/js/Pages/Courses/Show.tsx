import {Course} from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import CreateSectionForm from "@/Pages/Courses/Partials/CreateSectionForm";

interface PageProps {
  course: Course;
}

const Show = ({course}: PageProps) => {
  return (
    <Authenticated>
      <Head title={course.title}/>
      <div className="container mx-auto p-4">
        <img src={course.image} alt="" hidden={!course.image} className={"w-full object-cover h-52 mb-3"}/>
        <h1 className="text-4xl font-bold">{course.title}</h1>
        <p className="text-gray-700">{course.description}</p>
        {course.sections && course.sections.length > 0 ? (
          <div className="mt-4">
            <div className="flex gap-2 mb-6">
              <h2 className={'text-3xl font-semibold'}>Les sections</h2>
              <CreateSectionForm course={course}/>
            </div>
            {course.sections.map((section) => (
              <div key={section.id} className="mb-6">
                <h2 className="text-xl font-semibold">{section.title}</h2>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">Aucune section disponible.</p>
        )}
        <div className={""}>
        </div>
      </div>
    </Authenticated>
  );
}
export default Show;
