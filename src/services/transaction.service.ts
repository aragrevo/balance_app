import { supabase } from "@/lib/supabase";
import { getUser } from "./auth.service";
import { MoneyTypes } from "@/model/money-types.enum";

export async function getTransactions(startDate: string, endDate: string, moneyType: MoneyTypes = MoneyTypes.EUR) {
    const { data: user } = await getUser();
    if (!user) {
        return { data: null, error: "User not found" };
    }
    const { data, error } = await supabase.from("expenses").select()
        .filter("userId", "eq", user.id).filter("date", "gte", startDate)
        // .filter("date", "lte", endDate)
        .filter("money", "eq", moneyType)
        .order("date", { ascending: false });

    return { data, error };
}

