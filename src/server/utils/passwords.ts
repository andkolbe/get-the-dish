import { compare } from 'bcrypt';
import { verify, hash, argon2id } from 'argon2';

export const generateHash = (password: string) => {
    return hash(password, {
        type: argon2id,
        memoryCost: 2 ** 14
        // this memory cost is low for the user and high for someone trying a brute force attack over and over
    });
}

export const validate = (password: string, hashed: string) => verify(hashed, password);

export const bcrypt_validate = (password: string, hashed: string) => compare(password, hashed);