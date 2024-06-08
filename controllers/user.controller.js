const {getUsersFromFile, saveUsersToFile} = require('../models/user.model');

exports.getUsers = (req, res) => {
   try {
         const users = getUsersFromFile();
         res.status(200).json(users);
   } catch (error) {
         console.error('Erro ao ler os usuários', error);
         res.status(500).send('Erro ao ler os usuários');
   }
};

exports.getUserById = (req, res) => {
    try {
        const users = getUsersFromFile();
        const user = users.find(u => u.id === parseInt(req.params.id));
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao ler o usuário', error);
        res.status(500).send('Erro ao ler o usuário');
    }
};

exports.createUser = (req, res) => {
    try {
        const {nome, email, senha} = req.body;
        const users = getUsersFromFile();
        if (!nome || !email || !senha) {
            return res.status(400).send('Campos obrigatórios não preenchidos');
        }
        const userAlreadyExists = users.find(u => u.email === email);
        if (userAlreadyExists) {
            return res.status(409).send('Usuário já cadastrado');
        }
        const id = (''+nome+email+senha).length + 1;
        const user = {id, nome, email, senha};
        
        users.push(user);
        saveUsersToFile(users);
        res.status(201).json(user);
    } catch (error) {
            console.error('Erro ao criar o usuário', error);
            res.status(500).send('Erro ao criar o usuário');
    }
};

exports.patchUser = (req, res) => {
    try {
        const users = getUsersFromFile();
        const user = users.find(u => u.id === parseInt(req.params.id));
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }
        const {nome, email, senha} = req.body;
        user.nome = nome;
        user.email = email;
        user.senha = senha;
        saveUsersToFile(users);
        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao atualizar o usuário', error);
        res.status(500).send('Erro ao atualizar o usuário');
    }
};

exports.deleteUser = (req, res) => {
    try {
        const users = getUsersFromFile();
        const user = users.find(u => u.id === parseInt(req.params.id));
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }
        const index = users.indexOf(user);
        users.splice(index, 1);
        saveUsersToFile(users);
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar o usuário', error);
        res.status(500).send('Erro ao deletar o usuário');
    }
}