interface PageProps {
  params: {
    postId: string;
  };
}

export const dynamic = "force-dyanmic";
export const fetchCache = "force-no-store";

const page = ({ params }: PageProps) => {
  return <div>page</div>;
};

export default page;
