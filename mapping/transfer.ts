/* eslint-disable prefer-const */
import { Exchange } from "../generated/schema";
import { Transfer } from "../generated/Transfer/KAI";

export function handleTransfer(event: Transfer): void {
    let transfer = Exchange.load(event.transaction.hash.toHex());
    if (transfer == null)
        transfer = new Exchange(event.transaction.hash.toHex());

    transfer.block = event.block.number;
    transfer.from = event.params.from.toHex();
    transfer.to = event.params.to.toHex();
    transfer.amount = event.params.value;

    transfer.save();
}