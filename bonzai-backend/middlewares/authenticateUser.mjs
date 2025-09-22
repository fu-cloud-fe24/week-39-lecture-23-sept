import { verifyToken } from "../utils/jwt.mjs";

export const authenticateUser = () => ({
    before : (handler) => {
        const authHeader = handler.event.headers?.Authorization || handler.event.headers?.authorization;
        console.log('AuthHeader', handler.event);
        if (!authHeader) {
            throw new Error('No token provided');
        }

        const token = authHeader.split(' ')[1];
        try {
            const user = verifyToken(token);
            console.log('TOKEN:', token);
            if(!user) throw new Error('Unauthorized');
            handler.event.user = user;
        } catch (err) {
            console.log('ERROR in authenticateUser():', err.message);
            throw new Error('Unauthorized');
        }
    }
});