import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../../../app";

describe("Authenticate User Controller", () => {
  it("should be able to authenticate user", async () => {
    await request(app).post("/users").send({
      name: "Joao",
      email: "joao@gmail.com",
      password: "joao123",
    });

    const response = await request(app).post("/auth").send({
      email: "joao@gmail.com",
      password: "joao123",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
