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

export async function saveTransaction(input: { amount: number, money: MoneyTypes, description: string, observation?: string }) {
    const { data: user } = await getUser();
    if (!user) {
        return { data: null, error: "UNAUTHORIZED" };
    }
    const { data, error } = await supabase.from("expenses").insert({
        cost: input.amount,
        money: input.money,
        userId: user.id,
        date: new Date().toISOString(),
        description: input.description,
        observation: input.observation
    }).select()
    console.log(data, error);
    return { data, error };
}

