import { supabase } from "@/lib/supabase";
import { getUser } from "./auth.service";

export async function getExpenseCategories() {
    const { data: user } = await getUser();
    if (!user) {
        return { data: null, error: "User not found" };
    }

    const { data, error } = await supabase.from("categories").select()
        .filter("type", "eq", "expense")
        .order("name", { ascending: true });

    return { data, error };
}

export async function getIncomeCategories() {
    const { data: user } = await getUser();
    if (!user) {
        return { data: null, error: "User not found" };
    }

    const { data, error } = await supabase.from("categories").select()
        .filter("type", "eq", "revenue")
        .order("name", { ascending: true });

    return { data, error };
}

