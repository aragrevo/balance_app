import { supabase } from "@/lib/supabase";
import { getUser } from "./auth.service";
import { MoneyTypes } from "@/model/money-types.enum";



export async function getBalance(startDate: string, endDate: string, moneyType: MoneyTypes = MoneyTypes.EUR) {
    const { data: user } = await getUser();
    if (!user) {
        return { data: null, error: "User not found" };
    }

    const [dataIncomes, dataExpenses] = await Promise.all([
        supabase.from("revenues").select()
            .filter("userId", "eq", user.id)
            .filter("date", "gte", startDate)
            .filter("money", "eq", moneyType),
        supabase.from("expenses").select()
            .filter("userId", "eq", user.id)
            .filter("date", "gte", startDate)
            .filter("money", "eq", moneyType)
    ])

    const { data: incomes, error: incomesError } = dataIncomes;
    const { data: expenses, error: expensesError } = dataExpenses;

    return {
        data: {
            incomes: incomes?.reduce((acc, income) => acc + income.cost, 0),
            expenses: expenses?.reduce((acc, expense) => acc + expense.cost, 0),
        }, error: incomesError || expensesError
    };
}

