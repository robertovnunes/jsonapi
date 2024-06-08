const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '../db/users.json');

const getUsersFromFile = () => {
    try {
        const data = fs.readFileSync(userFilePath);
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON', err);
        return [];
    }
};

const saveUsersToFile = (users) => {
    try {
        fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
        console.error('Erro ao salvar o arquivo JSON', err);
    }
};

module.exports = { getUsersFromFile, saveUsersToFile };