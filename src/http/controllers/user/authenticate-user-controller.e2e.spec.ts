import { describe, it, expect } from "vitest"
import { app } from "../../../app"
import { request } from "supertest"

describe("Authenticate User Controller", () => {
    it("should be able to authenticate user", async() => {

        await request(app).post("/user").send({
            name: "Joao",
            email: "joao@gmail.com",
            password: "joao123"
        });

        const response = await request(app).post("/auth").send({
            email: "joao@gmail.com",
            password: "joao123"
        })
        expect(response.status).toBe(200);
        
    })
})


