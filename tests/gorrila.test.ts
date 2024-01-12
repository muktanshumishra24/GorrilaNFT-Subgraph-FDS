import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AffiliateSell } from "../generated/schema"
import { AffiliateSell as AffiliateSellEvent } from "../generated/gorrila/gorrila"
import { handleAffiliateSell } from "../src/gorrila"
import { createAffiliateSellEvent } from "./gorrila-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let affiliate = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAffiliateSellEvent = createAffiliateSellEvent(affiliate)
    handleAffiliateSell(newAffiliateSellEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AffiliateSell created and stored", () => {
    assert.entityCount("AffiliateSell", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AffiliateSell",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "affiliate",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
