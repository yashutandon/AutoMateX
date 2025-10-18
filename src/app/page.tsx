"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default  function Home() {

  const trpc=useTRPC();
  const {data:user}=useQuery(trpc.getUsers.queryOptions());

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
     {JSON.stringify(user)}
    </div>
  );
}
