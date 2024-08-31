export const signup = async(req, res) => {
    res.json({
        data: "You hit the sign up endpoint",
    })
}

export const signin = async(req, res) => {
    res.json({
        data: "You hit the sign in endpoint",
    })
}

export const signout = async(req, res) => {
    res.json({
        data: "You hit the sign out endpoint",
    })
}