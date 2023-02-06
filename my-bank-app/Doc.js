export const swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "description": "An API for the project my-bank-app",
        "version": "1.0.0",
        "title": "An API for the project my-bank-app"
    },
    "host": "localhost:3000",
    "tags": [
        {
            "name": "account",
            "description": "Account Management"
        }
    ],
    "schemes": [
        "https"
    ],
    "paths": {
        "/account": {
            "get": {
                "tags": [
                    "account"
                ],
                "summary": "Get existing accounts",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/account"
                        }
                    },
                    "404": {
                        "description": "Error"
                    }
                }
            },
        },

    }
}