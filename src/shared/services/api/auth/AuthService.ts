import { Api } from "../axios-config"


interface IAuth {
    accessToken: string
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
    try {
        const {data}  = await Api.post('/entrar', {email, senha: password})

        if(data){
            return data;
        }

        return new Error('Erro ao autenticar-se')
    } catch (error) {
        return new Error((error as {message: string}).message || 'Erro ao autenticar-se')
    }
}

export const AuthService = {
    auth,
}