import { Request, Response } from "express"
import * as typeorm from "typeorm"
import { UserService } from "../../src/services/user.service"
;(typeorm as any).getRepository = jest.fn()

describe("The UserService", () => {
  describe("GET /user", () => {
    it("list all users", () => {})
  })
  describe("POST /user", () => {
    it("", () => {})
  })
  describe("GET /user/:id([0-9]+)", () => {
    it("", () => {})
  })
  describe("PATCH /user/:id([0-9]+)", () => {
    it("", () => {})
  })
  describe("POST /user/:id([0-9]+)", () => {
    it("", () => {})
  })
})
