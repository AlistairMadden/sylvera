import { Project } from "@/app/api/project/types";
import Filter, { FilterItem } from "@/app/ui/filter";

// Nice to have, url changing with the page
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  let data = null;

  if (Object.keys(params).length === 0) {
    data = await fetch("http://localhost:3000/api/project");
  } else {
    const { status } = params;
    data = await fetch(`http://localhost:3000/api/project?status=${status}`);
  }

  data.ok || console.error("Failed to fetch project data");
  const projects = await data.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 flex items-center justify-between w-full max-w-3xl">
        <h1 className="text-2xl font-semibold tracking-tight">
          Project Management Dashboard
        </h1>
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2 className="text-xl font-semibold mb-4">Project List</h2>
        <Filter title="Status">
          <FilterItem url="/?status=Registration%20requested">
            Registration requested
          </FilterItem>
          <FilterItem url="/?status=Under%20development">
            Under development
          </FilterItem>
          <FilterItem url="/?status=Under%20validation">
            Under validation
          </FilterItem>
          <FilterItem url="/">All</FilterItem>
        </Filter>
        <table className="table-auto p-4">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Project ID</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Country</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: Project) => (
              <tr className="border-b border-gray-200" key={project.id}>
                <td className="px-4 py-2 text-left">{project.id}</td>
                <td className="px-4 py-2 text-left">{project.status}</td>
                <td className="px-4 py-2 text-left">{project.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
