import CreateCourseForm from "@/app/(dashboard)/_components/CreateCourseForm";

function CreatePage() {
  return (
    <div className="p-5 mt-32 flex md:block">
      <div className=" max-w-4xl mx-auto ">
        <div>
          <h1 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Create course
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-3">
            Create a new course here ! bla bla bla{" "}
          </p>
        </div>
        <CreateCourseForm />
      </div>
    </div>
  );
}
export default CreatePage;
