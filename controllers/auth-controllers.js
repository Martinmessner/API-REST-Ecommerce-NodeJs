export const login =  (req, res) => {
    console.log("EndPoint");
    console.log(req.body);
    res.send("xd");
}

export const register =  (req, res) => {

    res.json({ok: 22})
}