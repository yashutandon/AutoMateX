

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utlis";
import { caller } from "@/trpc/server";

  async function Page() {
    await requireAuth();

    const data=await caller.getUsers();
 
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
    protected hai BC(bhot cute)
    {JSON.stringify(data)}
    </div>
  );
}
export default Page;
