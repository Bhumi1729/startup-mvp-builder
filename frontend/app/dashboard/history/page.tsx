import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HistoryComponent from "./HistoryComponent";

export default async function HistoryPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your MVP History</h1>
      <p className="mb-6 text-gray-600">View all your previous MVP builds and analyses.</p>
      
      <HistoryComponent userId={userId} />
    </div>
  );
}
