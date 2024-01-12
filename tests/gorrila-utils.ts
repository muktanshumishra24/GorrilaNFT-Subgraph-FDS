import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AffiliateSell,
  Approval,
  ApprovalForAll,
  DelegateChanged,
  DelegateVotesChanged,
  Initialized,
  Transfer
} from "../generated/gorrila/gorrila"

export function createAffiliateSellEvent(affiliate: Address): AffiliateSell {
  let affiliateSellEvent = changetype<AffiliateSell>(newMockEvent())

  affiliateSellEvent.parameters = new Array()

  affiliateSellEvent.parameters.push(
    new ethereum.EventParam("affiliate", ethereum.Value.fromAddress(affiliate))
  )

  return affiliateSellEvent
}

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createDelegateChangedEvent(
  delegator: Address,
  fromDelegate: Address,
  toDelegate: Address
): DelegateChanged {
  let delegateChangedEvent = changetype<DelegateChanged>(newMockEvent())

  delegateChangedEvent.parameters = new Array()

  delegateChangedEvent.parameters.push(
    new ethereum.EventParam("delegator", ethereum.Value.fromAddress(delegator))
  )
  delegateChangedEvent.parameters.push(
    new ethereum.EventParam(
      "fromDelegate",
      ethereum.Value.fromAddress(fromDelegate)
    )
  )
  delegateChangedEvent.parameters.push(
    new ethereum.EventParam(
      "toDelegate",
      ethereum.Value.fromAddress(toDelegate)
    )
  )

  return delegateChangedEvent
}

export function createDelegateVotesChangedEvent(
  delegate: Address,
  previousBalance: BigInt,
  newBalance: BigInt
): DelegateVotesChanged {
  let delegateVotesChangedEvent = changetype<DelegateVotesChanged>(
    newMockEvent()
  )

  delegateVotesChangedEvent.parameters = new Array()

  delegateVotesChangedEvent.parameters.push(
    new ethereum.EventParam("delegate", ethereum.Value.fromAddress(delegate))
  )
  delegateVotesChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousBalance",
      ethereum.Value.fromUnsignedBigInt(previousBalance)
    )
  )
  delegateVotesChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newBalance",
      ethereum.Value.fromUnsignedBigInt(newBalance)
    )
  )

  return delegateVotesChangedEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
