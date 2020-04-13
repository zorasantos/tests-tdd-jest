module.exports = () => {
    const findAll = (req, res) => {
        const users = [
            { name: 'Zora Santos', email: 'zora@gmail.com' }
        ]
        res.status(200).json(users)
    }

    const createUser = (req, res) => {
        res.status(201).json(req.body)
    }
    return { findAll, createUser }
}