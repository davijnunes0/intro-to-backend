import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 3, // Corrigido 'minLegth' e sugiro aumentar para 3 (1 letra é pouco para user)
        maxLength: 30
    },

    password: {
        type: String,
        required: true,
        minLength: 6,
        // Removi o maxLength para evitar conflito com o tamanho do Hash gerado pelo bcrypt
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        // Dica: Adicione um match simples para garantir que tem formato de email
        match: [/\S+@\S+\.\S+/, 'Por favor, use um endereço de email válido']
    },
}, {
    // Dica extra: Adiciona 'createdAt' e 'updatedAt' automaticamente
    timestamps: true 
});

// Middleware para Criptografar Senha (HASH)
userSchema.pre("save", async function (next) {
    // Se a senha não foi modificada, pula o hash
    if (!this.isModified("password")) {
        return next();
    }

    try {
        // Gera o hash com custo 10
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        throw new Error(error);   
    }
});

// Método para comparar senha no Login
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema);