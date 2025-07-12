import { supabase } from "@/lib/supabase";

export async function getUser() {
    const { data, error } = await supabase.auth.getUser();
    // console.log("getUser", data, error);
    if (error) {
        return { data: null, error };
    }
    return {
        data: {
            name: data.user?.user_metadata.name,
            avatar: data.user?.user_metadata.avatar_url,
            id: data.user?.id,
        },
        error: null,
    }
}

export async function setSession(refreshToken: string, accessToken: string) {
    const { data, error } = await supabase.auth.setSession({
        refresh_token: refreshToken,
        access_token: accessToken,
    });
    return { data, error };
}


export async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    return { data, error };
}




