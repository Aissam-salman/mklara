import {Course} from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import CreateSectionForm from "@/Pages/Courses/Partials/CreateSectionForm";
import SectionComponent from "@/Components/SectionComponent";

interface PageProps {
  course: Course;
}

const Show = ({course}: PageProps) => {
  return (
    <Authenticated>
      <Head title={course.title}/>
      <div className="container mx-auto p-4 bg-white rounded-sm">
        <img src={course.image} alt="" hidden={!course.image} className={"w-full object-cover h-52 mb-3"}/>
        <h1 className="text-4xl font-bold">{course.title}</h1>
        <p className="text-gray-700">{course.description}</p>
        {course.sections && course.sections.length > 0 ? (
          <div className="mt-4">
            <div className="flex gap-2 mb-6">
              <h2 className={'text-3xl font-semibold'}>Les sections</h2>
              <CreateSectionForm course={course}/>
            </div>
            <div className="flex gap-2 flex-col">
            {course.sections.map((section) => (
              <SectionComponent section={section} key={section.id} />
            ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">Aucune section disponible.</p>
        )}
      </div>
    </Authenticated>
  );
}
export default Show;
