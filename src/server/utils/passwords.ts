import * as bcrypt from 'bcrypt';

export const generateHash = (password: string) => {
    try {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    } catch (error) {
        throw error;
    }
}

export const comparePasswordToHash = (password: string, hash: string) => bcrypt.compareSync(password, hash);