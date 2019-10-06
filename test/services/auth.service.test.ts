import * as typeorm from "typeorm"
import { AuthService } from "../../src/services/auth.service"
;(typeorm as any).getRepository = jest.fn()

describe("The UserService", () => {
  let authService: AuthService
  beforeAll(() => {
    ;(typeorm as any).getRepository.mockReturnValue({})
  })
  beforeEach(() => {})
  describe("", () => {
    it("", async () => {})
  })
})
