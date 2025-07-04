import { MoneyTypes } from '@/model/money-types.enum';
import { saveIncome } from '@/services/incomes.service';
import { saveTransaction } from '@/services/transaction.service';
import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
    saveExpense: defineAction({
        accept: 'form',
        input: z.object({
            amount: z.number().min(1),
            money: z.nativeEnum(MoneyTypes),
            description: z.string(),
            observation: z.string().optional()
        }),
        handler: async (input, context) => {
            const { data, error } = await saveTransaction(input);
            console.log(data, error);
            if (error) {
                return { error: error };
            }
            return { data };
        },
    }),
    setMoney: defineAction({
        input: z.object({
            money: z.nativeEnum(MoneyTypes)
        }),
        handler: async (input, context) => {
            context.cookies.set("money", String(input.money), {
                path: "/",
                httpOnly: true,
                sameSite: "strict",
            });
            return { data: input.money };
        }
    }),
    saveIncome: defineAction({
        accept: 'form',
        input: z.object({
            amount: z.number().min(1),
            money: z.nativeEnum(MoneyTypes),
            description: z.string(),
        }),
        handler: async (input, context) => {
            const { data, error } = await saveIncome(input);

            if (error) {
                throw new ActionError({
                    code: "BAD_REQUEST",
                    message: "Error saving income",
                });
            }
            return { data };
        },
    }),
}