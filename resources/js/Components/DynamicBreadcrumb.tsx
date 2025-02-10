import {usePage} from "@inertiajs/react";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList} from "@/Components/ui/breadcrumb";

const DynamicBreadcrumb = () => {
  const {url} = usePage();

  const segments = url.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const formattedSegment = segment.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

          return (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={href}>
                {formattedSegment}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default DynamicBreadcrumb;
