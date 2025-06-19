import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DetailComponent from "./DetailComponent";
import { Metadata } from "next";

// Define component with explicitly typed parameters
export default async function DetailPage({
  params,
}: {
  params: {
    sessionId: string;
  };
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { sessionId } = await params;

  return (
    <div className="w-full min-h-screen bg-black relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
        <div className="absolute top-1/3 left-1/6 w-96 h-96 bg-pink-600/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-red-600/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2s"></div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-[90%] xl:max-w-[85%] 2xl:max-w-[80%] relative z-10">
        <DetailComponent userId={userId} sessionId={sessionId} />
      </div>
    </div>
  );
}
