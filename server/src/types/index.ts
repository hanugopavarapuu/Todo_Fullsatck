import z from "zod";

export const signup = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(5)
});

export const login = z.object({
    email: z.string().email(),
    password: z.string().min(5)
});

export const todo = z.object({
    title: z.string().max(35),
    content: z.string()
})
