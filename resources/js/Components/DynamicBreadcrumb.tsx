import { usePage } from "@inertiajs/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { Fragment } from "react";

interface Section {
  title: string;
}

interface PageProps extends InertiaPageProps {
  section?: Section;
}

const DynamicBreadcrumb = () => {
  const { url, props } = usePage<PageProps>();
  const { section } = props;

  const segments = url.split("?")[0].split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          let displayText = segment
            .split("?")[0]
            .replace(/-/g, " ")
            .replace(/\b\w/g, c => c.toUpperCase());

          // Si le segment est un ID de section et que nous avons les données de la section
          if (segments[index - 1] === "sections" && section?.title) {
            displayText = section.title;
          }

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={href}>
                  {displayText}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < segments.length - 1 && (
                <BreadcrumbSeparator />
              )}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default DynamicBreadcrumb;
