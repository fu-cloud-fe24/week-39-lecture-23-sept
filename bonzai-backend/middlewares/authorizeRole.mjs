export const authorizeRole = (allowedRoles) => ({
    before: (handler) => {
        const user = handler.event.user;
        if (!user || !allowedRoles.includes(user.role)) {
            throw new Error('Forbidden');
        }
    }
});