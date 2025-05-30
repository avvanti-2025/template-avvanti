import { supabase } from '../lib/supabase'

export const Auth = {
    async signUp(email: string, password: string) {
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            })
            if (error) throw error
            return { success: true, message: 'Verifique seu email para o link de confirmação!' }
        } catch (error) {
            return { success: false, message: error }
        }
    },

    async signIn(email: string, password: string) {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) throw error
            return { success: true }
        } catch (error) {
            return { success: false, message: error }
        }
    },

    async signOut() {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            return { success: true }
        } catch (error) {
            return { success: false, message: error }
        }
    }
}