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
    setCurrentPage: defineAction({
        input: z.object({
            page: z.string()
        }),
        handler: async (input, context) => {
            context.cookies.set("currentPage", decodeURIComponent(input.page), {
                path: "/",
                httpOnly: true,
                sameSite: "strict",
            });
            return { data: input.page };
        }
    }),
    getCurrentPage: defineAction({
        handler: async (input, context) => {
            const currentPage = context.cookies.get("currentPage")?.value || "/";
            return { currentPage };
        }
    }),
    saveIncome: defineAction({
        accept: 'form',
        input: z.object({
            amount: z.number().min(0.01),
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