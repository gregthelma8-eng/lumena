import { Account, Asset, Keypair, Networks, Operation } from "@stellar/stellar-sdk";
import { describe, expect, it } from "vitest";
import { buildTransaction } from "../stellar/transaction.js";

describe("buildTransaction", () => {
  it("builds a transaction from an account with a sequence number", () => {
    const sourceAccount = new Account(Keypair.random().publicKey(), "7");
    const transaction = buildTransaction({
      sourceAccount,
      operations: [
        Operation.payment({
          destination: Keypair.random().publicKey(),
          asset: Asset.native(),
          amount: "1",
        }),
      ],
      networkPassphrase: Networks.TESTNET,
    });

    expect(transaction.source).toBe(sourceAccount.accountId());
    expect(transaction.operations).toHaveLength(1);
    expect(sourceAccount.sequenceNumber()).toBe("8");
  });
});
