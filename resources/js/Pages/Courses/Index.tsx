import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import {Input} from "@/Components/ui/input";
import {FormEventHandler, useState} from "react";
import * as React from "react";
import { Course } from "@/types";
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
        <div className="flex flex-col gap-6">
        {courses.map(course =>
          <CourseComponent key={course.id} course={course} />
        )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
