/* eslint-disable */
export default async () => {
    const t = {
        ["./core/database-entities/user-role.enum"]: await import("./core/database-entities/user-role.enum")
    };
    return { "@nestjs/swagger": { "models": [[import("./application/dtos/users/create-user.dto"), { "CreateUserDto": { email: { required: true, type: () => String }, password: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, birthdate: { required: true, type: () => String }, role: { required: true, enum: t["./core/database-entities/user-role.enum"].UserRole } } }], [import("./application/dtos/users/read-user.dto"), { "ReadUserDto": { id: { required: true, type: () => String }, email: { required: true, type: () => String } } }]], "controllers": [[import("./infrastructure/http/controllers/api/private/v1/users.controller"), { "UsersV1Controller": { "createUser": { type: Object }, "readUser": { type: Object } } }]] } };
};