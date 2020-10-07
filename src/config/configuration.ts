export default () => ({
    api: {
        port: parseInt(process.env.PORT, 10)
    },
    jwt: {
        secret: process.env.JWT_SECRET as string
    }
});