import { supabase } from "@/lib/supabase";
import { getUser } from "./auth.service";

export async function getIncomes(startDate: string, endDate: string) {
    const { data: user } = await getUser();
    if (!user) {
        return { data: null, error: "User not found" };
    }   
    
    const { data, error } = await supabase.from("revenues").select()
    .filter("userId", "eq", user.id).filter("date", "gte", startDate)
    // .filter("date", "lte", endDate)
    .order("date", { ascending: false });

    return { data, error };
}

