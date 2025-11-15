import jwt from 'jsonwebtoken';

const auth = async (request, response, next) => {
    try {
        const token = request.cookies?.accessToken || request.headers?.authorization?.split(" ")[1];
        console.log('Auth middleware - Token received:', token ? 'exists' : 'missing');
        console.log('Auth middleware - JWT Secret:', process.env.SECRET_KEY_ACCESS_TOKEN ? 'exists' : 'missing');
        
        if (!token) {
            return response.status(401).json({
                message: "Provide token",
            });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
        console.log('Token decoded successfully:', decode);
        
        if(!decode) {
            return response.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            });
        }

        request.userId = decode.id;
        
        next()

    } catch (error) {
        console.log('Auth middleware error:', error.message);
        console.log('Error name:', error.name);
        if (error.name === 'TokenExpiredError') {
            console.log('Token has expired');
            return response.status(401).json({
                message: "Token expired",
                error: true,
                success: false,
                code: "TOKEN_EXPIRED"
            });
        }
        console.log('Token is invalid');
        return response.status(401).json({
            message: "Invalid token",
            error: true,
            success: false,
            code: "TOKEN_INVALID"
        });
    }
}

export default auth;