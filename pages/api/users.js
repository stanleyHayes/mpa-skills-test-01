import middleware from "../../middleware/database";
import nextConnect from "next-connect";

const app = nextConnect();

app.use(middleware);

app.get(async (req, res, next) => {
    try {
        const users = req.db.collection('users').find({});
        res.status(200).json({data: users});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
});

app.post(async (req, res, next) => {
    try {
        const {name, email, website, hobbies, occupation, about} = req.body;
        const users = req.db.collection('users').insertOne({name, email, website, hobbies, occupation, about});
        res.status(200).json({data: users});

    } catch (e) {
        res.status(500).json({message: e.message});
    }
});

export default app;
