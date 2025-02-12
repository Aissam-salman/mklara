import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import * as React from "react";
import {Course} from "@/types";
import CourseComponent from "@/Components/CourseComponent";

interface FormData {
  title: string;
  description: string;
  image: File | string | null;
  order: string;
  [key: string]: any;
}
interface CourseData {
  courses: Course[];
}

export default function Index({courses}: CourseData ) {


  return (
    <AuthenticatedLayout>
      <Head title="Courses"/>
      <div className="mt-6 shadow-sm rounded-lg divide-y">
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-auto gap-6">
        {courses.map(course =>
          <CourseComponent key={course.id} course={course} />
        )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
