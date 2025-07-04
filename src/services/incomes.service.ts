import { supabase } from "@/lib/supabase";
import { getUser } from "./auth.service";
import type { MoneyTypes } from "@/model/money-types.enum";

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

export async function saveIncome(input: { amount: number, money: MoneyTypes, description: string }) {
    const { data: user } = await getUser();
    if (!user) {
        return { data: null, error: "UNAUTHORIZED" };
    }
    const { data, error } = await supabase.from("revenues").insert({
        cost: input.amount,
        money: input.money,
        userId: user.id,
        date: new Date().toISOString(),
        description: input.description,
    }).select()
    return { data, error };
}